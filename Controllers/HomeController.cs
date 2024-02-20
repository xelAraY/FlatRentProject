using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

namespace FlatRent.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public HomeController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("recent")]
  public async Task<IActionResult> GetRecentRentObjects()
  {
    try
    {
      var recentRentObjects = await _context.RentObjects
        .OrderByDescending(ro => ro.CreatedAt)
        .Take(4)
        .Join(
            _context.Users,
            ro => ro.OwnerId,
            user => user.Id,
            (ro, user) => new { RentObject = ro, Owner = user }
        )
        .Join(
            _context.Currencies,
            result => result.RentObject.CurrencyId,
            currency => currency.CurrId,
            (result, currency) => new { result.RentObject, result.Owner, Currency = currency }
        )
        .Select(result => new
        {
          result.RentObject,
          Currency = result.Currency.CurrCode,
          Owner = new
          {
            result.Owner.Name,
            result.Owner.FullName,
            result.Owner.PhoneNumber,
            result.Owner.RegistrationDate,
            result.Owner.LastLogin
          }

        })
        .ToListAsync();

      var rentObjectIds = recentRentObjects.Select(ro => ro.RentObject.RentObjId);
      var photos = await _context.Photos
          .Where(photo => rentObjectIds.Contains(photo.RentObjId))
          .ToListAsync();

      var result = recentRentObjects.Select(result => new
      {
        result.RentObject,
        result.Currency,
        result.Owner,
        Photos = photos.Where(photo => photo.RentObjId == result.RentObject.RentObjId).Select(photo => photo.Url)
      }).ToList();

      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении последних объявлений: {ex.Message}" });
    }
  }

}
