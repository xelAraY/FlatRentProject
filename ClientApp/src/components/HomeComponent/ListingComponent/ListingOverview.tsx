import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FlatPreviewCard } from "src/components/HomeComponent/ListingComponent/FlatPreviewCard";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { SkeletonPreview } from "./SkeletonPreview";

interface ListingOverviewProps {
  requestPath: string;
  title: string;
  subTitle: string;
}

export const ListingOverview = (props: ListingOverviewProps) => {
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        setLoading(true);

        //await new Promise(resolve => setTimeout(resolve, 10000));

        const response = await fetch(props.requestPath);
        const data = await response.json();

        if (response.ok) {
          console.log('Данные с сервера', data);
          setRentObjects(data);
        } else {
          console.error('Ошибка при получении данных', data.message);
        }
      } catch (error) {
        console.error('Произошла ошибка:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();
  }, []);

  const numberOfRentObjects = 4;

  return (
    <Stack flexDirection="column" alignItems="flex-start" justifyContent="flex-start" marginTop={3}>
      <Stack flexDirection="column" alignItems="flex-start" justifyContent="flex-start" marginBottom={2}>
        <Typography variant="h5" fontWeight={700}>{props.title}</Typography>
        <Typography fontWeight={400} fontSize={16} paddingTop={0.5}>{props.subTitle}</Typography>
      </Stack>

      {/* <Stack flexDirection="row" justifyContent="space-between" padding="8px 0 8px 0"> */}
      <div><Grid container spacing={2.5}>
        {loading ? (
          <>
            {Array.from({ length: numberOfRentObjects }).map((_, index) => (
              <Grid item md={4} lg={3} xl={3} flexGrow={1}>
                <SkeletonPreview key={index} />
              </Grid>))}
          </>) : (
          <>
            {rentObjects?.map((rentObject, index) => (
              <Grid item md={4} lg={3} xl={3} flexGrow={1}>
                <FlatPreviewCard
                  num={index}
                  rentInformation={rentObject}
                />

              </Grid>
            ))}
          </>
        )}

      </Grid>

      </div>
      {/* </Stack> */}
    </Stack>);
}