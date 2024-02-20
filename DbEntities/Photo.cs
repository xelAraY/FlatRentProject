using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("photos")]
public class Photo
{
  [Column("pht_id")]
  [Key]
  public int PhotoId { get; set; }

  [Column("rent_object_id")]
  public int RentObjId { get; set; }

  [Column("picture_url")]
  public string? Url { get; set; }
}