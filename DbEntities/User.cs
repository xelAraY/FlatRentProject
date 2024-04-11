using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("users")]
public class User
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("username")]
  public string? Name { get; set; }

  [Column("name")]
  public string? FullName { get; set; }

  [Column("surname")]
  public string? Surname { get; set; }

  [Column("gender")]
  public string? Gender { get; set; }

  [Column("email")]
  public string? Email { get; set; }

  [Column("password_hash")]
  public string? PassHash { get; set; }

  [Column("phone_number")]
  public string? PhoneNumber { get; set; }

  [Column("avatar_image_url")]
  public string? AvatarImageUrl { get; set; }

  [Column("registration_date")]
  public DateTime RegistrationDate { get; set; }

  [Column("last_login")]
  public DateTime? LastLogin { get; set; }
}