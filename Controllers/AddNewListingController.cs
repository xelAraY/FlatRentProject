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
using System.Runtime.Serialization;

namespace FlatRent.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AddNewListingController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public AddNewListingController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("getAllStationsInfo")]
  public async Task<IActionResult> GetAllStationsInfo()
  {
    try
    {
      var allStationsInfo = await _context.MetroStations
        .Join(
          _context.MetroLinesColors,
          result => result.ColorId,
          line => line.Id,
          (result, line) => new { result.Name, Color = line.Name }
        )
        .ToListAsync();

      return Ok(allStationsInfo);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении информации о станциях метро: {ex.Message}" });
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
}
