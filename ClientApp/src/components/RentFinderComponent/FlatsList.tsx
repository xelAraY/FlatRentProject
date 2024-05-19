import { Grid, Stack } from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { SkeletonPreview } from "../HomeComponent/ListingComponent/SkeletonPreview";
import { FlatPreviewCard } from "../HomeComponent/ListingComponent/FlatPreviewCard";
import { useNavigate } from "react-router-dom";

interface FlatsListProps {
  rentObjects: RentObjectInformation[];
  isLoading: boolean;
  favourites: number[];
  xl?: number;
  onFavouritesChanged: (isChanged: boolean, objectId?: number) => void;
}

export const FlatsList = ({
  rentObjects,
  isLoading,
  favourites,
  xl = 3,
  onFavouritesChanged,
}: FlatsListProps) => {
  const numberOfRentObjects = 4;
  const navigate = useNavigate();

  return (
    <Stack gap="1rem" width="100%" alignItems="center">
      <Grid
        container
        overflow="auto"
        spacing={1}
        pb="0.5rem"
        sx={{
          ".MuiGrid-item": {
            width: "100%",
          },
        }}
      >
        {isLoading ? (
          <>
            {Array.from({ length: numberOfRentObjects }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} flexGrow={1} key={index}>
                <SkeletonPreview />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {rentObjects?.map((rentObject, index) => (
              // <Grid item xs={12} sm={6} md={3} key={index}>
              <Grid item xs={12} sm={6} md={4} xl={xl} key={index}>
                <FlatPreviewCard
                  rentInformation={rentObject}
                  keyNumber={index}
                  onCardClick={(flatId: number) => navigate(`/flats/${flatId}`)}
                  isFavourite={favourites.includes(
                    rentObject.rentObject.rentObjId
                  )}
                  onFavouriteChange={onFavouritesChanged}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Stack>
  );
};
