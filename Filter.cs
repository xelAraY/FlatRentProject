
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

public static class Filter
{
  private static int listingsPerPage = 20;
  public static async Task<List<object>> GetRecentRentObjectsCommonQuery(IQueryable<RentObject> rentObjectsQuery, ApplicationDbContext _context, bool showData = true, string? sortType = null, int? page = null, int? takeCount = null, MapParams? mapParams = null)
  {
    rentObjectsQuery = rentObjectsQuery.Where(ro => !ro.Hidden);
    if (!showData)
    {
      var count = await rentObjectsQuery.CountAsync();
      var countObject = new { count = count };
      var result = new List<object> { countObject };
      return result;
    }
    else
    {
      var query = rentObjectsQuery;

      query = ApplySort(query, sortType);

      if (takeCount.HasValue && takeCount.Value > 0)
      {
        query = query.Take(takeCount.Value);
      }
      else if (page.HasValue && page.Value > 0) {
        query = query.Skip((page.Value-1)*listingsPerPage).Take(listingsPerPage); 
      }
      
      var recentRentObjects = await query
          .Join(
              _context.Users,
              ro => ro.OwnerId,
              user => user.Id,
              (ro, user) => new { RentObject = ro, Owner = user }
          )
          .Join(
              _context.Addresses,
              result => result.RentObject.AddressId,
              address => address.AddrId,
              (result, address) => new { result.RentObject, result.Owner, Address = address }
          )
          .Select(result => new
          {
            result.RentObject,
            Owner = new
            {
              result.Owner.Name,
              result.Owner.FullName,
              result.Owner.PhoneNumber,
              result.Owner.RegistrationDate,
              result.Owner.LastLogin
            },
            result.Address
          })
          .ToListAsync();

      if (mapParams != null && mapParams.LeftX != null && mapParams.RightX != null && mapParams.BottomY != null && mapParams.TopY != null ) {
        recentRentObjects = recentRentObjects
          .Where(result =>
              result.Address.Latitude >= mapParams.BottomY &&
              result.Address.Latitude <= mapParams.TopY &&
              result.Address.Longitude >= mapParams.LeftX &&
              result.Address.Longitude <= mapParams.RightX)
          .ToList();
      }

      var rentObjectIds = recentRentObjects.Select(ro => ro.RentObject.RentObjId);
      var photos = await _context.Photos
          .Where(photo => rentObjectIds.Contains(photo.RentObjId))
          .ToListAsync();

      var contacts = await _context.Contacts
          .Where(contact => rentObjectIds.Contains(contact.RentObjectId))
          .ToListAsync();

      var result = recentRentObjects.Select(result => new
      {
        result.RentObject,
        result.Owner,
        result.Address,
        Photos = photos.Where(photo => photo.RentObjId == result.RentObject.RentObjId).Select(photo => photo.Url),
        Contacts = contacts.Where(contact => contact.RentObjectId == result.RentObject.RentObjId),
      }).Cast<object>().ToList();

      return result;
    }
  }

  public static IQueryable<RentObject> ApplyRangeFilter(
    IQueryable<RentObject> rentObjectsQuery,
    string propertyName,
    int? valueFrom,
    int? valueTo)
  {
    if (valueFrom.HasValue)
    {
      rentObjectsQuery = rentObjectsQuery.Where(ro => EF.Property<int>(ro, propertyName) >= valueFrom);
    }
    
    if (valueTo.HasValue)
    {
      rentObjectsQuery = rentObjectsQuery.Where(ro => EF.Property<int>(ro, propertyName) <= valueTo);
    }

    return rentObjectsQuery;
  }

  public static IQueryable<RentObject> ApplyStringFilter(
    IQueryable<RentObject> rentObjectsQuery,
    string propertyName,
    string? characteristicTypes)
  {
    if (string.IsNullOrWhiteSpace(characteristicTypes))
    {
      return rentObjectsQuery;
    }

    var characteristicTypesArray = characteristicTypes.Split(',');

    return rentObjectsQuery
      .Where(ro => characteristicTypesArray.Contains(EF.Property<string>(ro, propertyName)));
  }

  public static IQueryable<RentObject> ApplyPreferenceFilter(
    IQueryable<RentObject> rentObjectsQuery, ApplicationDbContext _context,
    string? preferencesStr)
  {
    if (string.IsNullOrWhiteSpace(preferencesStr))
    {
      return rentObjectsQuery;
    }

    List<string> preferences = preferencesStr.Split(',', StringSplitOptions.RemoveEmptyEntries)
                                .Select(value => value.Trim())
                                .ToList();

    if (preferences != null && preferences.Any())
    {
      List<string?> decodedPreferences = preferences.Select(WebUtility.UrlDecode).ToList();

      var filteredRentObjectsQuery = rentObjectsQuery
          .Join(
              _context.RentObjectPreferences,
              ro => ro.RentObjId,
              rop => rop.RentObjId,
              (ro, rop) => new { RentObject = ro, RentObjectPreference = rop }
          )
          .Join(
              _context.Preferences,
              joined => joined.RentObjectPreference.PreferenceId,
              preference => preference.Id,
              (joined, preference) => new { RentObject = joined.RentObject, PreferenceName = preference.Name }
          )
          .Where(joined => decodedPreferences.Contains(joined.PreferenceName));

      // Группируем объявления по их идентификаторам и подсчитываем количество совпадающих предпочтений
      var groupedRentObjects = filteredRentObjectsQuery
          .GroupBy(joined => joined.RentObject.RentObjId)
          .Select(group => new
          {
            RentObjId = group.Key,
            MatchingPreferencesCount = group.Count()
          });

      // Фильтруем объявления, где количество совпадающих предпочтений равно общему количеству предпочтений в запросе
      var requiredMatchingCount = preferences.Count;
      var matchingRentObjectsIds = groupedRentObjects
          .Where(group => group.MatchingPreferencesCount == requiredMatchingCount)
          .Select(group => group.RentObjId);

      // Используем идентификаторы для фильтрации исходных объявлений
      rentObjectsQuery = rentObjectsQuery.Where(ro => matchingRentObjectsIds.Contains(ro.RentObjId));
    }
    return rentObjectsQuery;
  }

  public static IQueryable<RentObject> ApplyApplianceFilter(
    IQueryable<RentObject> rentObjectsQuery, ApplicationDbContext _context,
    string? applianceStr)
  {
    if (string.IsNullOrWhiteSpace(applianceStr))
    {
      return rentObjectsQuery;
    }

    List<string> appliances = applianceStr.Split(',', StringSplitOptions.RemoveEmptyEntries)
                                .Select(value => value.Trim())
                                .ToList();

    if (appliances != null && appliances.Any())
    {
      List<string?> decodedAppliances = appliances.Select(WebUtility.UrlDecode).ToList();

      var filteredRentObjectsQuery = rentObjectsQuery
          .Join(
              _context.RentObjectAppliances,
              ro => ro.RentObjId,
              roa => roa.RentObjId,
              (ro, roa) => new { RentObject = ro, RentObjectAppliances = roa }
          )
          .Join(
              _context.Appliances,
              joined => joined.RentObjectAppliances.ApplianceId,
              appliance => appliance.Id,
              (joined, appliance) => new { RentObject = joined.RentObject, ApplianceName = appliance.Name }
          )
          .Where(joined => decodedAppliances.Contains(joined.ApplianceName));

      // Группируем объявления по их идентификаторам и подсчитываем количество совпадающих предпочтений
      var groupedRentObjects = filteredRentObjectsQuery
          .GroupBy(joined => joined.RentObject.RentObjId)
          .Select(group => new
          {
            RentObjId = group.Key,
            MatchingAppliancesCount = group.Count()
          });

      // Фильтруем объявления, где количество совпадающих предпочтений равно общему количеству предпочтений в запросе
      var requiredMatchingCount = appliances.Count;
      var matchingRentObjectsIds = groupedRentObjects
          .Where(group => group.MatchingAppliancesCount == requiredMatchingCount)
          .Select(group => group.RentObjId);

      // Используем идентификаторы для фильтрации исходных объявлений
      rentObjectsQuery = rentObjectsQuery.Where(ro => matchingRentObjectsIds.Contains(ro.RentObjId));
    }
    return rentObjectsQuery;
  }

  public static IQueryable<RentObject> ApplyNumberOfRoomsFilter(IQueryable<RentObject> query, string? numberOfRooms)//
  {
    if (string.IsNullOrWhiteSpace(numberOfRooms))
    {
      return query;
    }

    var roomsArray = numberOfRooms.Split(',').Select(int.Parse).ToArray();

    return query.Where(ro => roomsArray.Contains(ro.RoomsCount));
  }

  public static IQueryable<RentObject> ApplyLocationsFilter(IQueryable<RentObject> query, ApplicationDbContext context, string? locations)//
  {
    if (string.IsNullOrWhiteSpace(locations))
    {
      return query;
    }

    var locationsArray = locations.Split(',');

    return query
        .Join(
            context.Addresses,
            ro => ro.AddressId,
            address => address.AddrId,
            (ro, address) => new { RentObject = ro, Address = address }
        )
        .Where(joined => locationsArray.Contains(joined.Address.City))
        .Select(joined => joined.RentObject);
  }

  public static IQueryable<RentObject> ApplyPriceFilter(IQueryable<RentObject> query, ApplicationDbContext context, decimal? minPrice, decimal? maxPrice, string? currencyType)
  {
    if (string.IsNullOrWhiteSpace(currencyType))
    {
      return query;
    }

    if (minPrice.HasValue)
    {
      decimal minPriceInBYN = ConvertToBYN(minPrice, currencyType, context);  
      query = query.Where(ro => ro.RentPrice >= minPriceInBYN);
    }

    if (maxPrice.HasValue){
      decimal maxPriceInBYN = ConvertToBYN(maxPrice, currencyType, context);  
      query = query.Where(ro => ro.RentPrice <= maxPriceInBYN);
    }
    
    return query;    
  }

  public static IQueryable<RentObject> ApplyFurnitureFilter(IQueryable<RentObject> query, bool? furniture)
  {
    if (!furniture.HasValue)
    {
      return query;
    }

    string comparisonValue = furniture.GetValueOrDefault() ? "Есть" : "Нет";

    return query.Where(ro => ro.Furniture == comparisonValue);
  }

  public static IQueryable<RentObject> ApplyPhotosFilter(IQueryable<RentObject> query, ApplicationDbContext context, bool? withPhotos)
  {
    if (!withPhotos.HasValue)
    {
        return query;
    }
    else
    {
      var rentObjectIdsWithPhotos = context.Photos
          .Select(p => p.RentObjId)
          .Distinct();

      if (withPhotos.Value)
      {
        query = query.Where(ro => rentObjectIdsWithPhotos.Contains(ro.RentObjId));
      }

      return query;
    }
  }

  public static async Task<List<object>> GetMapRentObjects(IQueryable<RentObject> rentObjectsQuery, ApplicationDbContext _context, MapParams mapParams)
  {
    var query = rentObjectsQuery;
    query = query.OrderByDescending(ro => ro.CreatedAt);
    var recentRentObjects = await query
        .Join(
            _context.Users,
            ro => ro.OwnerId,
            user => user.Id,
            (ro, user) => new { RentObject = ro, Owner = user }
        )
        .Join(
            _context.Addresses,
            result => result.RentObject.AddressId,
            address => address.AddrId,
            (result, address) => new { result.RentObject, result.Owner, Address = address }
        )
        .Select(result => new
        {
          result.RentObject,
          Owner = new
          {
            result.Owner.Name,
            result.Owner.FullName,
            result.Owner.PhoneNumber,
            result.Owner.RegistrationDate,
            result.Owner.LastLogin
          },
          result.Address
        })
        .ToListAsync();

    recentRentObjects = recentRentObjects
          .Where(result =>
              result.Address.Latitude >= mapParams.BottomY &&
              result.Address.Latitude <= mapParams.TopY &&
              result.Address.Longitude >= mapParams.LeftX &&
              result.Address.Longitude <= mapParams.RightX)
          .ToList();

    var rentObjectIds = recentRentObjects.Select(ro => ro.RentObject.RentObjId);
    var photos = await _context.Photos
        .Where(photo => rentObjectIds.Contains(photo.RentObjId))
        .ToListAsync();

    var result = recentRentObjects.Select(result => new
    {
      result.RentObject,
      result.Owner,
      result.Address,
      Photos = photos.Where(photo => photo.RentObjId == result.RentObject.RentObjId).Select(photo => photo.Url)
    }).Cast<object>().ToList();

    return result;
  }

  private static IQueryable<RentObject> ApplySort(IQueryable<RentObject> query, string sortType)
  {
    Console.WriteLine(sortType);
    switch (sortType) {
      case "createdAt":
        query = query.OrderByDescending(ro => ro.CreatedAt);
      break;

      case "minPrice":
        query = query.OrderBy(ro => ro.RentPrice);
      break;

      case "maxPrice":
        query = query.OrderByDescending(ro => ro.RentPrice);
      break;

      default:
        query = query.OrderByDescending(ro => ro.CreatedAt); 
      break;
    }

    return query;
  }

  private static decimal ConvertToBYN(decimal? price, string currencyType, ApplicationDbContext context)
  {
    if (!price.HasValue)
    {
      return 0;
    }

    decimal exchangeRate = context.Currencies
      .Where(curr => curr.Code == currencyType)
      .Select(curr => curr.OfficialRate)
      .FirstOrDefault();

    return price.Value*exchangeRate;
  }
}

