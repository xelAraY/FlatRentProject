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
public class SearchController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public SearchController(ApplicationDbContext context)
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

  [HttpGet("filter")]
  public async Task<IActionResult> GetFilteredRentObjects([FromQuery] RentObjectFilter filters)
  {
    try
    {
      var rentObjectsQuery = _context.RentObjects.AsQueryable();
      rentObjectsQuery = Filter.ApplyNumberOfRoomsFilter(rentObjectsQuery, filters.NumberOfRooms);
      rentObjectsQuery = Filter.ApplyLocationsFilter(rentObjectsQuery, _context, filters.Locations);
      rentObjectsQuery = Filter.ApplyPriceFilter(rentObjectsQuery, _context, filters.MinPrice, filters.MaxPrice, filters.CurrencyType);
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context);
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении последних объявлений: {ex.Message}" });
    }
  }

  [HttpGet("get-by-total-area")]
  public async Task<IActionResult> GetRecentRentObjectsByLivingArea([FromQuery] string field, int minArea, int maxArea)
  {
    try
    {
      var rentObjectsQuery = _context.RentObjects.AsQueryable();
      rentObjectsQuery = Filter.ApplyRangeFilter(rentObjectsQuery, field, minArea, maxArea);
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context, takeCount: 4);
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
}
