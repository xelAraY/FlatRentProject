import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { ListingOverview } from "./ListingComponent/ListingOverview";
import { NavMenuImage } from "./NavMenuComponent/NavMenuImage";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";

interface IRentalObjectsGroupData {
  path: string;
  title: string;
  subTitle: string;
}

export const Home = () => {
  const [favListings, setFavListings] = useState<number[]>([]);
  const [favouriteChanged, setFavouriteChanged] = useState(true);

  const handleFavouriteChange = (isChanged: boolean) => {
    setFavouriteChanged(isChanged);
  };

  const rentalObjectsGroupData: IRentalObjectsGroupData[] = [
    {
      path: "api/home/recent",
      title: "Самые свежие обновления",
      subTitle: "Посмотрите самые актуальные объявления",
    },
    {
      path: `api/home/get-by-preferences?preferences=${encodeURIComponent(
        "Можно с животными"
      )}`,
      title: "Аренда с питомцами – это возможно! 🐕🏠",
      subTitle:
        "Загляните в самые свежие предложения по аренде с возможностью проживания с питомцами!",
    },
    {
      path: `api/home/get-by-total-area?field=TotalArea&minArea=40&maxArea=70`,
      title: "Просторные жилые решения: Квартиры от 50м² и более!",
      subTitle:
        "Выбирайте простор и уют в каждом уголке! Покорите новые горизонты комфорта!",
    },
    {
      path: `api/home/get-by-preferences?preferences=${encodeURIComponent(
        "Семье"
      )}`,
      title:
        "Домашний уют для вас и вашей семьи: Лучшие предложения по аренде жилья!",
      subTitle:
        "Откройте дверь в идеальный дом: просторные арендные квартиры, созданные для семейного счастья.",
    },
  ];

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

  return (
    <Box>
      <div>
        <NavMenuImage />
      </div>
      <Stack alignItems={"center"} marginBottom={3}>
        {rentalObjectsGroupData.map((rntObjGroup, index) => (
          <ListingOverview
            key={index}
            requestPath={rntObjGroup.path}
            title={rntObjGroup.title}
            subTitle={rntObjGroup.subTitle}
            favourites={favListings}
            onFavouriteChange={handleFavouriteChange}
          />
        ))}
      </Stack>
    </Box>
  );
};
