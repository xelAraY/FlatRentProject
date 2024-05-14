import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export const SkeletonPreview = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: 300, width: 345 }}
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div" sx={sty1}>
            <Skeleton />
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={sty1}>
            <Skeleton width="70%" />
          </Typography>
          <Typography variant="h6">
            <Skeleton width="30%" />
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary" sx={sty}>
            <Skeleton width={"70%"} />
          </Typography> */}
          <Skeleton height={40} animation="wave" />
          <Skeleton
            height={22}
            width="70%"
            animation="wave"
            style={{ marginBottom: 8 }}
          />
          <Stack flexDirection="row">
            <Stack width="70%">
              <Skeleton height={20} width="30%" animation="wave" />
              <Skeleton height={20} width="70%" animation="wave" />
            </Stack>
            <Skeleton height={40} width="30%" animation="wave" />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
