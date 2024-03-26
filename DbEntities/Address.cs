using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("address")]
public class Address
{
  [Column("id")]
  [Key]
  public int AddrId { get; set; }

  [Column("region")]
  public string Region { get; set; }

  [Column("city")]
  public string City { get; set; }

  [Column("street")]
  public string Street { get; set; }

  [Column("house_number")]
  public string HouseNumber { get; set; }

  [Column("district")]
  public string District { get; set; }

  [Column("microdistrict")]
  public string Microdistrict { get; set; }
  [Column("latitude")]
  public decimal Latitude { get; set; }
  [Column("longitude")]
  public decimal Longitude { get; set; }
}