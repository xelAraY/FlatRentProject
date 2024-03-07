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
}
