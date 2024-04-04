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
  public async Task<IActionResult> ToggleFavourite([FromBody] FavouriteToggleModel model)
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
}
