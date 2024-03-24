using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects_add_inf")]
public class RentObjectAddInf
{
  [Column("rent_object_id")]
  public int RentObjId { get; set; }

  [Column("add_inf_id")]
  public int AddInfId { get; set; }
}