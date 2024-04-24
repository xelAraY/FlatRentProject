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

  [DbFunction("converttobyn", "public")]
  public decimal ConvertToBYN(decimal? price, string currencyType)
  {
    throw new NotImplementedException("This method is mapped to a database function and should not be invoked in C# code.");
  }
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<RentObjectAppliance>().HasNoKey();
      modelBuilder.Entity<RentObjectPreference>().HasNoKey();
      modelBuilder.Entity<RentObjectAddInf>().HasNoKey();
    }
}