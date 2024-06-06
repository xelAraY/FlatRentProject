import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FlatPreviewCard } from "./FlatPreviewCard";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { SkeletonPreview } from "./SkeletonPreview";
import { useNavigate } from "react-router-dom";

interface ListingOverviewProps {
  requestPath: string;
  title: string;
  subTitle: string;
  favourites: number[];
  onFavouriteChange: (isChanged: boolean) => void;
}

export const ListingOverview = (props: ListingOverviewProps) => {
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        setLoading(true);
        //await new Promise(resolve => setTimeout(resolve, 10000));
        const response = await fetch(props.requestPath);
        const data = await response.json();

        if (response.ok) {
          setRentObjects(data);
        } else {
          console.error("Ошибка при получении данных", data.message);
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();
  }, [props.requestPath]);

  const numberOfRentObjects = 4;

  return (
    <Stack
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      style={{ padding: "24px 120px 60px 120px" }}
      width="100%"
    >
      <Stack
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        marginBottom={2}
      >
        <Typography variant="h5" fontWeight={700}>
          {props.title}
        </Typography>
        <Typography fontWeight={400} fontSize={16} paddingTop={0.5}>
          {props.subTitle}
        </Typography>
      </Stack>
      <Stack gap="1rem" width="100%" alignItems="center">
        <Grid
          container
          gap="1rem"
          flexWrap="nowrap"
          overflow="auto"
          pb="0.5rem"
          // <Grid container overflow='auto' spacing={1} pb='0.5rem'
          sx={{
            ".MuiGrid-item": {
              width: "100%",
            },
          }}
        >
          {loading ? (
            <>
              {Array.from({ length: numberOfRentObjects }).map((_, index) => (
                <Grid item md={4} lg={3} xl={3} flexGrow={1}>
                  <SkeletonPreview key={index} />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {rentObjects?.map((rentObject, index) => (
                <Grid item key={index}>
                  {/* <Grid item xs={6} md={4} xl={3}> */}
                  <FlatPreviewCard
                    rentInformation={rentObject}
                    keyNumber={index}
                    onCardClick={(flatId: number) =>
                      navigate(`/flats/${flatId}`)
                    }
                    isFavourite={props.favourites.includes(
                      rentObject.rentObject.rentObjId
                    )}
                    onFavouriteChange={props.onFavouriteChange}
                    customWidth="346px"
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};
