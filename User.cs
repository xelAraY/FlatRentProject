using System.ComponentModel.DataAnnotations.Schema;

[Table("users")]
public class User {
  [Column("usr_id")]
  public int Id { get; set; }

  [Column("usr_name")]
  public string? Name { get; set; }

  [Column("full_name")]
  public string? FullName { get; set; }

  [Column("email")]
  public string? Email { get; set; }

  [Column("password_hash")]
  public string? PassHash { get; set; }

  [Column("phone_number")]
  public string? PhoneNumber { get; set; }

  [Column("profile_picture_url")]
  public string? ProfilePictureUrl { get; set; }

  [Column("registration_date")]
  public DateTime RegistrationDate { get; set; }

  [Column("last_login")]
  public DateTime? LastLogin { get; set; }
}