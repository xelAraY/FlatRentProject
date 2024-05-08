public class ListingDataModel {
  public GeneralFlatInfo General { get; set; }
  public AddressInfo Map { get; set; }
  public AreaFlatInfo Area { get; set; }
  public AdditionalFlatInfo Additional { get; set; }
  public ConditionsInfo Conditions { get; set; }
  public DescriptionInfo Description { get; set; }
  public ContactsInfo ContactsInfo { get; set; }
  public MediaInfo Media { get; set; }
  public string UserName { get; set; }
}

public class GeneralFlatInfo {
  public int RoomsCount { get; set; }
  public int Floor { get; set; }
  public int FloorAmount { get; set; }
  public int? ConstructionYear { get; set; }
  public string? BathroomType { get; set; }
  public string? BalconyType { get; set; }
}

public class AddressInfo {
  public string Region { get; set; }
  public string City { get; set; }
  public string Street { get; set; }
  public string HouseNumber { get; set; }
  public string? District { get; set; }
  public string? MicroDistrict { get; set; }
  public decimal[] Coordinates { get; set; }
  public MetroStations[]? MetroParams { get; set; }
}

public class MetroStations {
  public MetroStationInfo Station { get; set; }
  public string WayType { get; set; }
  public short Minutes { get; set; }
}

public class MetroStationInfo {
  public string Name { get; set; }
  public string Color { get; set; }
}

public class AreaFlatInfo {
  public int TotalArea { get; set; }
  public int LivingArea { get; set; }
  public int KitchenArea { get; set; }
}

public class AdditionalFlatInfo {
  public string? FurnitureType { get; set; }
  public string? PlateType { get; set; }
  public string[]? Facilities { get; set; }
  public string[]? Appliances { get; set; }
}

public class ConditionsInfo {
  public string Currency { get; set; }
  public int RentPrice { get; set; }
  public string Rent { get; set; }
  public string RentalPeriod { get; set; }
  public string? Prepayment { get; set; }
  public string[]? Preferences { get; set; }
}

public class DescriptionInfo {
  public string? Title { get; set; }
  public string? Description { get; set; }
}

public class ContactsInfo {
  public ContactInfo[] Contacts { get; set; }
}

public class ContactInfo {
  public string Phone { get; set; }
  public string Name { get; set; }
  public string? Email { get; set; }
}

public class MediaInfo {
  public string[]? Photos { get; set; }
}