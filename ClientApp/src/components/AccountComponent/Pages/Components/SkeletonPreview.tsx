import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export const SkeletonPreview = () => {
  return (
    <Card sx={{ width: 800, borderRadius: "1rem" }}>
      <CardActionArea>
        <CardContent sx={{ padding: "0" }}>
          <Stack flexDirection="row" width="100%">
            <Skeleton
              variant="rectangular"
              width="40%"
              height={258}
              animation="wave"
            />
            <Stack width="60%" sx={{ padding: "1rem" }} gap={"0.5rem"}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="50%"
                height={32}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="40%"
                height={28}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="5%"
                height={20}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="38%"
                height={20}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={44}
                animation="wave"
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
