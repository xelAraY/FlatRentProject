using System.ComponentModel.DataAnnotations;

public class UserRegistrationModel
{
    [Required]
    public string Username { get; set; }
    public string? Name { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    [Required]
    public string Password { get; set; }
}
