import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { RentObjectInformation } from "src/interfaces/RentObj";
import "react-image-gallery/styles/css/image-gallery.css";
import { ImageGalleryStyled } from "src/shared";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface CardProps {
  rentInformation: RentObjectInformation;
  keyNumber: number;
  isFavourite: boolean;
  onFavouriteChange: (isChange: boolean) => void;
}

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalWidth?: number;
}

export const MapListPreviewCard = ({
  rentInformation,
  keyNumber,
  isFavourite,
  onFavouriteChange,
}: CardProps) => {
  const isMedium = useMediaQuery((theme: any) =>
    theme.breakpoints.between("xl", "2000")
  );
  const isLarge = useMediaQuery((theme: any) =>
    theme.breakpoints.between("2000", "4000")
  );
  const isSuperLarge = useMediaQuery((theme: any) =>
    theme.breakpoints.between("4000", "7000")
  );
  const heigth = isSuperLarge ? 700 : isLarge ? 500 : isMedium ? 300 : 250;

  const [images, setImages] = React.useState<ForPhotos[]>([]);
  const [showContact, setShowContact] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    let imagess: ForPhotos[] = [];
    if (rentInformation) {
      rentInformation.photos.map((photo) =>
        imagess.push({
          original: photo,
          thumbnail: photo,
          originalHeight: heigth,
          originalWidth: 100,
        })
      );
    }
    setImages(imagess);
  }, [rentInformation.photos, heigth]);

  const currency = rentInformation.currency;
  const price = rentInformation.rentObject.rentPrice;
  const bynPrice =
    currency === "USD"
      ? Math.round(price * 3.2063)
      : currency === "EUR"
      ? Math.round(price * 3.5045)
      : price;

  const onCopyPhoneNumber = async () => {
    await navigator.clipboard.writeText(rentInformation.owner.phoneNumber);
    openAlert();
  };

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

  const handleFavouriteChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isLoggedIn()) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        toggleFavourite(
          rentInformation.rentObject.rentObjId,
          decodedToken.name,
          token
        );
      }
      onFavouriteChange(true);
      // setFavourite(!favourite);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <Box padding={"10px 20px"}>
      <Card key={keyNumber} style={{ width: "100%", maxHeight: "300px" }}>
        <CardActionArea disableTouchRipple>
          <Stack flexDirection={"row"} width={"100%"}>
            <Stack width="50%">
              {rentInformation?.photos.length ? (
                <ImageGalleryStyled
                  items={images}
                  showNav={false}
                  showThumbnails={false}
                  autoPlay={false}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showBullets={true}
                  lazyLoad={true}
                  infinite={false}
                  isRTL={false}
                />
              ) : (
                <img
                  src={
                    "https://realt.by/_next/static/media/no-photo.850f218e.svg"
                  }
                  alt="photo_preview"
                  height={heigth}
                  width="315px"
                />
              )}
            </Stack>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <Stack>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Stack flexDirection="row" alignItems="center">
                    <Typography gutterBottom variant="h6" fontWeight="600">
                      {bynPrice} р./мес.&nbsp;
                    </Typography>
                    <Typography gutterBottom variant="body2" fontWeight="400">
                      ≈{rentInformation.rentObject.rentPrice}{" "}
                      {rentInformation.currency}
                      /мес.
                    </Typography>
                  </Stack>
                  <IconButton
                    color="primary"
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => handleFavouriteChange(e)}
                  >
                    {isFavourite ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </IconButton>
                </Stack>
                <Stack flexDirection="row" flexWrap="wrap" gap="0.5rem">
                  <Typography variant="subtitle2">
                    <b>{rentInformation.rentObject.roomsCount}</b>&nbsp;комн.
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>{rentInformation.rentObject.totalArea}</b>&nbsp;м
                    <sup style={{ fontSize: "0.5rem" }}>2</sup>
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>
                      {rentInformation.rentObject.floorNumber}/
                      {rentInformation.rentObject.floorsAmount}
                    </b>
                    &nbsp;этаж
                  </Typography>
                </Stack>

                <Stack
                  mt="1rem"
                  flexDirection="row"
                  alignItems="end"
                  gap="0.5rem"
                >
                  <Typography variant="body2" lineHeight="1.25rem" noWrap>
                    {rentInformation.address.city}
                  </Typography>
                  <Typography variant="body2" lineHeight="1.25rem" noWrap>
                    {`${rentInformation.address.street} ${rentInformation.address.houseNumber}`}
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <Box display={"flex"} justifyContent={"end"}>
                  {!showContact ? (
                    <Button
                      variant="contained"
                      color="info"
                      style={{ textTransform: "none" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowContact(true);
                      }}
                    >
                      {/* не удаляй e.stopPropagation(); а то будет вызываться onClick у Card */}
                      Контакт
                    </Button>
                  ) : (
                    <Stack textAlign={"end"}>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        spacing={"5px"}
                        useFlexGap
                      >
                        <Typography
                          fontSize={18}
                          fontWeight={600}
                          color="#1976d2"
                          style={{ flexGrow: 1 }}
                        >
                          {rentInformation.owner.phoneNumber}{" "}
                        </Typography>
                        <ContentCopyIcon
                          sx={{
                            fontSize: "15px",
                            color: "#1976d2",
                            ":hover": {
                              color: "#1565c0",
                            },
                          }}
                          onClick={onCopyPhoneNumber}
                        />
                      </Stack>

                      <Typography>{rentInformation.owner.name}</Typography>
                    </Stack>
                  )}
                </Box>
                <Stack
                  flexDirection={"row"}
                  marginTop={"6px"}
                  justifyContent={"space-between"}
                >
                  <Stack
                    flexDirection={"row"}
                    spacing={"3px"}
                    useFlexGap
                    alignItems={"center"}
                  >
                    <Typography fontSize={14}>
                      {`${new Date(
                        rentInformation.rentObject.updatedAt
                      ).toLocaleDateString()}`}
                    </Typography>
                    <SyncOutlinedIcon fontSize="inherit" />
                  </Stack>

                  <Typography fontSize={14}>Контактное лицо</Typography>
                </Stack>
              </Stack>
            </CardContent>
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
        </CardActionArea>
      </Card>
    </Box>
  );
};
