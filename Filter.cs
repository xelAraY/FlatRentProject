
using System.Net;
using Microsoft.EntityFrameworkCore;

public static class Filter
{
  public static async Task<List<object>> GetRecentRentObjectsCommonQuery(IQueryable<RentObject> rentObjectsQuery, ApplicationDbContext _context, bool showData = true, bool? withPhotos = true, int? takeCount = null)
  {
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

      if (takeCount.HasValue && takeCount.Value > 0)
      {
        query = query.OrderByDescending(ro => ro.CreatedAt).Take(takeCount.Value);
      }
      else
      {
        query = query.OrderByDescending(ro => ro.CreatedAt);
      }

      var recentRentObjects = await query
          .Join(
              _context.Users,
              ro => ro.OwnerId,
              user => user.Id,
              (ro, user) => new { RentObject = ro, Owner = user }
          )
          .Join(
              _context.Currencies,
              result => result.RentObject.CurrencyId,
              currency => currency.CurrId,
              (result, currency) => new { result.RentObject, result.Owner, Currency = currency }
          )
          .Join(
              _context.Addresses,
              result => result.RentObject.AddressId,
              address => address.AddrId,
              (result, address) => new { result.RentObject, result.Owner, result.Currency, Address = address }
          )
          .Select(result => new
          {
            result.RentObject,
            Currency = result.Currency.CurrCode,
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

      var rentObjectIds = recentRentObjects.Select(ro => ro.RentObject.RentObjId);
      var photos = await _context.Photos
          .Where(photo => rentObjectIds.Contains(photo.RentObjId))
          .ToListAsync();

      var result = recentRentObjects.Select(result => new
      {
        result.RentObject,
        result.Currency,
        result.Owner,
        result.Address,
        Photos = withPhotos.GetValueOrDefault() ? photos.Where(photo => photo.RentObjId == result.RentObject.RentObjId).Select(photo => photo.Url) : []
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

    var filteredQuery = query
        .Join(
            context.Currencies,
            ro => ro.CurrencyId,
            currency => currency.CurrId,
            (ro, currency) => new { RentObject = ro, Currency = currency.CurrCode }
        );

    if (minPrice.HasValue)
    {
      decimal convertedMinPrice = ConvertToBYN(minPrice, currencyType);  
      filteredQuery = filteredQuery.Where(joined => context.ConvertToBYN(joined.RentObject.RentPrice, joined.Currency) >= convertedMinPrice);
    }

    if (maxPrice.HasValue){
      decimal convertedMaxPrice = ConvertToBYN(maxPrice, currencyType);  
      filteredQuery = filteredQuery.Where(joined => context.ConvertToBYN(joined.RentObject.RentPrice, joined.Currency) <= convertedMaxPrice);
    }
    
    return filteredQuery.Select(joined => joined.RentObject);    
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

  private static decimal ConvertToBYN(decimal? price, string currencyType)
  {
    if (!price.HasValue)
    {
      return 0;
    }

    decimal usdToByn = 3.2063m;
    decimal eurToByn = 3.5045m;

    decimal convertedPrice;
    switch (currencyType)
    {
      case "USD":
        convertedPrice = price.Value * usdToByn;
        break;
      case "EUR":
        convertedPrice = price.Value * eurToByn;
        break;
      default:
        convertedPrice = price.Value;
        break;
    }

    return convertedPrice;
  }
}