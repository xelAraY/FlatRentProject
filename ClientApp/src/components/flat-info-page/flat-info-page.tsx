import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { Grid, Stack } from "@mui/material";
import {
  DescriptionPaper,
  DetailsPaper,
  MainPaper,
  LocationPaper,
  ApplianciesPaper,
  OwnerPaper,
} from "./components";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";

const FlatInfoPage: React.FC = () => {
  const { flatId } = useParams();
  const [flatInfo, setFlatInfo] = React.useState<RentObjectInformation>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteChanged, setFavouriteChanged] = useState(true);
  const navigate = useNavigate();

  const handleFavouriteChange = (isChanged: boolean) => {
    setFavouriteChanged(isChanged);
  };

  const checkFavourite = async () => {
    if (favouriteChanged) {
      if (isLoggedIn()) {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const response = await fetch(
            `api/flat/isFavourite?objectId=${flatInfo?.rentObject.rentObjId}&userName=${decodedToken.nickname}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Ошибка при выполнении запроса");
          }
          const data = await response.json();
          console.log(data);
          setIsFavourite(data);
        }
      } else {
        navigate("/sign-in");
      }
      setFavouriteChanged(false);
    }
  };

  useEffect(() => {
    if (flatInfo) {
      checkFavourite();
    }
  }, [favouriteChanged]);

  useEffect(() => {
    if (flatInfo && isLoggedIn()) {
      checkFavourite();
    }
  }, [flatInfo]);

  React.useEffect(() => {
    const fetchData = async () => {
      return await fetch(`api/flat/${flatId}`).then((data) => data.json());
    };
    fetchData().then((data) => {
      setFlatInfo(data[0]);
    });
  }, [flatId]);

  const mapRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToMap = () => mapRef?.current?.scrollIntoView();

  return flatInfo ? (
    <Stack p="3rem 5rem" height="100%" width="100%">
      <Grid container columnGap="2rem">
        <Grid item xs={8}>
          <Stack gap="1rem">
            <MainPaper
              flatInfo={flatInfo}
              onScrollToMap={scrollToMap}
              onFavouriteChange={handleFavouriteChange}
              isFavourite={isFavourite}
            />
            <DescriptionPaper flatInfo={flatInfo?.rentObject} />
            <DetailsPaper
              flatInfo={flatInfo?.rentObject}
              preferences={flatInfo?.preferences}
            />
            <ApplianciesPaper appliancies={flatInfo.appliances} />
            <LocationPaper locationInfo={flatInfo.address} mapRef={mapRef} />
          </Stack>
        </Grid>
        <Grid
          item
          xs="auto"
          sx={{
            "&.MuiGrid-root": {
              flexGrow: 1,
            },
          }}
        >
          <OwnerPaper flatInfo={flatInfo} />
        </Grid>
      </Grid>
    </Stack>
  ) : (
    <></>
  );
};

export default FlatInfoPage;
