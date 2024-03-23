using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects_appliances")]
public class RentObjectAppliance : RentObjectItem
{
  [Column("appliance_id")]
  public int ApplianceId { get; set; }
}