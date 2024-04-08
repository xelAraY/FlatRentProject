using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("currencies")]
public class Currency
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("code")]
  public string Code { get; set; }
}