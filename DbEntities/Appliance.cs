using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("appliances")]
public class Appliance
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("name")]
  public string Name { get; set; }
}