using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("preferences")]
public class Preference
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("name")]
  public string Name { get; set; }
}