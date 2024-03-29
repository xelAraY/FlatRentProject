import React, { useEffect, useState } from "react";
import { FilterOptions } from "./FilterOptions";
import { Stack, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { FlatsList } from "./FlatsList";
import { NoFoundObject } from "./NoFoundObject";
import MapIcon from "@mui/icons-material/Map";

export const RentFindingPage = () => {
  const location = useLocation();
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const queryParams = new URLSearchParams(location.search);

    console.log("Все данные");

    const response = await fetch(
      `api/search/filter?${
        queryParams ? queryParams.toString() + "&" : ""
      }showData=true`
    );
    const data = await response.json();

    if (response.ok) {
      console.log("Новые Данные с сервера", data);
      setRentObjects(data);
    } else {
      console.error("Ошибка при получении данных", data.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [location.search]);

  const flatsCount = rentObjects.length;
  const ending =
    flatsCount === 1 ? "е" : flatsCount > 1 && flatsCount < 5 ? "я" : "й";

  return (
    <Stack
      flexDirection={"column"}
      overflow="auto"
      style={{ backgroundColor: "#f3f5f7" }}
    >
      <FilterOptions count={flatsCount} path="/flats?" />
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
              to={`/flats/map${location.search}`}
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
