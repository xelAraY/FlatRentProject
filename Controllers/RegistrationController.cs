using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using System.Text.RegularExpressions;
using BCrypt.Net;

namespace FlatRent.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public RegistrationController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationModel model)
    {
        try
        {
            if (!Regex.IsMatch(model.PhoneNumber, @"^\+375\d{2}\d{7}$"))
            {
                return BadRequest(new { Message = "Неправильный формат номера телефона. Используйте формат +375XXXXXXXXX." });
            }

            if (!IsValidEmail(model.Email))
            {
                return BadRequest(new { Message = "Неправильный формат электронной почты." });
            }

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                using (var checkCommand = new NpgsqlCommand("SELECT COUNT(*) FROM users WHERE usr_name = @Username OR email = @Email OR phone_number = @PhoneNumber", connection))
                {
                    checkCommand.Parameters.AddWithValue("@Username", model.Username);
                    checkCommand.Parameters.AddWithValue("@Email", model.Email);
                    checkCommand.Parameters.AddWithValue("@PhoneNumber", model.PhoneNumber);

                    var existingRecordsCount = (long)await checkCommand.ExecuteScalarAsync();

                    if (existingRecordsCount > 0)
                    {
                        return BadRequest(new { Message = "Пользователь с указанным именем, почтой или номером телефона уже существует." });
                    }
                }

                string passwordHash =  BCrypt.Net.BCrypt.HashPassword(model.Password);
                using (var insertCommand = new NpgsqlCommand("INSERT INTO users (usr_name, full_name, email, phone_number, password_hash, avatar_image_url, registration_date, last_login) VALUES (@Username, @Fullname, @Email, @PhoneNumber, @PasswordHash, @AvatarImageUrl, @RegistrationDate, @LastLogin)", connection))
                {
                    insertCommand.Parameters.AddWithValue("@Username", model.Username);
                    insertCommand.Parameters.AddWithValue("@Fullname", model.Fullname);
                    insertCommand.Parameters.AddWithValue("@Email", model.Email);
                    insertCommand.Parameters.AddWithValue("@PhoneNumber", model.PhoneNumber);
                    insertCommand.Parameters.AddWithValue("@PasswordHash", passwordHash);
                    insertCommand.Parameters.AddWithValue("@RegistrationDate", DateTime.Now);
                    insertCommand.Parameters.AddWithValue("@AvatarImageUrl", DBNull.Value);
                    insertCommand.Parameters.AddWithValue("@LastLogin", DBNull.Value);

                    await insertCommand.ExecuteNonQueryAsync();
                }
            }

            return Ok(new { Message = "Вы успешно зарегистрировались." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = $"Ошибка при регистрации пользователя: {ex.Message}" });
        }
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}
