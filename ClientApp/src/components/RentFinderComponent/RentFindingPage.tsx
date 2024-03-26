import React, { useEffect, useState } from "react";
import { FilterOptions } from "./FilterOptions";
import { Stack, Typography } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { FlatsList } from "./FlatsList";
import { FilterState } from "src/interfaces/SearchInterfaces";
import { NoFoundObject } from "./NoFoundObject";
import MapIcon from "@mui/icons-material/Map";
import { Button } from "src/shared";

export const RentFindingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    rooms: [],
    locations: [],
    minPrice: 0,
    maxPrice: 0,
    currentCurrency: "BYN",
    floor: { valueFrom: null, valueTo: null },
    totalArea: { valueFrom: null, valueTo: null },
    livingArea: { valueFrom: null, valueTo: null },
    kitchenArea: { valueFrom: null, valueTo: null },
    bathroom: [],
    balcony: [],
    appliances: [],
    rentalPeriod: "",
    preferences: [],
    prepayment: [],
    furniture: false,
    withPhotos: false,
    showData: true,
  });

  const [withNavigate, setWithNavigate] = React.useState(false);

  const fetchAllData = async () => {
    const response = await fetch(`api/search/recent`);
    const data = await response.json();

    console.log("Данные с сервера: ", data);
    if (response.ok) {
      filters.showData ? setRentObjects(data) : setCount(data[0].count);
    } else {
      console.error("Ошибка при получении данных", data.message);
    }
  };

  const updateFiltersAndFetchData = async () => {
    //исправить мерцание
    try {
      const showData = filters.showData;
      showData && setLoading(true);
      const paramsArray = [];
      filters.rooms.length > 0 &&
        paramsArray.push(`numberOfRooms=${filters.rooms.join(",")}`);
      filters.locations.length > 0 &&
        paramsArray.push(`locations=${filters.locations.join(",")}`);
      filters.minPrice !== 0 &&
        paramsArray.push(`minPrice=${filters.minPrice}`);
      filters.maxPrice !== 0 &&
        paramsArray.push(`maxPrice=${filters.maxPrice}`);
      paramsArray.push(`currencyType=${filters.currentCurrency}`);
      filters.bathroom.length > 0 &&
        paramsArray.push(`bathroomType=${filters.bathroom.join(",")}`);
      filters.balcony.length > 0 &&
        paramsArray.push(`balconyType=${filters.balcony.join(",")}`);
      filters.appliances.length > 0 &&
        paramsArray.push(`appliances=${filters.appliances.join(",")}`);
      filters.preferences.length > 0 &&
        paramsArray.push(`preferences=${filters.preferences.join(",")}`);
      filters.prepayment.length > 0 &&
        paramsArray.push(`prepayment=${filters.prepayment.join(",")}`);

      !!filters.rentalPeriod &&
        paramsArray.push(`rentalPeriod=${filters.rentalPeriod}`);

      filters.floor.valueFrom &&
        paramsArray.push(`floorFrom=${filters.floor.valueFrom}`);
      filters.floor.valueTo &&
        paramsArray.push(`floorTo=${filters.floor.valueTo}`);

      filters.totalArea.valueFrom &&
        paramsArray.push(`totalAreaFrom=${filters.totalArea.valueFrom}`);
      filters.totalArea.valueTo &&
        paramsArray.push(`totalAreaTo=${filters.totalArea.valueTo}`);

      filters.livingArea.valueFrom &&
        paramsArray.push(`livingAreaFrom=${filters.livingArea.valueFrom}`);
      filters.livingArea.valueTo &&
        paramsArray.push(`livingAreaTo=${filters.livingArea.valueTo}`);

      filters.kitchenArea.valueFrom &&
        paramsArray.push(`kitchenAreaFrom=${filters.kitchenArea.valueFrom}`);
      filters.kitchenArea.valueTo &&
        paramsArray.push(`kitchenAreaTo=${filters.kitchenArea.valueTo}`);

      filters.furniture && paramsArray.push(`furniture=${filters.furniture}`);
      filters.withPhotos && paramsArray.push(`photos=${filters.withPhotos}`);

      const queryParams = paramsArray.join("&");
      // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      // delay(5000);
      withNavigate && navigate(`/rental-search/flats?${queryParams}`);
      const response = await fetch(
        `api/search/filter${queryParams ? "?" + queryParams : ""}${
          (queryParams ? "&" : "?") + `showData=${showData}`
        }`
      );
      const data = await response.json();

      if (response.ok) {
        console.log("Данные с сервера", data);
        showData ? setRentObjects(data) : setCount(data[0].count);
      } else {
        console.error("Ошибка при получении данных", data.message);
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    } finally {
      filters.showData && setLoading(false);
    }
  };

  useEffect(() => {
    updateFiltersAndFetchData();
  }, [filters, withNavigate]);

  const handleFiltersChange = (
    newFilters: Partial<FilterState>,
    navigate?: boolean
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setWithNavigate(navigate ?? true);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.toString() === "") {
      fetchAllData();
      return;
    }

    const roomsParam = queryParams.get("numberOfRooms");
    const locationsParam = queryParams.get("locations");
    const minPriceParam = queryParams.get("minPrice");
    const maxPriceParam = queryParams.get("maxPrice");
    const currencyParam = queryParams.get("currencyType");

    const newFilters: Partial<FilterState> = {};

    if (roomsParam) {
      newFilters.rooms = roomsParam.split(",");
    }
    if (locationsParam) {
      newFilters.locations = locationsParam.split(",");
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
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  const flatsCount = rentObjects.length;
  const ending =
    flatsCount === 1 ? "е" : flatsCount > 1 && flatsCount < 5 ? "я" : "й";

  return (
    <Stack
      flexDirection={"column"}
      overflow="auto"
      style={{ backgroundColor: "#f3f5f7" }}
    >
      <FilterOptions count={count} onFiltersChange={handleFiltersChange} />
      <Stack
        flexDirection={"column"}
        style={{ padding: "56px 56px 80px 56px" }}
      >
        <Stack flexDirection={"column"} spacing={2} marginBottom={3}>
          <Typography variant="h4">
            Аренда квартир на длительный срок в Беларуси
          </Typography>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Typography variant="body1">
              <b>{rentObjects.length}</b> объявлени{ending}
            </Typography>
            <div
              style={{
                height: "1.5rem",
                width: "1px",
                backgroundColor: "rgb(210 214 219)",
                margin: "0 16px",
              }}
            />
            <NavLink
              to={"/rental-search/map"}
              style={{ textDecoration: "none" }}
            >
              <Stack flexDirection={"row"} alignItems={"center"}>
                <MapIcon style={{ fontWeight: 100, marginRight: "8px" }} />
                <Typography fontSize={16} fontWeight={600}>
                  Посмотреть на карте
                </Typography>
              </Stack>
            </NavLink>
          </Stack>
        </Stack>
        {flatsCount === 0 && !loading && <NoFoundObject />}
        <FlatsList rentObjects={rentObjects} isLoading={loading} />
      </Stack>
    </Stack>
  );
};
