public class RentObjectFilter
{
  public string? NumberOfRooms { get; set; }
  public string? Locations { get; set; }

  public int? MinPrice { get; set; }

  public int? MaxPrice { get; set; }

  public string? CurrencyType { get; set; }

  public int? FloorFrom { get; set; }

  public int? FloorTo { get; set; }

  public int? TotalAreaFrom { get; set; }

  public int? TotalAreaTo { get; set; }

  public int? LivingAreaFrom { get; set; }

  public int? LivingAreaTo { get; set; }

  public int? KitchenAreaFrom { get; set; }

  public int? KitchenAreaTo { get; set; }

  public string? BathroomType { get; set; }

  public string? BalconyType { get; set; }

  public string? Appliances { get; set; }

  public string? RentalPeriod { get; set; }

  public string? Preferences { get; set; }

  public string? Prepayment { get; set; }

  public bool? Furniture { get; set; }

  public bool? Photos { get; set; }

  public decimal? LeftX { get; set; }
  public decimal? RightX { get; set; }
  public decimal? BottomY { get; set; }
  public decimal? TopY { get; set; }

  public bool ShowData { get; set; }
  public int? Page { get; set; }
}
