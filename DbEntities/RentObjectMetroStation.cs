using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("rent_objects_metro_stations")]
public class RentObjectMetroStation
{
  [Column("id")]
  [Key]
  public int Id { get; set; }

  [Column("rent_object_id")]
  public int RentObjId { get; set; }

  [Column("metro_station_id")]
  public int MetroStationId { get; set; }

  [Column("way_type")]
  public string WayType { get; set; }

  [Column("travel_time")]
  public short TravelTime { get; set; }
}