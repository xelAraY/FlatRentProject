using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("contacts")]
public class Contact
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("phone")]
  public string Phone { get; set; }

  [Column("name")]
  public string Name { get; set; }

  [Column("email")]
  public string Email { get; set; }

  [Column("rent_object_id")]
  public int RentObjectId { get; set; }
}