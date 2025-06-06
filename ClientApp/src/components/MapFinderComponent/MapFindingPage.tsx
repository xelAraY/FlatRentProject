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
import FlatsList from "./FlatsList";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";

interface PlacemarkInfo {
  coordinates: [number, number];
  cost: string;
  id: number;
}

interface MapBounds {
  leftX: number;
  rightX: number;
  bottomY: number;
  topY: number;
}

export const MapFindingPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // const initialZoom = parseInt(searchParams.get("zoom") || "12", 10);
  // const centerX =
  //   (Number(searchParams.get("rightX")) - Number(searchParams.get("leftX"))) /
  //     2 +
  //   Number(searchParams.get("leftX"));

  // const centerY =
  //   (Number(searchParams.get("topY")) - Number(searchParams.get("bottomY"))) /
  //     2 +
  //   Number(searchParams.get("bottomY"));

  // const initialCenter =
  //   searchParams.get("rightX") &&
  //   searchParams.get("leftX") &&
  //   searchParams.get("topY") &&
  //   searchParams.get("bottomY")
  //     ? [centerY, centerX]
  //     : [53.900487, 27.555324];
  const [mapData, _setMapData] = useState({
    center: [53.900487, 27.555324],
    zoom: 12,
  });

  const [placemarks, setPlacemarks] = useState<PlacemarkInfo[]>([]);
  const [map, setMap] = React.useState<ymaps.Map>();
  const [clusterer, setClusterer] = React.useState<ymaps.Clusterer>();
  const [favouriteChanged, setFavouriteChanged] = useState(true);
  const [favListings, setFavListings] = useState<number[]>([]);
  const LISTINGS_PER_PAGE = 20;

  const [showCost, setShowCost] = React.useState(false);
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [selectedObject, setSelectedObject] =
    useState<RentObjectInformation | null>(null);
  const [mapBounds, setMapBounds] = useState<MapBounds>();

  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pages, setPages] = React.useState<number>(-1);

  const navigate = useNavigate();

  const handleFavouriteChange = (isChanged: boolean) => {
    setFavouriteChanged(isChanged);
  };

  const getFavouritesListings = async () => {
    if (favouriteChanged) {
      if (isLoggedIn()) {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const favouritesResponce = await fetch(
            `api/account/favourites/${decodedToken.nickname}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await favouritesResponce.json();

          if (favouritesResponce.ok) {
            setFavListings([...data]);
          } else {
            console.error("Ошибка при получении данных", data);
          }
        }
      }
      setFavouriteChanged(false);
    }
  };

  useEffect(() => {
    getFavouritesListings();
  }, [favouriteChanged]);

  const handleFlatsListOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedObject(null);
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    console.log("Открытие при нажатии");
    if (selectedObject) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedObject]);

  const handlePlacemarkClick = (id: number) => {
    const selectedObject = rentObjects.find(
      (rentObj) => rentObj.rentObject.rentObjId === id
    );

    setSelectedObject((prevSelectedObject) => {
      if (selectedObject !== undefined) {
        if (
          prevSelectedObject?.rentObject.rentObjId ===
          selectedObject.rentObject.rentObjId
        ) {
          return null;
        }
        return selectedObject;
      }
      return null;
    });
  };

  // clusterer?.events.add("click", function (e) {
  //   console.log("Кластер");
  //   setOpen(!open);
  // });

  map?.events.add("boundschange", function (e) {
    if (e.get("newBounds") !== e.get("oldBounds")) {
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
    // const zoom = e.get("newZoom")?.toString() || "12";
    // setSearchParams(
    //   (urlParams) => {
    //     urlParams.set("zoom", zoom);
    //     return urlParams;
    //   },
    //   { replace: true }
    // );
  });

  const fetchData = async () => {
    const queryParams = new URLSearchParams(location.search);
    const realQueryParams = queryParams;
    realQueryParams.delete("page");

    const response = await fetch(
      `api/search/filter?${
        realQueryParams ? realQueryParams.toString() + "&" : ""
      }showData=true&page=-1`
    );
    const data = await response.json();

    if (response.ok) {
      setRentObjects(data);
    } else {
      console.error("Ошибка при получении данных", data.message);
    }

    const pagesCount = Math.ceil(data.length / LISTINGS_PER_PAGE);
    setPages(pagesCount);
  };

  const [lastPage, setLastPage] = useState<number>(-1);

  useEffect(() => {
    const currPage = Number(searchParams.get("page"));
    fetchData();
    setCurrentPage(currPage ? currPage : 1);
    // console.log(lastPage, currPage);
    if (lastPage !== currPage) {
      setSearchParams(
        (urlParams) => {
          urlParams.set("page", currPage.toString());
          return urlParams;
        },
        { replace: true }
      );
      setLastPage(currPage);
    }
  }, [location.search]);

  useEffect(() => {
    const currPage = Number(searchParams.get("page"));
    if (pages >= 0 && currPage > pages) {
      setSearchParams(
        (urlParams) => {
          urlParams.set("page", "1");
          return urlParams;
        },
        { replace: true }
      );
      setCurrentPage(1);
    }
  }, [pages]);

  useEffect(() => {
    if (mapBounds !== undefined) {
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
    }
  }, [mapBounds]);

  useEffect(() => {
    const placemarksArray: PlacemarkInfo[] = rentObjects.map((rentInf) => {
      return {
        coordinates: [rentInf.address.latitude, rentInf.address.longitude],
        cost: Math.round(
          rentInf.rentObject.rentPrice * rentInf.currency.officialRate
        ).toString(),
        id: rentInf.rentObject.rentObjId,
      };
    });
    setPlacemarks(placemarksArray);
  }, [rentObjects]);

  const flatsCount = rentObjects.length;
  const lastDigit = flatsCount % 10;
  const lastTwoDigits = flatsCount % 100;
  const listingsText =
    lastTwoDigits >= 11 && lastTwoDigits <= 14
      ? "объявлений"
      : lastDigit === 1
      ? "объявление"
      : lastDigit >= 2 && lastDigit <= 4
      ? "объявления"
      : "объявлений";

  // map?.controls.add("smallMapDefaultSet");

  return (
    <Stack
      flexDirection={"column"}
      height={"100%"}
      sx={{
        ".ymaps-2-1-79-zoom": {
          display: "none",
        },
        ".ymaps-2-1-79-search": {
          display: "none",
        },
      }}
    >
      <FilterOptions count={flatsCount} path="/flats/map" />
      <Stack
        style={{
          height: "100%",
          width: "100%",
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
            instanceRef={(ref: React.SetStateAction<ymaps.Map | undefined>) =>
              setMap(ref)
            }
          >
            <FlatsList
              onListSwitch={handleFlatsListOpen}
              flatsCount={selectedObject ? 1 : flatsCount}
              isOpen={open}
              rentObjects={selectedObject ? [selectedObject] : rentObjects}
              onFavouriteChange={handleFavouriteChange}
              favourites={favListings}
              pages={pages}
              currentPage={currentPage}
              updateCurrentPage={(page: number) => setCurrentPage(page)}
            />
            <div
              style={{
                position: "absolute",
                backgroundColor: "#1d2126b3",
                zIndex: 900,
                left: open ? "67%" : "45%",
                top: "30%",
                padding: "8px 16px",
                color: "white",
                borderRadius: "5px",
              }}
            >
              <Typography fontSize={14}>
                Найдено {flatsCount} {listingsText}
              </Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<FormatListBulletedIcon />}
              onClick={() => navigate("/flats?page=1")}
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                position: "absolute",
                bottom: "5%",
                left: open ? "69.5%" : "47.5%",
                zIndex: 9999,
              }}
              color="primary"
            >
              Список
            </Button>
            <Clusterer
              options={{
                preset: "islands#blackIcon",
                hasBalloon: false,
              }}
              instanceRef={(ref: ymaps.Clusterer) => setClusterer(ref)}
            >
              {placemarks.map((placemark, index) => (
                <Placemark
                  key={`${index}-${placemark.coordinates}`}
                  geometry={placemark.coordinates}
                  properties={{
                    iconContent: showCost ? `${placemark.cost}р` : "",
                  }}
                  options={{
                    preset:
                      showCost &&
                      selectedObject?.rentObject.rentObjId === placemark.id
                        ? "islands#yellowStretchyIcon"
                        : showCost
                        ? "islands#blueStretchyIcon"
                        : selectedObject?.rentObject.rentObjId === placemark.id
                        ? "islands#yellowCircleDotIcon"
                        : "islands#blueCircleDotIcon",
                  }}
                  onClick={() => handlePlacemarkClick(placemark.id)}
                />
              ))}
            </Clusterer>
            <ZoomControl />
          </Map>
        </YMaps>
      </Stack>
    </Stack>
  );
};
