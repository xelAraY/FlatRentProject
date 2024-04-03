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
          return BadRequest(new { Message = "Ошибка при удалении пользователя" });
        }
    }
}
