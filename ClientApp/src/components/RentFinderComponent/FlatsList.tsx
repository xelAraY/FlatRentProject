import { Grid, Stack } from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { SkeletonPreview } from "../HomeComponent/ListingComponent/SkeletonPreview";
import { FlatPreviewCard } from "../HomeComponent/ListingComponent/FlatPreviewCard";
import { useNavigate } from "react-router-dom";

interface FlatsListProps {
  rentObjects: RentObjectInformation[];
  isLoading: boolean;
}

export const FlatsList = ({ rentObjects, isLoading }: FlatsListProps) => {
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
              <Grid item md={4} lg={3} xl={3} flexGrow={1} key={index}>
                <SkeletonPreview />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {rentObjects?.map((rentObject, index) => (
              <Grid item xs={6} md={4} xl={3} key={index}>
                <FlatPreviewCard
                  rentInformation={rentObject}
                  keyNumber={index}
                  onCardClick={(flatId: number) => navigate(`/flats/${flatId}`)}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Stack>
  );
};
