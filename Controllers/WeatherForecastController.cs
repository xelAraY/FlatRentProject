using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace FlatRent.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, ApplicationDbContext context, IConfiguration configuration)
    {
        _logger = logger;
                _configuration = configuration;
        _context = context;
    }

    [HttpGet("photos")]
    public Task<IActionResult> Get()
    {
        var photos = _context.Photos.ToList();

        return Task.FromResult<IActionResult>(Ok(photos));
    }
}
