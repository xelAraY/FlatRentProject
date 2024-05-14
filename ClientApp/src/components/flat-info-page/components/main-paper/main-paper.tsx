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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
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
  isFavourite: boolean;
  onFavouriteChange: (isChange: boolean) => void;
  isOwner: boolean;
}

const MainPaper: React.FC<MainPaperProps> = ({
  flatInfo,
  isFavourite,
  isOwner,
  onScrollToMap,
  onFavouriteChange,
}) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [images, setImages] = React.useState<ForPhotos[]>([]);
  const navigate = useNavigate();

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

  const toggleFavourite = async (
    objectId: number,
    username: string,
    token: string
  ) => {
    try {
      const response = await fetch("api/account/toggleFavourite", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ objectId, username }),
      });
      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  const handleFavouriteChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isLoggedIn()) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        await toggleFavourite(
          flatInfo?.rentObject?.rentObjId || 0,
          decodedToken.nickname,
          token
        );
      }

      onFavouriteChange(true);
    } else {
      navigate("/sign-in");
    }
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

          {flatInfo?.metroStations && flatInfo?.metroStations.length > 0 && (
            <Stack flexDirection="row" gap="0.5rem">
              <Stack flexDirection="row" gap="0.1rem">
                <SvgIcon
                  color={flatInfo?.metroStations[0].color as any}
                  viewBox="0 0 17 16"
                >
                  <MetroSvg />
                </SvgIcon>
                <Typography variant="body1">
                  {flatInfo?.metroStations[0].name}
                </Typography>
              </Stack>

              <Stack flexDirection="row">
                {flatInfo?.metroStations[0].wayType === "Пешком" ? (
                  <DirectionsWalkOutlinedIcon style={{ height: "1.5rem" }} />
                ) : (
                  <DirectionsCarIcon style={{ height: "1.5rem" }} />
                )}
                <Typography variant="body1">
                  {`${flatInfo?.metroStations[0].travelTime} минут`}
                </Typography>
              </Stack>
            </Stack>
          )}

          <Link
            underline="hover"
            variant="body1"
            onClick={onScrollToMap}
            sx={{ cursor: "pointer" }}
          >
            {`На карте`}
          </Link>
        </Stack>

        <Stack flexDirection="row" gap="1rem">
          {isOwner ? (
            <div>Кнопка для редактирования объявления</div>
          ) : (
            <IconButton
              color="primary"
              size="large"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleFavouriteChange(e)
              }
            >
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
            </IconButton>
          )}

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
