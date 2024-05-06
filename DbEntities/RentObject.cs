using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects")]
public class RentObject
{
  [Column("id")]
  [Key]
  public int RentObjId { get; set; }

  [Column("title")]
  public string Title { get; set; }

  [Column("description")]
  public string? Description { get; set; }

  [Column("rooms_count")]
  public int RoomsCount { get; set; }

  [Column("floor")]
  public int FloorNumber { get; set; }

  [Column("floors_number")]
  public int FloorsAmount { get; set; }

  [Column("total_area")]
  public int TotalArea { get; set; }

  [Column("living_area")]
  public int LivingArea { get; set; }

  [Column("kitchen_area")]
  public int KitchenArea { get; set; }

  [Column("bathroom")]
  public string? Bathroom { get; set; }

  [Column("balcony")]
  public string? Balcony { get; set; }

  [Column("construction_year")]
  public int? ConstructionYear { get; set; }

  [Column("furniture")]
  public string? Furniture { get; set; }

  [Column("plate")]
  public string? Plate { get; set; }

  [Column("address_id")]
  public int AddressId { get; set; }

  [Column("rent_price")]
  public decimal RentPrice { get; set; }

  [Column("prepayment")]
  public string? Prepayment { get; set; }

  [Column("rent")]
  public string? Rent { get; set; }

  [Column("owner_id")]
  public int OwnerId { get; set; }

  [Column("created_at")]
  public DateTime CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime? UpdatedAt { get; set; }

  [Column("rental_period")]
  public string? RentalPeriod { get; set; }

  [Column("preview_image_url")]
  public string? PreviewImageUrl { get; set; }

  [Column("hidden")]
  public bool Hidden { get; set; }
}