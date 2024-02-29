using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("m2m_rnt_obj_pref")]
public class RentObjectPreference
{
  [Column("rnt_obj_pref_id")]
  [Key]
  public int RentObjectPreferenceId { get; set; }

  [Column("rent_object_id")]
  public int RentObjId { get; set; }

  [Column("preference_id")]
  public int PreferenceId { get; set; }
}