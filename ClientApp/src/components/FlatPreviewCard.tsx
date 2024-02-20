import { Card, CardActionArea, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { RentObjectInformation } from "src/interfaces/RentObj";

interface CardProps {
  rentInformation: RentObjectInformation;
}

export const FlatPreviewCard = ({ rentInformation }: CardProps) => {

  const sty = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
  };

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={rentInformation.photos.length > 0 ? rentInformation.photos[0] : "https://realt.by/_next/static/media/no-photo.850f218e.svg"}
          alt="flat images"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {rentInformation.rentObject.title}
          </Typography>
          <Divider />
          <Stack sx={sty}>
            <Typography variant="body2" color="text.secondary">
              {rentInformation.rentObject.description}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>);
}
