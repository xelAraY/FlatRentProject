import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { NavMenu } from "./NavMenuComponent/NavMenu";
import { FlatPreviewCard } from "../FlatPreviewCard";
import { RentObjectInformation } from "src/interfaces/RentObj";

export const Home = () => {
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>();

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const responce = await fetch('api/home/recent');
        const data = await responce.json();

        if (responce.ok) {
          console.log('Данные с сервера', data);
          setRentObjects(data);
        } else {
          console.error('Ошибка при получении данных', data.message);
        }
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    };

    fetchRecentListings();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            <NavMenu />
          </div>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Stack flexDirection="column" alignItems="flex-start" justifyContent="flex-start" width={"1300px"}>
            <Stack flexDirection="column" alignItems="flex-start" justifyContent="flex-start" marginBottom={2}>
              <Typography variant="h5" fontWeight={700}>Самые свежие обновления</Typography>
              <Typography fontWeight={400} fontSize={16} paddingTop={0.5}>Посмотрите самые актуальные объявления</Typography>
            </Stack>

            <Stack flexDirection="row" justifyContent="space-between" width="100%" padding="8px 0 8px 0">
              {rentObjects?.map((rentObject, index) => (
                <FlatPreviewCard
                  key={index}
                  rentInformation={rentObject}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <div style={{ border: "2px solid black" }}>
            <h2>Footer</h2>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
