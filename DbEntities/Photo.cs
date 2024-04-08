using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("photos")]
public class Photo
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("rent_object_id")]
  public int RentObjId { get; set; }

  [Column("picture_url")]
  public string? Url { get; set; }
}