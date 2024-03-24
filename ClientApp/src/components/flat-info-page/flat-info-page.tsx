import React from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { ImageGalleryStyled } from "src/shared";
import { RentObjectInformation } from "src/interfaces/RentObj";
import {
  Alert,
  Grid,
  Icon,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalWidth?: number;
}

const FlatInfoPage: React.FC = () => {
  const { flatId } = useParams();
  const [flatInfo, setFlatInfo] = React.useState<RentObjectInformation>();
  const [fullScreen, setFullScreen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      return await fetch(`api/flat/${flatId}`).then((data) => data.json());
    };
    const response = fetchData().then((data) => {
      setFlatInfo(data[0]);
    });
  }, [flatId]);

  const [images, setImages] = React.useState<ForPhotos[]>([]);

  React.useEffect(() => {
    let imagess: ForPhotos[] = [];
    if (flatInfo?.photos) {
      flatInfo.photos.map((photo: any) =>
        imagess.push({
          original: photo,
          thumbnail: photo,
          originalHeight: 500,
          originalWidth: 100,
        })
      );
    }
    setImages(imagess);
  }, [flatInfo?.photos]);

  const imageGalleryRef = React.useRef<ImageGallery | null>(null);
  const mapRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToMap = () => mapRef?.current?.scrollIntoView();
  const onCopyPathClick = async () => {
    await navigator.clipboard.writeText(
      window.location.origin + window.location.pathname
    );
    handleClick();
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack p="3rem 5rem">
      <Grid container columnGap="2rem">
        <Grid item xs={8}>
          <Paper
            variant="outlined"
            sx={{
              p: "2rem",
              borderRadius: "0.375rem",
              hyphens: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {flatInfo?.rentObject?.title && (
              <Typography variant="h4" fontWeight={600}>
                {flatInfo?.rentObject?.title}
              </Typography>
            )}
            <Stack
              flexDirection="row"
              gap="1rem"
              alignItems="baseline"
              justifyContent="space-between"
            >
              <Stack flexDirection="row" gap="1rem" flexWrap="wrap">
                <Stack flexDirection="row">
                  <LocationOnOutlinedIcon style={{ height: "1.5rem" }} />
                  <Typography variant="body1">
                    {`г. ${flatInfo?.address.city}, ${flatInfo?.address.street}, ${flatInfo?.address.houseNumber}`}
                  </Typography>
                </Stack>

                <Stack flexDirection="row">
                  <img
                    src="./../../../metro.svg"
                    alt="metro/"
                    style={{ height: "1.5rem", marginRight: "0.5rem" }}
                  />
                  <Typography variant="body1">{`Каменная Горка`}</Typography>
                </Stack>

                <Stack flexDirection="row">
                  <DirectionsWalkOutlinedIcon style={{ height: "1.5rem" }} />
                  <Typography variant="body1">{`10 минут`}</Typography>
                </Stack>

                <Link
                  underline="hover"
                  onClick={() => scrollToMap()}
                  sx={{ cursor: "pointer" }}
                >
                  На карте
                </Link>
              </Stack>

              <Stack flexDirection="row" gap="1rem">
                <IconButton color="default" size="large">
                  <FavoriteIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  color="default"
                  size="large"
                  onClick={onCopyPathClick}
                >
                  <ContentCopyOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Stack>

            {flatInfo?.photos.length ? (
              <ImageGalleryStyled
                items={images}
                showNav={true}
                showThumbnails={true}
                autoPlay={false}
                showPlayButton={false}
                showFullscreenButton={true}
                showBullets={true}
                lazyLoad={true}
                infinite={true}
                isRTL={false}
                fullscreen={fullScreen}
                onScreenChange={(fullScreen) => setFullScreen(fullScreen)}
                ref={imageGalleryRef}
              />
            ) : (
              <img
                src={
                  "https://realt.by/_next/static/media/no-photo.850f218e.svg"
                }
                alt="photo_preview"
                height={500}
                width="100%"
              />
            )}

            <Stack flexDirection="row" gap="2rem">
              <Stack>
                <Typography variant="h6" fontWeight={600}>
                  {flatInfo?.rentObject.totalArea}&nbsp;м²
                </Typography>
                <Typography variant="subtitle1">{"Общая"}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6" fontWeight={600}>
                  {flatInfo?.rentObject.livingArea}&nbsp;м²
                </Typography>
                <Typography variant="subtitle1">{"Жилая"}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6" fontWeight={600}>
                  {flatInfo?.rentObject.kitchenArea}&nbsp;м²
                </Typography>
                <Typography variant="subtitle1">{"Кухня"}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6" fontWeight={600}>
                  {`${flatInfo?.rentObject.floorNumber} из ${flatInfo?.rentObject.floorsAmount}`}
                </Typography>
                <Typography variant="subtitle1">{"Этаж"}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs="auto">
          <div style={{ position: "sticky", top: "10%" }}>info</div>
        </Grid>
      </Grid>
      <div ref={mapRef}>MAP</div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Скопировано в буфер обмена
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default FlatInfoPage;
