import React from "react";
import { Box, Stack } from "@mui/material";
import { ListingOverview } from "./ListingComponent/ListingOverview";
import { NavMenuImage } from "./NavMenuComponent/NavMenuImage";

interface IRentalObjectsGroupData {
  path: string;
  title: string;
  subTitle: string;
}

export const Home = () => {

  const rentalObjectsGroupData: IRentalObjectsGroupData[] = [
    { path: "api/home/recent", title: "Самые свежие обновления", subTitle: "Посмотрите самые актуальные объявления" },
    { path: `api/home/get-by-preferences?preferences=${encodeURIComponent("Можно с животными")}`, title: "Аренда с питомцами – это возможно! 🐕🏠", subTitle: "Загляните в самые свежие предложения по аренде с возможностью проживания с питомцами!" },
    { path: `api/home/get-by-total-area?filed=TotalArea&minArea=40&maxArea=70`, title: "Просторные жилые решения: Квартиры от 50м² и более!", subTitle: "Выбирайте простор и уют в каждом уголке! Покорите новые горизонты комфорта!" },
    { path: `api/home/get-by-preferences?preferences=${encodeURIComponent("Семье")}`, title: "Домашний уют для вас и вашей семьи: Лучшие предложения по аренде жилья!", subTitle: "Откройте дверь в идеальный дом: просторные арендные квартиры, созданные для семейного счастья." }
  ];

  return (
    <Box>
      <div>
        <NavMenuImage />
      </div>
      <Stack alignItems={'center'} >
        {rentalObjectsGroupData.map((rntObjGroup, index) => <ListingOverview key={index} requestPath={rntObjGroup.path} title={rntObjGroup.title} subTitle={rntObjGroup.subTitle} />)}
      </Stack>
    </Box >
  );
};
