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
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(IConfiguration configuration, ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        try
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Name == model.Username);

            if (user != null && BCrypt.Net.BCrypt.Verify(model.Password, user.PassHash))
            {
                var token = GenerateJwtToken(user);

                return Ok(new { Token = token });
            }

            return Unauthorized(new { Message = "Неверные учетные данные." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = $"Ошибка при аутентификации: {ex.Message}" });
        }
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("My_super_long_secret_key_here123!@#"));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            // Другие нужные вам утверждения
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
