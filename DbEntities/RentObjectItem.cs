using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public abstract class RentObjectItem
{
  [Column("rent_object_id")]
  [Key]
  public int RentObjId { get; set; }
}
