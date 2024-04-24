import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { RentObjectInformation } from "src/interfaces/RentObj";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  DOLLAR_EXCHANGE_RATE,
  EURO_EXCHANGE_RATE,
  ImageGalleryStyled,
} from "src/shared";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";

interface CardProps {
  rentInformation: RentObjectInformation;
  keyNumber: number;
  isFavourite: boolean;
  onFavouriteChange: (isChange: boolean, objectId?: number) => void;
  onCardClick: (flatId: number) => void;
}

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalWidth?: number;
}

export const FlatPreviewCard = ({
  rentInformation,
  keyNumber,
  isFavourite,
  onCardClick,
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

  const [images, setImages] = useState<ForPhotos[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const price = rentInformation.rentObject.rentPrice;
  let currencyType = searchParams.get("currencyType");
  let anotherPrice = 0;
  if (currencyType === "EUR") {
    anotherPrice = Math.round(price / EURO_EXCHANGE_RATE);
  } else {
    anotherPrice = Math.round(price / DOLLAR_EXCHANGE_RATE);
    currencyType = "USD";
  }

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
    e.stopPropagation();
    if (isLoggedIn()) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        await toggleFavourite(
          rentInformation.rentObject.rentObjId,
          decodedToken.nickname,
          token
        );
      }
      onFavouriteChange(true, rentInformation.rentObject.rentObjId);
      // setFavourite(!favourite);
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <Card key={keyNumber} style={{ width: "100%", minWidth: "300px" }}>
      <CardActionArea
        onClick={() => onCardClick(rentInformation.rentObject.rentObjId)}
        disableTouchRipple
      >
        <Stack>
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
              src={"https://realt.by/_next/static/media/no-photo.850f218e.svg"}
              alt="photo_preview"
              height={heigth}
              width="100%"
            />
          )}
        </Stack>
        <CardContent>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Stack flexDirection="row" alignItems="center">
              <Typography gutterBottom variant="h6" fontWeight="600">
                {price} р./мес.&nbsp;
              </Typography>
              <Typography gutterBottom variant="body2" fontWeight="400">
                ≈{anotherPrice} {currencyType}/мес.
              </Typography>
            </Stack>
            <IconButton
              color="primary"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleFavouriteChange(e)
              }
            >
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
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
            justifyContent="space-between"
          >
            <Stack overflow="hidden">
              <Typography variant="body2" lineHeight="1.25rem" noWrap>
                {rentInformation.address.city}
              </Typography>
              <Typography variant="body2" lineHeight="1.25rem" noWrap>
                {`${rentInformation.address.street} ${rentInformation.address.houseNumber}`}
              </Typography>
            </Stack>
            <Box>
              <Button
                variant="contained"
                color="info"
                style={{ textTransform: "none" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* не удаляй e.stopPropagation(); а то будет вызываться onClick у Card */}
                Контакт
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
