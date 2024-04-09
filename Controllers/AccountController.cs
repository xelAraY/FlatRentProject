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

  [HttpPost("updateProfileImage")]
  public async Task<IActionResult> UpdateProfileImage([FromBody] UpdateAvatarImage model)
  {
    try
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == model.Username);
      if (user == null)
      {
        return NotFound( new { Message = $"User '{model.Username}' not found."});
      }

      user.AvatarImageUrl = model.ImageUrl;
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

      return Ok( new { Message = $"Profile image updated successfully for user '{model.Username}'."});
    }
    catch (Exception ex)
    {
      return StatusCode( 500, new { Message = $"Error updating profile image: {ex.Message}"});
    }
  }

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

  [HttpPost("updateUserData")]
  public async Task<IActionResult> UpdateUserData([FromBody] UserDataModel data)
  {
    try
    {
      if (!Regex.IsMatch(data.PhoneNumber, @"^\+375\d{2}\d{7}$"))
      {
        return BadRequest(new { Message = "Неправильный формат номера телефона. Используйте формат +375XXXXXXXXX." });
      }

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == data.Username);
      if (user == null)
      {
        return NotFound( new { Message = $"User '{data.Username}' not found."});
      }

      user.FullName = data.Name;
      user.Surname = data.SurName;
      user.PhoneNumber = data.PhoneNumber;
      user.Gender = data.Gender;
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

      var token = GenerateJwtToken(user);
      return Ok( new { Token = token, Message = $"User data successfully updated for user '{data.Username}'."});
    }
    catch (Exception ex)
    {
      return StatusCode( 500, new { Message = $"Error updating user data: {ex.Message}"});
    }
  }

  private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("My_super_long_secret_key_here123!@#"));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim("nickName", user.Name != null ? user.Name : ""),
            new Claim("name", user.FullName != null ? user.FullName : ""),
            new Claim("surname", user.Surname != null ? user.Surname : ""),
            new Claim("email", user.Email != null ? user.Email : ""),
            new Claim("phoneNumber", user.PhoneNumber != null ? user.PhoneNumber : ""),
            new Claim("gender", user.Gender != null ? user.Gender : "")
        };

        var token = new JwtSecurityToken(
            "your_issuer",
            "your_audience",
            claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
