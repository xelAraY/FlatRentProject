using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FlatRent.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FlatController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public FlatController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("{rentObjectId}")]
  public async Task<IActionResult> GetRentObjectDetails(int rentObjectId)
  {
    try
    {
      // Выборка общей информации об объявлении
      var query = _context.RentObjects.Where(ro => ro.RentObjId == rentObjectId);
      var rentObject = await query
        .Join(
          _context.Users,
          ro => ro.OwnerId,
          user => user.Id,
          (ro, user) => new { RentObject = ro, Owner = user }
        )
        .Join(
          _context.Addresses,
          result => result.RentObject.AddressId,
          address => address.AddrId,
          (result, address) => new { result.RentObject, result.Owner, Address = address }
        )
        .Join(
          _context.Currencies,
          result => result.RentObject.CurrencyId,
          currency => currency.Id,
          (result, currency) => new { result.RentObject, result.Owner, result.Address, Currency = currency}
        )
        .Select(result => new
        {
          result.RentObject,
          Owner = new
          {
            result.Owner.Name,
            result.Owner.FullName,
            result.Owner.PhoneNumber,
            result.Owner.RegistrationDate,
            result.Owner.LastLogin
          },
          result.Address,
          Currency = new 
          {
            result.Currency.Code,
            result.Currency.OfficialRate
          }
        })
        .ToListAsync();

      var photos = await _context.Photos
        .Where(photo => photo.RentObjId == rentObjectId)
        .Select(photo => photo.Url)
        .ToListAsync();

      var contacts = await _context.Contacts
        .Where(contact => contact.RentObjectId == rentObjectId)
        .ToListAsync();

      var rentObjectAppliances = await _context.RentObjectAppliances
        .Where(roa => roa.RentObjId == rentObjectId)
        .ToListAsync();

      var applianceIds = rentObjectAppliances.Select(roa => roa.ApplianceId);

      var appliances = await _context.Appliances
        .Where(a => applianceIds.Contains(a.Id))
        .Select(a => a.Name)
        .ToListAsync();

      var rentObjectPreferences = await _context.RentObjectPreferences
        .Where(rop => rop.RentObjId == rentObjectId)
        .ToListAsync();

      var preferenceIds = rentObjectPreferences.Select(rop => rop.PreferenceId);

      var preferences = await _context.Preferences
        .Where(p => preferenceIds.Contains(p.Id))
        .Select(p => p.Name)
        .ToListAsync();

      var rentObjectAddInfs = await _context.RentObjectAddInfs
        .Where(roai => roai.RentObjId == rentObjectId)
        .ToListAsync();

      var addInfIds = rentObjectAddInfs.Select(roai => roai.AddInfId);

      var additionalInformations = await _context.AddtitionalInfs
        .Where(ai => addInfIds.Contains(ai.Id))
        .Select(ai => ai.Name)
        .ToListAsync();

      var metroStationsInfo = await _context.RentObjectsMetroStations
            .Where(roms => roms.RentObjId == rentObjectId)
            .Join(
              _context.MetroStations,
              roms => roms.MetroStationId,
              station => station.Id,
              (roms, station) => new { roms, station }
            )
            .Join(
              _context.MetroLinesColors,
              result => result.station.ColorId,
              line => line.Id,
              (result, line) => new { result.roms, result.station, Line = line }
            )
            .Select(result => new
            {
              result.station.Name,
              Color = result.Line.Name,
              result.roms.WayType,
              result.roms.TravelTime
            })
            .ToListAsync();

      var result = rentObject.Select(result => new
      {
        result.RentObject,
        result.Owner,
        result.Currency,
        result.Address,
        Photos = photos,
        Contacts = contacts,
        Appliances = appliances,
        Preferences = preferences,
        AdditionalInformations = additionalInformations,
        MetroStations = metroStationsInfo
      });

      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении дополнительной информации: {ex.Message}" });
    }
  }

  [Authorize]
  [HttpGet("isFavourite")]
  public async Task<IActionResult> IsFavourite([FromQuery] int objectId, [FromQuery] string userName)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
        return NotFound(new { Message = $"User with username '{userName}' not found."});

      var exists = await _context.Favourites
        .AnyAsync(f => f.UserId == user.Id && f.RentObjectId == objectId);

      return Ok(exists);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving favourites: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpGet("isUserListing")]
  public async Task<IActionResult> IsUserListing([FromQuery] int objectId, [FromQuery] string userName)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
        return NotFound(new { Message = $"User with username '{userName}' not found."});

      var isOwner = await _context.RentObjects
        .AnyAsync(ro => ro.OwnerId == user.Id && ro.RentObjId == objectId);

      return Ok(isOwner);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving favourites: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpGet("checkComparison")]
  public async Task<IActionResult> CheckComparison([FromQuery] int objectId, [FromQuery] string userName)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
        return NotFound(new { Message = $"User with username '{userName}' not found."});

      var exists = await _context.Comparisons
        .AnyAsync(f => f.UserId == user.Id && f.RentObjectId == objectId);

      return Ok(exists);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving favourites: {ex.Message}"});
    }
  }
}
