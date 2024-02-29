import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FlatPreviewCard } from "src/components/FlatPreviewCard";
import { RentObjectInformation } from "src/interfaces/RentObj";

interface ListingOverviewProps {
  requestPath: string;
  title: string;
  subTitle: string;
}

export const ListingOverview = (props: ListingOverviewProps) => {
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>();

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const responce = await fetch(props.requestPath);
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
    <Stack flexDirection="column" alignItems="flex-start" justifyContent="flex-start" marginTop={3}>
      <Stack flexDirection="column" alignItems="flex-start" justifyContent="flex-start" marginBottom={2}>
        <Typography variant="h5" fontWeight={700}>{props.title}</Typography>
        <Typography fontWeight={400} fontSize={16} paddingTop={0.5}>{props.subTitle}</Typography>
      </Stack>

      {/* <Stack flexDirection="row" justifyContent="space-between" padding="8px 0 8px 0"> */}
      <div>
        <Grid container spacing={2.5}>
          {rentObjects?.map((rentObject, index) => (
            <Grid item md={4} lg={3} xl={3} flexGrow={1}>
              <FlatPreviewCard
                key={index}
                rentInformation={rentObject}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      {/* </Stack> */}
    </Stack>);
}