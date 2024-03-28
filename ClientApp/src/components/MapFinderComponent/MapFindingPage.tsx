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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "src/shared";
import { FilterOptions } from "../RentFinderComponent/FilterOptions";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [placemarks, setPlacemarks] = useState<PlacemarkInfo[]>([]);
  const [map, setMap] = React.useState<ymaps.Map>();
  const [showCost, setShowCost] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [mapBounds, setMapBounds] = useState<MapBounds>();
  const location = useLocation();

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

  // const fetchAllData = async () => {
  //   console.log(location.search.toString());

  //   const response = await fetch(
  //     `api/search/filter${
  //       location.search.toString() === ""
  //         ? "?"
  //         : location.search.toString() + "&"
  //     }showData=${filters.showData}`
  //   );
  //   const data = await response.json();

  //   console.log("Данные с сервера: ", data);
  //   if (response.ok) {
  //     setRentObjects(data);
  //   } else {
  //     console.error("Ошибка при получении данных", data.message);
  //   }
  // };

  // const fetchMapData = async () => {
  //   try {
  //     const showData = filters.showData;
  //     showData && setLoading(true);
  //     const paramsArray = [];
  //     filters.rooms.length > 0 &&
  //       paramsArray.push(`numberOfRooms=${filters.rooms.join(",")}`);
  //     filters.locations.length > 0 &&
  //       paramsArray.push(`locations=${filters.locations.join(",")}`);
  //     filters.minPrice !== 0 &&
  //       paramsArray.push(`minPrice=${filters.minPrice}`);
  //     filters.maxPrice !== 0 &&
  //       paramsArray.push(`maxPrice=${filters.maxPrice}`);
  //     paramsArray.push(`currencyType=${filters.currentCurrency}`);
  //     filters.bathroom.length > 0 &&
  //       paramsArray.push(`bathroomType=${filters.bathroom.join(",")}`);
  //     filters.balcony.length > 0 &&
  //       paramsArray.push(`balconyType=${filters.balcony.join(",")}`);
  //     filters.appliances.length > 0 &&
  //       paramsArray.push(`appliances=${filters.appliances.join(",")}`);
  //     filters.preferences.length > 0 &&
  //       paramsArray.push(`preferences=${filters.preferences.join(",")}`);
  //     filters.prepayment.length > 0 &&
  //       paramsArray.push(`prepayment=${filters.prepayment.join(",")}`);

  //     !!filters.rentalPeriod &&
  //       paramsArray.push(`rentalPeriod=${filters.rentalPeriod}`);

  //     filters.floor.valueFrom &&
  //       paramsArray.push(`floorFrom=${filters.floor.valueFrom}`);
  //     filters.floor.valueTo &&
  //       paramsArray.push(`floorTo=${filters.floor.valueTo}`);

  //     filters.totalArea.valueFrom &&
  //       paramsArray.push(`totalAreaFrom=${filters.totalArea.valueFrom}`);
  //     filters.totalArea.valueTo &&
  //       paramsArray.push(`totalAreaTo=${filters.totalArea.valueTo}`);

  //     filters.livingArea.valueFrom &&
  //       paramsArray.push(`livingAreaFrom=${filters.livingArea.valueFrom}`);
  //     filters.livingArea.valueTo &&
  //       paramsArray.push(`livingAreaTo=${filters.livingArea.valueTo}`);

  //     filters.kitchenArea.valueFrom &&
  //       paramsArray.push(`kitchenAreaFrom=${filters.kitchenArea.valueFrom}`);
  //     filters.kitchenArea.valueTo &&
  //       paramsArray.push(`kitchenAreaTo=${filters.kitchenArea.valueTo}`);

  //     filters.furniture && paramsArray.push(`furniture=${filters.furniture}`);
  //     filters.withPhotos && paramsArray.push(`photos=${filters.withPhotos}`);

  //     const queryParams = paramsArray.join("&");
  //     // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  //     // delay(5000);
  //     withNavigate &&
  //       navigate(
  //         `/rental-search/map??leftX=${mapBounds?.leftX}&rightX=${
  //           mapBounds?.rightX
  //         }&bottomY=${mapBounds?.bottomY}&topY=${mapBounds?.topY}&showData=${
  //           filters.showData
  //         }${queryParams ? "&" + queryParams : ""}`
  //       );
  //     const response = await fetch(
  //       `api/search/filter?leftX=${mapBounds?.leftX}&rightX=${
  //         mapBounds?.rightX
  //       }&bottomY=${mapBounds?.bottomY}&topY=${mapBounds?.topY}&showData=${
  //         filters.showData
  //       }${queryParams ? "&" + queryParams : ""}`
  //     );
  //     // const response = await fetch(
  //     //   `api/search/map?leftX=${mapBounds?.leftX}&rightX=${mapBounds?.rightX}&bottomY=${mapBounds?.bottomY}&topY=${mapBounds?.topY}`
  //     // );
  //     const data = await response.json();

  //     console.log("Данные для карты: ", data);
  //     if (response.ok) {
  //       setRentObjects(data);
  //     } else {
  //       console.error("Ошибка при получении данных", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Произошла ошибка:", error);
  //   } finally {
  //     filters.showData && setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (mapBounds !== undefined) {
      console.log("Координаты карты: ", mapBounds);
      setSearchParams(
        (urlParams) => {
          urlParams.set("leftX", mapBounds.leftX.toString());
          urlParams.set("rightX", mapBounds.rightX.toString());
          urlParams.set("bottomY", mapBounds.bottomY.toString());
          urlParams.set("topY", mapBounds.topY.toString());
          return urlParams;
        },
        { replace: true }
      );
      //fetchMapData();
    }
  }, [mapBounds]);

  // useEffect(() => {
  //   fetchAllData();
  // }, []);

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

  // const handleFiltersChange = (
  //   newFilters: Partial<FilterState>,
  //   navigate?: boolean
  // ) => {
  //   setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  //   setWithNavigate(navigate ?? true);
  // };

  return (
    <Stack flexDirection={"column"}>
      <FilterOptions count={flatsCount} path="/rental-search/map?" />
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
