using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("favourites")]
public class Favourite
{
  [Column("id")]
  [Key]
  public int Id { get; set; }
  
  [Column("user_id")]
  public int UserId { get; set; }

  [Column("rent_object_id")]
  public int RentObjectId { get; set; }
}