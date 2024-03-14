import React, { useCallback, useEffect, useState } from "react";
import { FilterOptions } from "./FilterOptions";
import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { FlatsList } from "./FlatsList";
import { FilterState } from "src/interfaces/SearchInterfaces";

export const RentFindingPage = () => {
  const location = useLocation();
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    rooms: [],
    locations: [],
    minPrice: 0,
    maxPrice: 0,
    currentCurrency: "BYN",
  });

  const updateFiltersAndFetchData = useCallback(async () => {
    try {
      setLoading(true);
      const paramsArray = [];
      filters.rooms.length > 0 && paramsArray.push(`numberOfRooms=${filters.rooms.join(',')}`);
      filters.locations.length > 0 && paramsArray.push(`locations=${filters.locations.join(',')}`);
      if (filters.minPrice !== filters.maxPrice) {
        paramsArray.push(`minPrice=${Math.min(filters.minPrice, filters.maxPrice)}`);
        paramsArray.push(`maxPrice=${Math.max(filters.minPrice, filters.maxPrice)}`);
        paramsArray.push(`currencyType=${filters.currentCurrency}`);
      }
      const queryParams = paramsArray.join('&');
      console.log("filters: ", filters);
      const response = await fetch(`api/search/filter${queryParams ? '?' + queryParams : ''}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Данные с сервера', data);
        setRentObjects(data);
      } else {
        console.error('Ошибка при получении данных', data.message);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    updateFiltersAndFetchData();
  }, [updateFiltersAndFetchData]);

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const roomsParam = queryParams.get('numberOfRooms');
    const locationsParam = queryParams.get('locations');
    const minPriceParam = queryParams.get('minPrice');
    const maxPriceParam = queryParams.get('maxPrice');
    const currencyParam = queryParams.get('currencyType');

    const newFilters: Partial<FilterState> = {};

    if (roomsParam) {
      newFilters.rooms = roomsParam.split(',');
    }
    if (locationsParam) {
      newFilters.locations = locationsParam.split(',');
    }
    if (minPriceParam) {
      newFilters.minPrice = Number(minPriceParam);
    }
    if (maxPriceParam) {
      newFilters.maxPrice = Number(maxPriceParam);
    }
    if (currencyParam) {
      newFilters.currentCurrency = currencyParam;
    }

    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, [location.search]);


  return (
    <Stack flexDirection={"column"} overflow='auto'>
      <FilterOptions filters={filters} onFiltersChange={handleFiltersChange} />
      <FlatsList rentObjects={rentObjects} isLoading={loading} />
    </Stack>
  );
}
