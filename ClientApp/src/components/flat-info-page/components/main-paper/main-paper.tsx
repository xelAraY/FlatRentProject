import React from "react";
import {
  Alert,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { ImageGalleryStyled, MetroSvg } from "src/shared";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import { ReactComponent as Logo } from "./../../../../../";

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalWidth?: number;
}

interface MainPaperProps {
  flatInfo?: RentObjectInformation;
  onScrollToMap: () => void;
}

const MainPaper: React.FC<MainPaperProps> = ({ flatInfo, onScrollToMap }) => {
  const [fullScreen, setFullScreen] = React.useState(false);

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

  const onCopyPathClick = async () => {
    await navigator.clipboard.writeText(
      window.location.origin + window.location.pathname
    );
    openAlert();
  };

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlertOpen(false);
  };

  return (
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
      <Typography variant="h4" fontWeight={600}>
        {flatInfo?.rentObject?.title ||
          `Сдается ${flatInfo?.rentObject?.roomsCount}-комнатная квартира`}
      </Typography>
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

          <Stack flexDirection="row" gap="0.1rem">
            <SvgIcon color="error" viewBox="0 0 17 16">
              <MetroSvg />
            </SvgIcon>
            <Typography variant="body1">{`Каменная Горка`}</Typography>
          </Stack>

          <Stack flexDirection="row">
            <DirectionsWalkOutlinedIcon style={{ height: "1.5rem" }} />
            <Typography variant="body1">{`10 минут`}</Typography>
          </Stack>

          <Link
            underline="hover"
            onClick={onScrollToMap}
            sx={{ cursor: "pointer" }}
          >
            На карте
          </Link>
        </Stack>

        <Stack flexDirection="row" gap="1rem">
          <IconButton color="default" size="large">
            <FavoriteIcon fontSize="inherit" />
          </IconButton>
          <IconButton color="default" size="large" onClick={onCopyPathClick}>
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
        />
      ) : (
        <img
          src={"https://realt.by/_next/static/media/no-photo.850f218e.svg"}
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
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={2000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeAlert} severity="success">
          Скопировано в буфер обмена
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default MainPaper;
