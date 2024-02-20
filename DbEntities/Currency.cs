using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("currencies")]
public class Currency
{
  [Column("curr_id")]
  [Key]
  public int CurrId { get; set; }

  [Column("curr_code")]
  public string CurrCode { get; set; }
}