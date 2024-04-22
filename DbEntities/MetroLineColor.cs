using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("metro_lines_colors")]
public class MetroLineColor
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("name")]
  public string Name { get; set; }
}