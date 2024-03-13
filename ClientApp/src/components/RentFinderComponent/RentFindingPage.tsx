import React, { useEffect, useState } from "react";
import { FilterOptions } from "./FilterOptions";
import { Grid, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { SkeletonPreview } from "../HomeComponent/ListingComponent/SkeletonPreview";
import { FlatPreviewCard } from "../HomeComponent/ListingComponent/FlatPreviewCard";

export const RentFindingPage = () => {
  const [rentObjects, setRentObjects] = useState<RentObjectInformation[]>([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasParams = !!queryParams;

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`api/search/filter${hasParams ? '?' + queryParams.toString() : ''}`);
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
    <Stack flexDirection={"column"} overflow='auto'>
      <FilterOptions />
      <Stack gap='1rem' width='100%' alignItems='center'>
        <Grid container gap='1rem' flexWrap='nowrap' overflow='auto' pb='0.5rem'
          // <Grid container overflow='auto' spacing={1} pb='0.5rem'
          sx={{
            '.MuiGrid-item': {
              width: '100%',
            }
          }}
        >
          {loading ? (
            <>
              {Array.from({ length: numberOfRentObjects }).map((_, index) => (
                <Grid item md={4} lg={3} xl={3} flexGrow={1}>
                  <SkeletonPreview key={index} />
                </Grid>))}
            </>) : (
            <>
              {rentObjects?.map((rentObject, index) => (
                <Grid item>
                  {/* <Grid item xs={6} md={4} xl={3}> */}
                  <FlatPreviewCard
                    rentInformation={rentObject}
                    keyNumber={index} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
}
