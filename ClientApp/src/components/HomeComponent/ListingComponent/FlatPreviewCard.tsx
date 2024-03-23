import {
  Box,
  Button,
  Card, CardActionArea, CardContent,
  Stack, Typography, useMediaQuery
} from "@mui/material";
import React from "react";
import { RentObjectInformation } from "src/interfaces/RentObj";
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from "react-image-gallery";
import { StyledImageGalery } from "./styled";

interface CardProps {
  rentInformation: RentObjectInformation;
  keyNumber: number;
}

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalWidth?: number;
}

export const FlatPreviewCard = ({
  rentInformation,
  keyNumber }: CardProps) => {
  const isMedium = useMediaQuery((theme: any) => theme.breakpoints.between('xl', '2000'));
  const isLarge = useMediaQuery((theme: any) => theme.breakpoints.between('2000', '4000'));
  const isSuperLarge = useMediaQuery((theme: any) => theme.breakpoints.between('4000', '7000'));
  const heigth = isSuperLarge ? 700 : isLarge ? 500 : isMedium ? 300 : 250;


  const [images, setImages] = React.useState<ForPhotos[]>([]);

  React.useEffect(() => {
    let imagess: ForPhotos[] = [];
    if (rentInformation) {
      rentInformation.photos.map(photo => (
        imagess.push({ original: photo, thumbnail: photo, originalHeight: heigth, originalWidth: 100 })
      ))
    }
    setImages(imagess);
  }, [rentInformation.photos, heigth]);

  const currency = rentInformation.currency;
  const price = rentInformation.rentObject.rentPrice;
  const bynPrice = currency === "USD" ? Math.round(price * 3.2063) : currency === "EUR" ? Math.round(price * 3.5045) : price;

  return (
    <Card key={keyNumber} style={{ width: '100%', minWidth: "300px" }}>
      <CardActionArea onClick={() => console.log('show details')} disableTouchRipple>
        <Stack>
          <StyledImageGalery justifyContent='center' alignItems='center' sx={{ bgcolor: rentInformation?.photos.length ? 'black' : 'none' }}>
            {rentInformation?.photos.length
              ? <ImageGallery items={images} showNav={false} showThumbnails={false} autoPlay={false} showPlayButton={false} showFullscreenButton={false} showBullets={true} lazyLoad={true} infinite={false} isRTL={false} />
              : <img src={"https://realt.by/_next/static/media/no-photo.850f218e.svg"} alt='photo_preview' height={heigth} width='100%' />}
          </StyledImageGalery>
        </Stack>
        <CardContent>
          <Stack flexDirection="row" alignItems="center">
            <Typography gutterBottom variant='h6' fontWeight='600'>
              {bynPrice} р./мес.&nbsp;
            </Typography>
            <Typography gutterBottom variant='body2' fontWeight='400'>
              ≈{rentInformation.rentObject.rentPrice} {rentInformation.currency}/мес.
            </Typography>
          </Stack>
          <Stack flexDirection='row' flexWrap='wrap' gap='0.5rem'>
            <Typography variant="subtitle2" >
              <b>{rentInformation.rentObject.roomsCount}</b>&nbsp;комн.
            </Typography>
            <Typography variant="subtitle2">
              <b>{rentInformation.rentObject.totalArea}</b>&nbsp;м<sup style={{ fontSize: '0.5rem' }}>2</sup>
            </Typography>
            <Typography variant="subtitle2">
              <b>{rentInformation.rentObject.floorNumber}/{rentInformation.rentObject.floorsAmount}</b>&nbsp;этаж
            </Typography>
          </Stack>

          <Stack mt='1rem' flexDirection='row' alignItems='end' gap='0.5rem' justifyContent='space-between'>
            <Stack overflow='hidden'>
              <Typography variant="body2" lineHeight='1.25rem' noWrap>
                {rentInformation.address.city}
              </Typography>
              <Typography variant="body2" lineHeight='1.25rem' noWrap>
                {`${rentInformation.address.street} ${rentInformation.address.houseNumber}`}
              </Typography>
            </Stack>
            <Box>
              <Button variant='contained' color='info'
                style={{ textTransform: 'none' }}
                onClick={e => { e.stopPropagation(); console.log('show contacts') }}> {/* не удаляй e.stopPropagation(); а то будет вызываться onClick у Card */}
                Контакт
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>);
}
