import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SyncIcon from "@mui/icons-material/Sync";
import { option } from "yandex-maps";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { jwtDecode } from "jwt-decode";

interface CardProps {
  rentInformation: RentObjectInformation;
  onCardClick: (flatId: number) => void;
  onListingDelete: () => void;
}

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalWidth?: number;
}

export const UserFlatPreviewCard = ({
  rentInformation,
  onCardClick,
  onListingDelete,
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

  const [hidden, setHidden] = useState(rentInformation.rentObject.hidden);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    event.stopPropagation();
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

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

  const handleChangeListingStatus = async () => {
    if (isLoggedIn()) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const response = await fetch(
            `api/account/updateListingStatus/${decodedToken.nickname}?rentObjectId=${rentInformation.rentObject.rentObjId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            setHidden(!hidden);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/sign-in");
    }
  };

  const handleOpenDeleteAlert = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpenDeleteAlert(true);
  };

  const handleCloseDeleteAlert = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpenDeleteAlert(false);
  };

  const handleDeleteListing = async () => {
    if (isLoggedIn()) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwtDecode(token);
          await fetch(
            `api/account/deleteListing/${rentInformation.rentObject.rentObjId}?userName=${decodedToken.nickname}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        await onListingDelete();
        //navigate("/account/myListings");
      }
    } else {
      navigate("/sign-in");
    }
  };

  const price = Math.round(
    rentInformation.rentObject.rentPrice * rentInformation.currency.officialRate
  );
  const anotherPrice = Math.round(price / DOLLAR_EXCHANGE_RATE);

  return (
    <Card
      style={{
        width: "100%",
        minWidth: "800px",
        borderRadius: "1rem",
        boxShadow: "none",
      }}
    >
      <CardActionArea
        onClick={() => onCardClick(rentInformation.rentObject.rentObjId)}
        disableTouchRipple
      >
        <CardContent sx={{ padding: "0" }}>
          <Stack flexDirection="row">
            <Stack width="40%">
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
                  width="100%"
                />
              )}
            </Stack>
            <Stack
              sx={{ padding: "1rem" }}
              flexGrow={1}
              justifyContent="space-between"
            >
              <Stack gap="0.5rem">
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Chip
                    sx={{
                      background: "#d0edff",
                      width: "min-content",
                      fontSize: "1rem",
                    }}
                    label={hidden ? "Не опубликовано" : "Опубликовано"}
                  />
                  <IconButton
                    ref={anchorRef}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle();
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    `/account/newListing?id=${rentInformation.rentObject.rentObjId}`
                                  );
                                }}
                              >
                                {`Редактировать`}
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  setOpen(false);
                                  handleOpenDeleteAlert(e);
                                }}
                              >
                                {`Удалить`}
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  <Dialog
                    open={openDeleteAlert}
                    onClose={handleCloseDeleteAlert}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DialogTitle>
                      {"Вы действительно хотите удалить данное объявление?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {`Удаление объявления приведет к его безвозвратной потере.
                        Объявление также перестанет быть доступным в общем спсике объявлений.`}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={(e) => handleCloseDeleteAlert(e)}>
                        Отмена
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseDeleteAlert(e);
                          handleDeleteListing();
                        }}
                        autoFocus
                      >
                        Продолжить
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Stack>

                <Stack justifyContent={"space-between"}>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography variant="h6" fontWeight="600">
                      {price} р./мес.&nbsp;
                    </Typography>
                    <Typography variant="body2" fontWeight="400">
                      {`≈ ${anotherPrice} $/мес.`}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack flexDirection="row" flexWrap="wrap" gap="0.5rem">
                  <Typography variant="subtitle1">
                    <b>{rentInformation.rentObject.roomsCount}</b>&nbsp;комн.
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>{rentInformation.rentObject.totalArea}</b>&nbsp;м
                    <sup style={{ fontSize: "0.5rem" }}>2</sup>
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>
                      {rentInformation.rentObject.floorNumber}/
                      {rentInformation.rentObject.floorsAmount}
                    </b>
                    &nbsp;этаж
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1" lineHeight="1.25rem" noWrap>
                    {rentInformation.address.city}
                  </Typography>
                  <Typography variant="body1" lineHeight="1.25rem" noWrap>
                    {`${rentInformation.address.street} ${rentInformation.address.houseNumber}`}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                alignItems="start"
                gap="0.5rem"
                justifyContent="space-between"
                flexDirection="row"
                overflow="hidden"
              >
                <Stack gap={0.5}>
                  <Stack flexDirection="row" alignItems="center" gap={1}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2" lineHeight="1.25rem" noWrap>
                      {`Подано ${new Date(
                        rentInformation.rentObject.createdAt
                      ).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })} в ${new Date(
                        rentInformation.rentObject.createdAt
                      ).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}`}
                    </Typography>
                  </Stack>

                  <Stack flexDirection="row" alignItems="center" gap={1}>
                    <SyncIcon fontSize="small" />
                    <Typography variant="body2" lineHeight="1.25rem" noWrap>
                      {`Обновлено ${new Date(
                        rentInformation.rentObject.updatedAt
                      ).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })} в ${new Date(
                        rentInformation.rentObject.updatedAt
                      ).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}`}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack>
                  <Button
                    variant="contained"
                    color="info"
                    style={{ textTransform: "none" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeListingStatus();
                    }}
                  >
                    {/* не удаляй e.stopPropagation(); а то будет вызываться onClick у Card */}
                    {hidden ? "Опубликовать" : "Скрыть"}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
