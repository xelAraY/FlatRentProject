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
      var rentObjectsQuery = _context.RentObjects.AsQueryable();
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context);
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении последних объявлений: {ex.Message}" });
    }
  }

  [HttpGet("get-by-preferences")]
  public async Task<IActionResult> GetRecentRentObjectsByPreferences([FromQuery] List<string> preferences)
  {
    try
    {
      var rentObjectsQuery = _context.RentObjects.AsQueryable();

      // string decodedString = WebUtility.UrlDecode(preferences);
      // var rentObjectsQueryWithPets = _context.RentObjects
      //     .Where(ro => ro.Preferences == decodedString);
      rentObjectsQuery = Filter.ApplyPreferenceFilter(rentObjectsQuery, _context, preferences);
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context);
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении последних объявлений: {ex.Message}" });
    }
  }

  [HttpGet("get-by-total-area")]
  public async Task<IActionResult> GetRecentRentObjectsByLivingArea([FromQuery] string filed, int minArea, int maxArea)
  {
    try
    {
      var rentObjectsQuery = _context.RentObjects.AsQueryable();
      rentObjectsQuery = Filter.ApplyRangeFilter(rentObjectsQuery, filed, minArea, maxArea);
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context);
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении последних объявлений: {ex.Message}" });
    }
  }


}
