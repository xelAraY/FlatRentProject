import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { Alert, AlertTitle, Grid, Stack, Typography } from "@mui/material";
import {
  DescriptionPaper,
  DetailsPaper,
  MainPaper,
  LocationPaper,
  ApplianciesPaper,
  ContactPaper,
} from "./components";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";

const FlatInfoPage: React.FC = () => {
  const { flatId } = useParams();
  const [flatInfo, setFlatInfo] = React.useState<RentObjectInformation>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteChanged, setFavouriteChanged] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

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
          const ownerResponse = await fetch(
            `api/flat/isUserListing?objectId=${flatInfo?.rentObject.rentObjId}&userName=${decodedToken.nickname}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!ownerResponse.ok) {
            throw new Error("Ошибка при выполнении запроса");
          }
          const isOwner = await ownerResponse.json();
          setIsOwner(isOwner);
          if (!isOwner) {
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
        }
      } else {
        navigate("/sign-in");
      }
      setFavouriteChanged(false);
    }
  };

  useEffect(() => {
    if (flatInfo && !isOwner) {
      checkFavourite();
    }
  }, [favouriteChanged]);

  useEffect(() => {
    if (flatInfo && !isOwner && isLoggedIn()) {
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
      <Grid container spacing="2rem">
        <Grid item xs={8}>
          <Stack gap="1rem">
            {isOwner && (
              <>
                {flatInfo.rentObject.hidden ? (
                  <Alert
                    severity="info"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  >
                    <AlertTitle sx={{ color: "#1976d2" }}>
                      <b>Не опубликовано</b>
                    </AlertTitle>
                    <Typography fontSize={16}>
                      Объявление сохранено, но не доступно в поиске.
                    </Typography>
                  </Alert>
                ) : (
                  <Alert
                    severity="success"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  >
                    <AlertTitle sx={{ color: "#438b47" }}>
                      <b>Опубликовано</b>
                    </AlertTitle>
                    <Typography fontSize={16}>
                      Объявление сохранено и доступно в поиске.
                    </Typography>
                  </Alert>
                )}
              </>
            )}

            <MainPaper
              flatInfo={flatInfo}
              onScrollToMap={scrollToMap}
              onFavouriteChange={handleFavouriteChange}
              isFavourite={isFavourite}
              isOwner={isOwner}
            />
            {flatInfo.rentObject.description &&
              flatInfo.rentObject.description.length > 0 && (
                <DescriptionPaper flatInfo={flatInfo?.rentObject} />
              )}

            <DetailsPaper
              flatInfo={flatInfo?.rentObject}
              preferences={flatInfo?.preferences}
              addInf={flatInfo?.additionalInformations}
            />
            {flatInfo.appliances && flatInfo.appliances.length > 0 && (
              <ApplianciesPaper
                appliancies={flatInfo.appliances}
                title="Удобства"
              />
            )}
            <LocationPaper
              locationInfo={flatInfo.address}
              mapRef={mapRef}
              metroStations={flatInfo.metroStations}
            />
          </Stack>
        </Grid>
        <Grid
          item
          xs
          sx={{
            "&.MuiGrid-root": {
              flexGrow: 1,
            },
          }}
        >
          <ContactPaper flatInfo={flatInfo} />
        </Grid>
      </Grid>
    </Stack>
  ) : (
    <></>
  );
};

export default FlatInfoPage;
