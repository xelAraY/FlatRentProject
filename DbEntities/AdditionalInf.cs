using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("additional_information")]
public class AddtitionalInf
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("name")]
  public string Name { get; set; }
}