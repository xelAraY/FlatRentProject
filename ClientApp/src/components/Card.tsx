import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

interface CardProps {
  styles: React.CSSProperties;
}

export const FlatPreviewCard = ({ styles }: CardProps) => {

  return (
    <Card sx={{ maxWidth: 345 }} style={styles}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="./../../Flat.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Flat
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>);
}
