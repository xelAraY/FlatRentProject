import { Card, CardActionArea, CardContent, Skeleton } from "@mui/material";
import React from "react";

export const SkeletonPreview = () => {

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <Skeleton variant="rectangular" animation="wave" sx={{ height: 200, width: 300 }} />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div" sx={sty1}>
            <Skeleton />
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={sty1}>
            <Skeleton width="70%" />
          </Typography>
          <Typography variant="h6">
            <Skeleton width="30%" />
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary" sx={sty}>
            <Skeleton width={"70%"} />
          </Typography> */}
          <Skeleton height={32} animation="wave" />
          <Skeleton height={32} width="70%" animation="wave" style={{ marginBottom: 8 }} />
          <Skeleton height={32} width="30%" animation="wave" />
          <Skeleton height={20} width="70%" animation="wave" />
        </CardContent>
      </CardActionArea>
    </Card >


  );
}