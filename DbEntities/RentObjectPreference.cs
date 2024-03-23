using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects_preferences")]
public class RentObjectPreference : RentObjectItem
{
  [Column("preference_id")]
  public int PreferenceId { get; set; }
}