using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects_preferences")]
public class RentObjectPreference
{
  [Column("id")]
  [Key]
  public int Id { get; set; }
  
  [Column("rent_object_id")]
  public int RentObjId { get; set; }

  [Column("preference_id")]
  public int PreferenceId { get; set; }
}