import { Grid, Stack } from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { SkeletonPreview } from "../HomeComponent/ListingComponent/SkeletonPreview";
import { FlatPreviewCard } from "../HomeComponent/ListingComponent/FlatPreviewCard";

interface FlatsListProps {
  rentObjects: RentObjectInformation[];
  isLoading: boolean;
}

export const FlatsList = ({ rentObjects, isLoading }: FlatsListProps) => {
  const numberOfRentObjects = 4;

  return (
    <Stack gap='1rem' width='100%' alignItems='center'>
      <Grid container overflow='auto' spacing={1} pb='0.5rem'
        sx={{
          '.MuiGrid-item': {
            width: '100%',
          }
        }}
      >
        {isLoading ? (
          <>
            {Array.from({ length: numberOfRentObjects }).map((_, index) => (
              <Grid item md={4} lg={3} xl={3} flexGrow={1}>
                <SkeletonPreview key={index} />
              </Grid>))}
          </>) : (
          <>
            {rentObjects?.map((rentObject, index) => (
              <Grid item xs={6} md={4} xl={3}>
                <FlatPreviewCard
                  rentInformation={rentObject}
                  keyNumber={index} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Stack>);
}