using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects_appliances")]
public class RentObjectAppliance
{
  [Column("id")]
  [Key]
  public int Id { get; set; }
  
  [Column("rent_object_id")]
  public int RentObjId { get; set; }

  [Column("appliance_id")]
  public int ApplianceId { get; set; }
}