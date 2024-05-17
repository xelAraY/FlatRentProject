using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
  public DbSet<User> Users { get; set; }
  public DbSet<Photo> Photos { get; set; }
  public DbSet<RentObject> RentObjects { get; set; }
  public DbSet<Address> Addresses { get; set; }
  public DbSet<Preference> Preferences { get; set; }
  public DbSet<Appliance> Appliances { get; set; }
  public DbSet<AddtitionalInf> AddtitionalInfs { get; set; }

  public DbSet<RentObjectPreference> RentObjectPreferences { get; set; }
  public DbSet<RentObjectAppliance> RentObjectAppliances { get; set; }
  public DbSet<RentObjectAddInf> RentObjectAddInfs { get; set; }
  public DbSet<Favourite> Favourites { get; set; }

  public DbSet<RentObjectMetroStation> RentObjectsMetroStations { get; set; }

  public DbSet<MetroStation> MetroStations { get; set; }

  public DbSet<MetroLineColor> MetroLinesColors { get; set; }

  public DbSet<Contact> Contacts { get; set; }

  public DbSet<Currency> Currencies { get; set; }

  public DbSet<Comparison> Comparisons { get; set; }

  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
  {
  }
}