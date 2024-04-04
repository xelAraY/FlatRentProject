using Microsoft.AspNetCore.Mvc;

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
      rentObjectsQuery = Filter.ApplyRangeFilter(rentObjectsQuery, "FloorNumber", filters.FloorFrom, filters.FloorTo);
      rentObjectsQuery = Filter.ApplyRangeFilter(rentObjectsQuery, "TotalArea", filters.TotalAreaFrom, filters.TotalAreaTo);
      rentObjectsQuery = Filter.ApplyRangeFilter(rentObjectsQuery, "LivingArea", filters.LivingAreaFrom, filters.LivingAreaTo);
      rentObjectsQuery = Filter.ApplyRangeFilter(rentObjectsQuery, "KitchenArea", filters.KitchenAreaFrom, filters.KitchenAreaTo);
      rentObjectsQuery = Filter.ApplyStringFilter(rentObjectsQuery, "Bathroom", filters.BathroomType);
      rentObjectsQuery = Filter.ApplyStringFilter(rentObjectsQuery, "Balcony", filters.BalconyType);
      rentObjectsQuery = Filter.ApplyStringFilter(rentObjectsQuery, "RentalPeriod", filters.RentalPeriod);
      rentObjectsQuery = Filter.ApplyStringFilter(rentObjectsQuery, "Prepayment", filters.Prepayment);
      rentObjectsQuery = Filter.ApplyPreferenceFilter(rentObjectsQuery, _context, filters.Preferences);
      rentObjectsQuery = Filter.ApplyApplianceFilter(rentObjectsQuery, _context, filters.Appliances);
      rentObjectsQuery = Filter.ApplyPhotosFilter(rentObjectsQuery, _context, filters.Photos);
      rentObjectsQuery = Filter.ApplyFurnitureFilter(rentObjectsQuery, filters.Furniture);
      var result = await Filter.GetRecentRentObjectsCommonQuery(rentObjectsQuery, _context, showData: filters.ShowData, page: filters.Page, mapParams: new MapParams {LeftX = filters.LeftX, RightX = filters.RightX, BottomY = filters.BottomY, TopY = filters.TopY});
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении последних объявлений: {ex.Message}" });
    }
  }

  [HttpGet("map")]
  public async Task<IActionResult> GetRentObjectsInMapView([FromQuery] MapParams mapParams)
  {
    try
    {
      var rentObjectsQuery = _context.RentObjects.AsQueryable();
      var result = await Filter.GetMapRentObjects(rentObjectsQuery, _context, mapParams);
      return Ok(result);
    }
    catch (Exception ex)
    {
      return BadRequest(new { Message = $"Ошибка при получении последних объявлений: {ex.Message}" });
    }
  }
}
