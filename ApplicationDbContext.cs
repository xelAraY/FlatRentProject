using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
  public DbSet<User> Users { get; set; }
  public DbSet<Photo> Photos { get; set; }
  public DbSet<RentObject> RentObjects { get; set; }
  public DbSet<Currency> Currencies { get; set; }
  public DbSet<Preference> Preferences { get; set; }

  public DbSet<RentObjectPreference> RentObjectPreferences { get; set; }
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
  {
  }
}