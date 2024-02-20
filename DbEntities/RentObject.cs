using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects")]
public class RentObject
{
  [Column("rnt_obj_id")]
  [Key]
  public int RentObjId { get; set; }

  [Column("title")]
  public string Title { get; set; }

  [Column("description")]
  public string Description { get; set; }

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
  public string Bathroom { get; set; }

  [Column("balcony")]
  public string? Balcony { get; set; }

  [Column("construction_year")]
  public int ConstructionYear { get; set; }

  [Column("furniture")]
  public string Furniture { get; set; }

  [Column("plate")]
  public string Plate { get; set; }

  [Column("address")]
  public string Address { get; set; }

  [Column("rent_price")]
  public double RentPrice { get; set; }

  [Column("currency_id")]
  public int CurrencyId { get; set; } //!!

  [Column("prepayment")]
  public string Prepayment { get; set; }

  [Column("rent")]
  public string Rent { get; set; }

  [Column("preferences")]
  public string Preferences { get; set; }

  [Column("owner_id")]
  public int? OwnerId { get; set; } //потом убрать знак вопроса

  [Column("created_at")]
  public DateTime CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime UpdatedAt { get; set; }
}