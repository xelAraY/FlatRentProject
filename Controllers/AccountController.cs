using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;
using Microsoft.VisualBasic;

namespace FlatRent.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public AccountController(ApplicationDbContext context)
  {
    _context = context;
  }

  [Authorize]
  [HttpDelete("deleteUser/{username}")]
  public async Task<IActionResult> DeleteUser(string username)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == username);

      if (user != null)
      {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return Ok(new { Message = "Пользователь успешно удален"});
      }
      else
      {
        return NotFound(new { Message = "Пользователь не найден"});
      }
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при удалении пользователя: {ex.Message}" });
    }
  }

  [Authorize]
  [HttpGet("favourites/{userName}")]
  public async Task<IActionResult> GetFavourites(string userName)
  {
    try
    {
      if (string.IsNullOrWhiteSpace(userName))
        return Ok(new List<Favourite>());

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
        return NotFound(new { Message = $"User with username '{userName}' not found."});

      var favourites = await _context.Favourites
        .Where(f => f.UserId == user.Id)
        .Select(f => f.RentObjectId)
        .ToListAsync();

      return Ok(favourites);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving favourites: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpPost("toggleFavourite")]
  public async Task<IActionResult> ToggleFavourite([FromBody] ToggleModel model)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == model.Username);
      if (user == null)
      {
        return BadRequest(new { Message = "Пользователь не найден"});
      }

      var favourite = await _context.Favourites.FirstOrDefaultAsync(f => f.UserId == user.Id && f.RentObjectId == model.ObjectId);

      if (favourite != null)
      {
        _context.Favourites.Remove(favourite);
        var comparison = await _context.Comparisons.FirstOrDefaultAsync(c => c.UserId == user.Id && c.RentObjectId == model.ObjectId);

        if (comparison != null)
        {
          _context.Comparisons.Remove(comparison);
        }
      }
      else
      {
        _context.Favourites.Add(new Favourite { UserId = user.Id, RentObjectId = model.ObjectId });
      }

      await _context.SaveChangesAsync();

      return Ok(new { Message = "Операция выполнена успешно"});
    }
    catch (Exception ex)
    {
        return BadRequest(new { Message = $"Ошибка: {ex.Message}"});
    }
  }

  // [Authorize]
  // [HttpPost("updateProfileImage")]
  // public async Task<IActionResult> UpdateProfileImage([FromBody] UpdateAvatarImage model)
  // {
  //   try
  //   {
  //     var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == model.Username);
  //     if (user == null)
  //     {
  //       return NotFound( new { Message = $"User '{model.Username}' not found."});
  //     }

  //     user.AvatarImageUrl = model.ImageUrl;
  //     if (user.RegistrationDate.Kind != DateTimeKind.Utc)
  //     {
  //       user.RegistrationDate = DateTime.SpecifyKind(user.RegistrationDate, DateTimeKind.Utc);
  //     }

  //     if (user.LastLogin.HasValue && user.LastLogin.Value.Kind != DateTimeKind.Utc)
  //     {
  //       user.LastLogin = DateTime.SpecifyKind(user.LastLogin.Value, DateTimeKind.Utc);
  //     }

  //     _context.Users.Update(user);
  //     await _context.SaveChangesAsync();

  //     return Ok( new { Message = $"Profile image updated successfully for user '{model.Username}'."});
  //   }
  //   catch (Exception ex)
  //   {
  //     return StatusCode( 500, new { Message = $"Error updating profile image: {ex.Message}"});
  //   }
  // }

  [Authorize]
  [HttpGet("getAvatarImage/{username}")]
  public async Task<IActionResult> GetProfileImage(string username)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == username);
      if (user == null || string.IsNullOrEmpty(user.AvatarImageUrl))
      {
        return NotFound(new {Message = $"Profile image not found for user '{username}'."});
      }

      return Ok(new { user.AvatarImageUrl });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new {Message = $"Error retrieving profile image: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpGet("getUserData/{username}")]
  public async Task<IActionResult> GetUserData(string username)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == username);
      if (user == null)
      {
        return NotFound(new {Message = $"{username} not found."});
      }
      var userData = new {
        Nickname = user.Name,
        Name = user.FullName,
        Surname = user.Surname,
        Email = user.Email,
        PhoneNumber = user.PhoneNumber,
        Gender = user.Gender,
        AvatarUrl = user.AvatarImageUrl
      };
      return Ok(userData);
    }
    catch (Exception ex)
    {
      return StatusCode(500, new {Message = $"Error retrieving profile image: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpPost("updateUserData")]
  public async Task<IActionResult> UpdateUserData([FromBody] UserDataModel data)
  {
    try
    {
      if (!Regex.IsMatch(data.PhoneNumber, @"^\+375\d{2}\d{7}$"))
      {
        return BadRequest(new { Message = "Неправильный формат номера телефона. Используйте формат +375XXXXXXXXX." });
      }

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == data.Nickname);
      if (user == null)
      {
        return NotFound( new { Message = $"User '{data.Nickname}' not found."});
      }

      user.FullName = data.Name;
      user.Surname = data.SurName;
      user.PhoneNumber = data.PhoneNumber;
      user.Gender = data.Gender;
      user.AvatarImageUrl = data.AvatarUrl;
      if (user.RegistrationDate.Kind != DateTimeKind.Utc)
      {
        user.RegistrationDate = DateTime.SpecifyKind(user.RegistrationDate, DateTimeKind.Utc);
      }

      if (user.LastLogin.HasValue && user.LastLogin.Value.Kind != DateTimeKind.Utc)
      {
        user.LastLogin = DateTime.SpecifyKind(user.LastLogin.Value, DateTimeKind.Utc);
      }
      _context.Users.Update(user);
      await _context.SaveChangesAsync();

      return Ok( new { Message = $"User data successfully updated for user '{data.Nickname}'."});
    }
    catch (Exception ex)
    {
      return StatusCode( 500, new { Message = $"Error updating user data: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpGet("getFavouritesListings/{userName}")]
  public async Task<IActionResult> GetFavouritesListings(string userName, [FromQuery] bool showData, [FromQuery] int? page = 1)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
        return NotFound(new { Message = $"User with username '{userName}' not found."});

      var favourites = await _context.Favourites
        .Where(f => f.UserId == user.Id)
        .Select(f => f.RentObjectId)
        .ToListAsync();

      var rentObjectsQuery = _context.RentObjects.Where(ro => favourites.Contains(ro.RentObjId));
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context, showData: showData, page: page);
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving favourites: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpGet("getComparisonObjects/{userName}")]
  public async Task<IActionResult> GetComparisonObjects(string userName)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
        return NotFound(new { Message = $"User with username '{userName}' not found."});

      var comparisonsIds = await _context.Comparisons
        .Where(c => c.UserId == user.Id)
        .Select(c => c.RentObjectId)
        .ToListAsync();

      // var rentObjectsQuery = _context.RentObjects.Where(ro => comparisonsIds.Contains(ro.RentObjId));
      // var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context);
      return Ok(comparisonsIds);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving comparisons objects: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpGet("getUserListings/{userName}")]
  public async Task<IActionResult> GetUserListings(string userName, [FromQuery] bool showData, [FromQuery] int? page = 1)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
        return NotFound(new { Message = $"User with username '{userName}' not found."});

      var rentObjectsQuery = _context.RentObjects.Where(ro => ro.OwnerId == user.Id);
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context, showData: showData, page: page, userListings: true);
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving favourites: {ex.Message}"});
    }
  }

  [HttpPost("addNewListing")]
  public async Task<IActionResult> AddNewListing([FromBody] ListingDataModel listingData)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == listingData.UserName);
    if (user == null)
      return NotFound(new { Message = $"User with username '{listingData.UserName}' not found."});

    using (var transaction = _context.Database.BeginTransaction())
    {
      try
      {
        var address = new Address
        {
          Region = listingData.Map.Region,
          City = listingData.Map.City,
          Street = listingData.Map.Street,
          HouseNumber = listingData.Map.HouseNumber,
          District = listingData.Map.District,
          Microdistrict = listingData.Map.MicroDistrict,
          Latitude = listingData.Map.Coordinates[0],
          Longitude = listingData.Map.Coordinates[1]
        };
        _context.Addresses.Add(address);
        await _context.SaveChangesAsync();

        var currency_id = await _context.Currencies
          .Where(c => c.Code == listingData.Conditions.Currency)
          .Select(c => c.Id)
          .FirstOrDefaultAsync();

        var rentObject = new RentObject { 
          Title = string.IsNullOrEmpty(listingData.Description.Title) ? $"Уютная {listingData.General.RoomsCount}-комнтная квартира" : listingData.Description.Title, 
          Description = string.IsNullOrEmpty(listingData.Description.Description) ? null : listingData.Description.Description, 
          RoomsCount = listingData.General.RoomsCount, 
          FloorNumber = listingData.General.Floor, 
          FloorsAmount = listingData.General.FloorAmount,
          TotalArea = listingData.Area.TotalArea,
          KitchenArea = listingData.Area.KitchenArea,
          LivingArea = listingData.Area.LivingArea,
          Bathroom = listingData.General.BathroomType,
          Balcony = listingData.General.BalconyType,
          ConstructionYear = listingData.General.ConstructionYear,
          Furniture = listingData.Additional.FurnitureType,
          Plate = listingData.Additional.PlateType,
          RentPrice = listingData.Conditions.RentPrice,
          Prepayment = listingData.Conditions.Prepayment,
          Rent = listingData.Conditions.Rent,
          RentalPeriod = listingData.Conditions.RentalPeriod,
          Hidden = true,
          CreatedAt = DateTime.UtcNow,
          UpdatedAt = DateTime.UtcNow,
          // PreviewImageUrl = listingData.Media.Photos.Length > 0 ? listingData.Media.Photos[0] : "https://realt.by/_next/static/media/no-photo.850f218e.svg",
          PreviewImageUrl = "https://static.realt.by/user/82/3/r2001btff382/52351a0109.jpg",
          OwnerId = user.Id,
          CurrencyId = currency_id,
          AddressId = address.AddrId,
        };
        _context.RentObjects.Add(rentObject);
        await _context.SaveChangesAsync();

        // photos
        if (listingData.Media.Photos != null && listingData.Media.Photos.Length > 0) {
          foreach(var photoUrl in listingData.Media.Photos) {
            var photo = new Photo { RentObjId = rentObject.RentObjId, Url = photoUrl};
            _context.Photos.Add(photo);  
          }
          await _context.SaveChangesAsync();
        }

        // contacts
        if (listingData.ContactsInfo.Contacts.Length > 0) {
          foreach(var contactData in listingData.ContactsInfo.Contacts) {
            var contact = new Contact { RentObjectId = rentObject.RentObjId, Phone = contactData.Phone, Name = contactData.Name, Email = contactData.Email};
            _context.Contacts.Add(contact);  
          }
          await _context.SaveChangesAsync();
        }

        // appliances
        if (listingData.Additional.Appliances != null && listingData.Additional.Appliances.Length > 0) {
          var applianceIds = await _context.Appliances
            .Where(a => listingData.Additional.Appliances.Contains(a.Name))
            .Select(a => a.Id)
            .ToListAsync();

          foreach(var applianceId in applianceIds) {
            _context.RentObjectAppliances.Add(new RentObjectAppliance { RentObjId = rentObject.RentObjId, ApplianceId = applianceId}); 
          }
          await _context.SaveChangesAsync();
        }
        // preferences
        if (listingData.Conditions.Preferences != null && listingData.Conditions.Preferences.Length > 0) {
          var preferenceIds = await _context.Preferences
            .Where(p => listingData.Conditions.Preferences.Contains(p.Name))
            .Select(p => p.Id)
            .ToListAsync();

          foreach(var preferenceId in preferenceIds) {
            _context.RentObjectPreferences.Add(new RentObjectPreference { RentObjId = rentObject.RentObjId, PreferenceId = preferenceId}); 
          }
          await _context.SaveChangesAsync();
        }
        // additionalInformations
        if (listingData.Additional.Facilities != null && listingData.Additional.Facilities.Length > 0) {
          var addInfIds = await _context.AddtitionalInfs
            .Where(ai => listingData.Additional.Facilities.Contains(ai.Name))
            .Select(ai => ai.Id)
            .ToListAsync();

          foreach(var addInfId in addInfIds) {
            _context.RentObjectAddInfs.Add(new RentObjectAddInf { RentObjId = rentObject.RentObjId, AddInfId = addInfId}); 
          }
          await _context.SaveChangesAsync();
        }
        
        // metro
        if (listingData.Map.MetroParams != null && listingData.Map.MetroParams.Length > 0) {
          List<string> metroStationNames = listingData.Map.MetroParams
            .Where(m => m.Station != null)
            .Select(m => m.Station.Name)
            .ToList();

          var metroStationsData = await _context.MetroStations
            .Where(ms => metroStationNames.Contains(ms.Name))
            .Select(ms => new { ms.Id, ms.Name})
            .ToListAsync();

          var metroParams = listingData.Map.MetroParams;

          var metroStations = metroStationsData
            .Join(
              metroParams,
              station => station.Name,
              param => param.Station.Name,
              (station, param) => new
              {
                station.Id,
                station.Name,
                param.WayType,
                param.Minutes
              }
            )
          .ToList();

          foreach(var metroStation in metroStations) {
            _context.RentObjectsMetroStations.Add(
            new RentObjectMetroStation { 
              RentObjId = rentObject.RentObjId, 
              MetroStationId = metroStation.Id, 
              WayType = metroStation.WayType, 
              TravelTime = metroStation.Minutes
            }); 
          }
          await _context.SaveChangesAsync();
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return Ok(new { Message =  "Данные успешно вставлены"} );
      }
      catch (Exception ex)
      {
        await transaction.RollbackAsync();
        Console.WriteLine($"Error updating profile image: {ex.Message}");

        if (ex.InnerException != null)
        {
          Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
        }
        return StatusCode(500, new { Message = $"Произошла ошибка: {ex.Message}"} );
      }
    }
  }

  [Authorize]
  [HttpPost("updateListingStatus/{userName}")]
  public async Task<IActionResult> UpdateListingStatus(string userName, [FromQuery] int rentObjectId)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
      if (user == null)
      {
        return NotFound( new { Message = $"User '{userName}' not found."});
      }

      var isOwner = await _context.RentObjects
        .AnyAsync(ro => ro.RentObjId == rentObjectId && ro.OwnerId == user.Id);

      if (isOwner) {
        var rentObject = await _context.RentObjects.FirstOrDefaultAsync(ro => ro.RentObjId == rentObjectId);  
        rentObject.Hidden = !rentObject.Hidden; 

        rentObject.CreatedAt = rentObject.CreatedAt.ToUniversalTime(); //DateTime.SpecifyKind(rentObject.CreatedAt, DateTimeKind.Utc);

        if (rentObject.UpdatedAt.HasValue)
        {
          rentObject.UpdatedAt = rentObject.UpdatedAt.Value.ToUniversalTime();
        } // DateTime.SpecifyKind((DateTime)rentObject.UpdatedAt, DateTimeKind.Utc);
        
        _context.RentObjects.Update(rentObject);
        await _context.SaveChangesAsync();

      } else {
        return BadRequest( new { Message = $"User '{userName}' doesnt have the listing with {rentObjectId} id."});
      }

      return Ok( new { Message = $"Listing status successfully updated for listing {rentObjectId} and user '{userName}'."});
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { Message = $"Error updating user data: {ex.Message}" });
    }
  }

  [Authorize]
  [HttpDelete("deleteListing/{rentObjectId}")]
  public async Task<IActionResult> DeleteListing(int rentObjectId, [FromQuery] string userName)
  {
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);
    if (user == null)
      return NotFound(new { Message = $"User with username '{userName}' not found."});

    RentObject? rentObject;
    if (userName != "admin") {
      rentObject = await _context.RentObjects.FirstOrDefaultAsync(ro => ro.RentObjId == rentObjectId && ro.OwnerId == user.Id);  
    } else {
      rentObject = await _context.RentObjects.FirstOrDefaultAsync(ro => ro.RentObjId == rentObjectId);
    }
    
    if (rentObject == null)
      return NotFound(new { Message = $"Listing with ID '{rentObjectId}' not found for user '{userName}'." });

    var address = await _context.Addresses.FirstOrDefaultAsync(a => a.AddrId == rentObject.AddressId);

    _context.RentObjects.Remove(rentObject);
    await _context.SaveChangesAsync();

    return Ok(new { Message = "Listing deleted successfully." });

    // var favourites = await _context.Favourites.Where(f => f.RentObjectId == rentObject.RentObjId).ToListAsync();
    // _context.Favourites.RemoveRange(favourites);

    // using (var transaction = _context.Database.BeginTransaction())
    // {
    //   try
    //   {
    //     var photos = await _context.Photos.Where(p => p.RentObjId == rentObject.RentObjId).ToListAsync();
    //     _context.Photos.RemoveRange(photos);

    //     var contacts = await _context.Contacts.Where(c => c.RentObjectId == rentObject.RentObjId).ToListAsync();
    //     _context.Contacts.RemoveRange(contacts);

    //     var rentObjectAppliances = await _context.RentObjectAppliances.Where(roa => roa.RentObjId == rentObject.RentObjId).ToListAsync();
    //     _context.RentObjectAppliances.RemoveRange(rentObjectAppliances);

    //     var rentObjectPreferences = await _context.RentObjectPreferences.Where(rop => rop.RentObjId == rentObject.RentObjId).ToListAsync();
    //     _context.RentObjectPreferences.RemoveRange(rentObjectPreferences);

    //     var rentObjectAddInfs = await _context.RentObjectAddInfs.Where(roai => roai.RentObjId == rentObject.RentObjId).ToListAsync();
    //     _context.RentObjectAddInfs.RemoveRange(rentObjectAddInfs);

    //     var rentObjectMetroStations = await _context.RentObjectsMetroStations.Where(roms => roms.RentObjId == rentObject.RentObjId).ToListAsync();
    //     _context.RentObjectsMetroStations.RemoveRange(rentObjectMetroStations);
    //     await _context.SaveChangesAsync();

    //     _context.RentObjects.Remove(rentObject);
    //     await _context.SaveChangesAsync();

    //     if (address != null)
    //       _context.Addresses.Remove(address);

    //     await _context.SaveChangesAsync();
    //     await transaction.CommitAsync();

    //     return Ok(new { Message = "Listing deleted successfully." });
    //   }
    //   catch (Exception ex)
    //   {
    //     await transaction.RollbackAsync();
    //     Console.WriteLine($"Error deleting listing: {ex.Message}");

    //     if (ex.InnerException != null)
    //     {
    //       Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
    //     }
    //     return StatusCode(500, new { Message = $"An error occurred while deleting the listing: {ex.Message}" });
    //   }
    // }
  }

  [HttpPost("updateListing/{rentObjectId}")]
  public async Task<IActionResult> UpdateListing(int rentObjectId, [FromBody] ListingDataModel listingData)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == listingData.UserName);
    if (user == null)
      return NotFound(new { Message = $"User with username '{listingData.UserName}' not found."});

    RentObject? rentObject;
    if (listingData.UserName == "admin") {
      rentObject = await _context.RentObjects.FirstOrDefaultAsync(ro => ro.RentObjId == rentObjectId);  
    } else 
    {
      rentObject = await _context.RentObjects.FirstOrDefaultAsync(ro => ro.RentObjId == rentObjectId && ro.OwnerId == user.Id);  
    }
    
    if (rentObject == null)
      return NotFound(new { Message = $"Listing with ID '{rentObjectId}' not found for user '{listingData.UserName}'." });

    var address = await _context.Addresses.FirstOrDefaultAsync(a => a.AddrId == rentObject.AddressId);

    using (var transaction = _context.Database.BeginTransaction())
    {
      try
      {
        address.Region = listingData.Map.Region;
        address.City = listingData.Map.City;
        address.Street = listingData.Map.Street;
        address.HouseNumber = listingData.Map.HouseNumber;
        address.District = listingData.Map.District;
        address.Microdistrict = listingData.Map.MicroDistrict;
        address.Latitude = listingData.Map.Coordinates[0];
        address.Longitude = listingData.Map.Coordinates[1];

        _context.Addresses.Update(address);
        await _context.SaveChangesAsync();

        var currency_id = await _context.Currencies
          .Where(c => c.Code == listingData.Conditions.Currency)
          .Select(c => c.Id)
          .FirstOrDefaultAsync();

        rentObject.Title = string.IsNullOrEmpty(listingData.Description.Title) ? $"Уютная {listingData.General.RoomsCount}-комнтная квартира" : listingData.Description.Title;
        rentObject.Description = string.IsNullOrEmpty(listingData.Description.Description) ? null : listingData.Description.Description;
        rentObject.RoomsCount = listingData.General.RoomsCount; 
        rentObject.FloorNumber = listingData.General.Floor;
        rentObject.FloorsAmount = listingData.General.FloorAmount;
        rentObject.TotalArea = listingData.Area.TotalArea;
        rentObject.KitchenArea = listingData.Area.KitchenArea;
        rentObject.LivingArea = listingData.Area.LivingArea;
        rentObject.Bathroom = listingData.General.BathroomType;
        rentObject.Balcony = listingData.General.BalconyType;
        rentObject.ConstructionYear = listingData.General.ConstructionYear;
        rentObject.Furniture = listingData.Additional.FurnitureType;
        rentObject.Plate = listingData.Additional.PlateType;
        rentObject.RentPrice = listingData.Conditions.RentPrice;
        rentObject.Prepayment = listingData.Conditions.Prepayment;
        rentObject.Rent = listingData.Conditions.Rent;
        rentObject.RentalPeriod = listingData.Conditions.RentalPeriod;
        rentObject.CreatedAt = rentObject.CreatedAt.ToUniversalTime();
        rentObject.UpdatedAt = DateTime.UtcNow;
        rentObject.PreviewImageUrl = "https://realt.by/_next/static/media/no-photo.850f218e.svg";
        rentObject.CurrencyId = currency_id;

        _context.RentObjects.Update(rentObject);
        await _context.SaveChangesAsync();

        var photos = await _context.Photos.Where(p => p.RentObjId == rentObject.RentObjId).ToListAsync();
        _context.Photos.RemoveRange(photos);
        await _context.SaveChangesAsync();
        if (listingData.Media.Photos != null && listingData.Media.Photos.Length > 0) {
          foreach(var photoUrl in listingData.Media.Photos) {
            var photo = new Photo { RentObjId = rentObject.RentObjId, Url = photoUrl};
            _context.Photos.Add(photo);  
          }
          await _context.SaveChangesAsync();
        }

        var contacts = await _context.Contacts.Where(c => c.RentObjectId == rentObject.RentObjId).ToListAsync();
        _context.Contacts.RemoveRange(contacts);
        await _context.SaveChangesAsync();
        if (listingData.ContactsInfo.Contacts.Length > 0) {
          foreach(var contactData in listingData.ContactsInfo.Contacts) {
            var contact = new Contact { RentObjectId = rentObject.RentObjId, Phone = contactData.Phone, Name = contactData.Name, Email = contactData.Email};
            _context.Contacts.Add(contact);  
          }
          await _context.SaveChangesAsync();
        }

        var rentObjectAppliances = await _context.RentObjectAppliances.Where(roa => roa.RentObjId == rentObject.RentObjId).ToListAsync();
        _context.RentObjectAppliances.RemoveRange(rentObjectAppliances);
        await _context.SaveChangesAsync();
        if (listingData.Additional.Appliances != null && listingData.Additional.Appliances.Length > 0) {
          var applianceIds = await _context.Appliances
            .Where(a => listingData.Additional.Appliances.Contains(a.Name))
            .Select(a => a.Id)
            .ToListAsync();

          foreach(var applianceId in applianceIds) {
            _context.RentObjectAppliances.Add(new RentObjectAppliance { RentObjId = rentObject.RentObjId, ApplianceId = applianceId}); 
          }
          await _context.SaveChangesAsync();
        }
        
        var rentObjectPreferences = await _context.RentObjectPreferences.Where(rop => rop.RentObjId == rentObject.RentObjId).ToListAsync();
        _context.RentObjectPreferences.RemoveRange(rentObjectPreferences);
        await _context.SaveChangesAsync();
        if (listingData.Conditions.Preferences != null && listingData.Conditions.Preferences.Length > 0) {
          var preferenceIds = await _context.Preferences
            .Where(p => listingData.Conditions.Preferences.Contains(p.Name))
            .Select(p => p.Id)
            .ToListAsync();

          foreach(var preferenceId in preferenceIds) {
            _context.RentObjectPreferences.Add(new RentObjectPreference { RentObjId = rentObject.RentObjId, PreferenceId = preferenceId}); 
          }
          await _context.SaveChangesAsync();
        }
        
        var rentObjectAddInfs = await _context.RentObjectAddInfs.Where(roai => roai.RentObjId == rentObject.RentObjId).ToListAsync();
        _context.RentObjectAddInfs.RemoveRange(rentObjectAddInfs);
        await _context.SaveChangesAsync();
        if (listingData.Additional.Facilities != null && listingData.Additional.Facilities.Length > 0) {
          var addInfIds = await _context.AddtitionalInfs
            .Where(ai => listingData.Additional.Facilities.Contains(ai.Name))
            .Select(ai => ai.Id)
            .ToListAsync();

          foreach(var addInfId in addInfIds) {
            _context.RentObjectAddInfs.Add(new RentObjectAddInf { RentObjId = rentObject.RentObjId, AddInfId = addInfId}); 
          }
          await _context.SaveChangesAsync();
        }
        
        var rentObjectMetroStations = await _context.RentObjectsMetroStations.Where(roms => roms.RentObjId == rentObject.RentObjId).ToListAsync();
        _context.RentObjectsMetroStations.RemoveRange(rentObjectMetroStations);
        await _context.SaveChangesAsync();
        if (listingData.Map.MetroParams != null && listingData.Map.MetroParams.Length > 0) {
          List<string> metroStationNames = listingData.Map.MetroParams
            .Where(m => m.Station != null)
            .Select(m => m.Station.Name)
            .ToList();

          var metroStationsData = await _context.MetroStations
            .Where(ms => metroStationNames.Contains(ms.Name))
            .Select(ms => new { ms.Id, ms.Name})
            .ToListAsync();

          var metroParams = listingData.Map.MetroParams;

          var metroStations = metroStationsData
            .Join(
              metroParams,
              station => station.Name,
              param => param.Station.Name,
              (station, param) => new
              {
                station.Id,
                station.Name,
                param.WayType,
                param.Minutes
              }
            )
          .ToList();

          foreach(var metroStation in metroStations) {
            _context.RentObjectsMetroStations.Add(
            new RentObjectMetroStation { 
              RentObjId = rentObject.RentObjId, 
              MetroStationId = metroStation.Id, 
              WayType = metroStation.WayType, 
              TravelTime = metroStation.Minutes
            }); 
          }
          await _context.SaveChangesAsync();
        }

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return Ok(new { Message =  "Данные успешно вставлены"} );
      }
      catch (Exception ex)
      {
        await transaction.RollbackAsync();
        Console.WriteLine($"Error updating profile image: {ex.Message}");

        if (ex.InnerException != null)
        {
          Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
        }
        return StatusCode(500, new { Message = $"Произошла ошибка: {ex.Message}"} );
      }
    }
  }

  [Authorize]
  [HttpPost("toggleComparison")]
  public async Task<IActionResult> ToggleComparison([FromBody] ToggleModel model)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == model.Username);
      if (user == null)
      {
        return BadRequest(new { Message = "Пользователь не найден"});
      }

      var comparison = await _context.Comparisons.FirstOrDefaultAsync(c => c.UserId == user.Id && c.RentObjectId == model.ObjectId);

      if (comparison != null)
      {
        _context.Comparisons.Remove(comparison);
      }
      else
      {
        _context.Comparisons.Add(new Comparison { UserId = user.Id, RentObjectId = model.ObjectId });
      }

      await _context.SaveChangesAsync();

      return Ok(new { Message = "Операция выполнена успешно"});
    }
    catch (Exception ex)
    {
      if (ex.InnerException != null)
      {
        Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
      }
      return BadRequest(new { Message = $"Ошибка: {ex.Message}"});
    }
  }

  [Authorize]
  [HttpGet("getUsers")]
  public async Task<IActionResult> GetUsers()
  {
    try
    {
      var users = await _context.Users.Select(u => u.Name).ToListAsync();
      if (users == null)
        return NotFound(new { Message = $"Can not find any users"});

      return Ok(users);
    }
    catch (Exception ex)
    {
      return BadRequest( new { Message = $"Error while retrieving comparisons objects: {ex.Message}"});
    }
  }
}
