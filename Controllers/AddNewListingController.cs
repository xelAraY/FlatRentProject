using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

  [HttpGet("getAllAppliances")]
  public async Task<IActionResult> GetAllAppliances()
  {
    try
    {
      var allAppliances = await _context.Appliances
        .Select(appliance => new {appliance.Name})
        .ToListAsync();

      return Ok(allAppliances);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении информации о бытовой технике: {ex.Message}" });
    }
  }

  [HttpGet("getAllFacilities")]
  public async Task<IActionResult> GetAllFacilities()
  {
    try
    {
      var allFacilities = await _context.AddtitionalInfs
        .Select(faciliti => new {faciliti.Name})
        .ToListAsync();

      return Ok(allFacilities);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении информации об удобствах: {ex.Message}" });
    }
  }
}
