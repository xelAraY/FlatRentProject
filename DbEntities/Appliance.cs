using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("appliances")]
public class Appliance
{
  [Column("appl_id")]
  [Key]
  public int Id { get; set; }

  [Column("appl_name")]
  public string Name { get; set; }
}