import { useEffect, useState } from "react";
import {
  Clusterer,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import ymaps from "yandex-maps";
import React from "react";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { Stack, Typography } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import { Button } from "src/shared";
import { FilterOptions } from "../RentFinderComponent/FilterOptions";
import { FilterState } from "src/interfaces/SearchInterfaces";

interface PlacemarkInfo {
  coordinates: [number, number];
  cost: string;
}

interface MapBounds {
  leftX: number;
  rightX: number;
  bottomY: number;
  topY: number;
}

export const MapFindingPage = () => {
  const [mapData, _setMapData] = useState({
    center: [53.900487, 27.555324],
    zoom: 12,
  });
  const [placemarks, setPlacemarks] = useState<PlacemarkInfo[]>([]);
  const [map, setMap] = React.useState<ymaps.Map>();
  const [showCost, setShowCost] = React.useState(false);
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [mapBounds, setMapBounds] = useState<MapBounds>();

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

  const navigate = useNavigate();

  map?.events.add("boundschange", function (e) {
    if (e.get("newBounds") !== e.get("oldBounds")) {
      console.log("Bounds ", e.get("newBounds"));
      const bottomLeftCorner = e.get("newBounds")[0];
      const topRightCorner = e.get("newBounds")[1];
      const bounds: MapBounds = {
        leftX: bottomLeftCorner[1],
        rightX: topRightCorner[1],
        bottomY: bottomLeftCorner[0],
        topY: topRightCorner[0],
      };
      setMapBounds(bounds);
    }
    if (e.get("newZoom") && Number(e.get("newZoom")) >= 15) {
      setShowCost(true);
    } else {
      setShowCost(false);
    }
  });

  const fetchAllData = async () => {
    const response = await fetch(`api/search/recent`);
    const data = await response.json();

    console.log("Данные с сервера: ", data);
    if (response.ok) {
      setRentObjects(data);
    } else {
      console.error("Ошибка при получении данных", data.message);
    }
  };

  const fetchMapData = async () => {
    const response = await fetch(
      `api/search/map?leftX=${mapBounds?.leftX}&rightX=${mapBounds?.rightX}&bottomY=${mapBounds?.bottomY}&topY=${mapBounds?.topY}`
    );
    const data = await response.json();

    console.log("Данные для карты: ", data);
    if (response.ok) {
      setRentObjects(data);
    } else {
      console.error("Ошибка при получении данных", data.message);
    }
  };

  useEffect(() => {
    if (mapBounds !== undefined) {
      console.log("Координаты карты: ", mapBounds);
      fetchMapData();
    }
  }, [mapBounds]);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    console.log("Установка coordinates");
    const placemarksArray: PlacemarkInfo[] = rentObjects.map((rentInf) => {
      const currency = rentInf.currency;
      const price = rentInf.rentObject.rentPrice;
      const bynPrice =
        currency === "USD"
          ? Math.round(price * 3.2063)
          : currency === "EUR"
          ? Math.round(price * 3.5045)
          : price;
      return {
        coordinates: [rentInf.address.latitude, rentInf.address.longitude],
        cost: bynPrice.toString(),
      };
    });
    setPlacemarks(placemarksArray);
  }, [rentObjects]);

  const flatsCount = rentObjects.length;
  const ending =
    flatsCount === 1 ? "е" : flatsCount > 1 && flatsCount < 5 ? "я" : "й";

  const handleFiltersChange = (
    newFilters: Partial<FilterState>,
    navigate?: boolean
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setWithNavigate(navigate ?? true);
  };

  return (
    <Stack flexDirection={"column"}>
      <FilterOptions count={flatsCount} onFiltersChange={handleFiltersChange} />
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <YMaps
          query={{
            load: "package.full",
            apikey: "9b519c88-ed0c-45e5-934a-7132b8bc1451",
          }}
        >
          <Map
            width={"100%"}
            height={"100%"}
            defaultState={mapData}
            options={{ minZoom: 5 }}
            instanceRef={(ref) => setMap(ref)}
          >
            <div
              style={{
                position: "absolute",
                backgroundColor: "#1d2126b3",
                zIndex: 9999,
                left: "45%",
                top: "30%",
                padding: "8px 16px",
                color: "white",
                borderRadius: "5px",
              }}
            >
              <Typography fontSize={14}>
                Найдено {flatsCount} объявлени{ending}
              </Typography>
            </div>

            <Button
              variant="contained"
              startIcon={<FormatListBulletedIcon />}
              onClick={() => navigate("/rental-search/flats")}
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                position: "absolute",
                bottom: "5%",
                left: "47%",
                zIndex: 9999,
              }}
              color="primary"
            >
              Список
            </Button>
            <Clusterer
              options={{
                preset: "islands#blackIcon",
                groupByCoordinates: false,
              }}
            >
              {placemarks.map((placemark, index) => (
                <Placemark
                  key={`${index}-${placemark.coordinates}`}
                  geometry={placemark.coordinates}
                  properties={{
                    iconContent: showCost ? `${placemark.cost}р` : "",
                  }}
                  options={{
                    preset: showCost
                      ? "islands#violetStretchyIcon"
                      : "islands#violetCircleDotIcon",
                  }}
                  onClick={(e: any) => console.log(placemark.coordinates)}
                />
              ))}
            </Clusterer>
            <ZoomControl />
          </Map>
        </YMaps>
      </div>
    </Stack>
  );
};
