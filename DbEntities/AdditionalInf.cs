using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("additional_information")]
public class AddtitionalInf
{
  [Column("add_inf_id")]
  [Key]
  public int Id { get; set; }

  [Column("add_inf_name")]
  public string Name { get; set; }
}