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
}
