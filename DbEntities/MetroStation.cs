using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("metro_stations")]
public class MetroStation
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("name")]
  public string Name { get; set; }

  [Column("color_id")]
  public int ColorId { get; set; }
}