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
public class FlatController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public FlatController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("{rentObjectId}/details")]
  public async Task<IActionResult> GetRentObjectDetails(int rentObjectId)
  {
    try
    {
      // Выборка удобств
      var rentObjectAppliances = await _context.RentObjectAppliances
            .Where(roa => roa.RentObjId == rentObjectId)
            .ToListAsync();

      var applianceIds = rentObjectAppliances.Select(roa => roa.ApplianceId);

      var appliances = await _context.Appliances
          .Where(a => applianceIds.Contains(a.Id))
          .Select(a => a.Name)
          .ToListAsync();

      // Выборка предпочтений
      var rentObjectPreferences = await _context.RentObjectPreferences
            .Where(rop => rop.RentObjId == rentObjectId)
            .ToListAsync();

      var preferenceIds = rentObjectPreferences.Select(rop => rop.PreferenceId);

      var preferences = await _context.Preferences
          .Where(p => preferenceIds.Contains(p.Id))
          .Select(p => p.Name)
          .ToListAsync();

      // Выборка Дополнительной информации
      var rentObjectAddInfs = await _context.RentObjectAddInfs
            .Where(roai => roai.RentObjId == rentObjectId)
            .ToListAsync();

      var addInfIds = rentObjectAddInfs.Select(roai => roai.AddInfId);

      var additionalInformations = await _context.AddtitionalInfs
          .Where(ai => addInfIds.Contains(ai.Id))
          .Select(ai => ai.Name)
          .ToListAsync();
      var result = new
      {
        Appliances = appliances,
        Preferences = preferences,
        AdditionalInformations = additionalInformations
      };
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении дополнительной информации: {ex.Message}" });
    }
  }
}
