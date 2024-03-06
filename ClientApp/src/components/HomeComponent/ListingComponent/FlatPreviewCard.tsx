import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";
import { RentObjectInformation } from "src/interfaces/RentObj";
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from "react-image-gallery";

interface CardProps {
  rentInformation: RentObjectInformation;
  num: number;
}

interface ForPhotos {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
}

export const FlatPreviewCard = ({ rentInformation, num }: CardProps) => {

  const commonTextStyles = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  };

  const [images, setImages] = React.useState<ForPhotos[]>([]);

  React.useEffect(() => {
    let imagess: ForPhotos[] = [];
    if (rentInformation) {
      rentInformation.photos.map(photo => (
        imagess.push({ original: photo, thumbnail: photo, originalHeight: 200 })
      ))
    }
    setImages(imagess);

  }, [rentInformation]);

  return (
    <Card sx={{ maxWidth: 300 }} key={num}>
      <CardActionArea>
        <div style={{ width: "100%" }}>
          {rentInformation.photos.length > 0 ?
            (<ImageGallery items={images} showNav={false} showThumbnails={false} autoPlay={false} showPlayButton={false} showFullscreenButton={false} showBullets={true} lazyLoad={true} infinite={false} isRTL={false} />)
            : (
              <CardMedia
                component="img"
                height="200"
                image={"https://realt.by/_next/static/media/no-photo.850f218e.svg"}
                alt="flat images"
              />
            )}
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ ...commonTextStyles, WebkitLineClamp: 2 }}>
            {rentInformation.rentObject.title}
          </Typography>
          <Typography variant="h6">
            {rentInformation.rentObject.rentPrice + ' ' + rentInformation.currency}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary" sx={{ ...commonTextStyles, WebkitLineClamp: 2 }}>
            {rentInformation.rentObject.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card >);
}
