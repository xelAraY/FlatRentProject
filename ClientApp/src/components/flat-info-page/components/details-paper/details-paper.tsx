import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";

interface DetailsPaperProps {
  flatInfo?: RentObjectInformation;
}

const DetailsPaper: React.FC<DetailsPaperProps> = ({ flatInfo }) => {
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
      <Typography variant="h6" fontWeight={600}>
        {"Параметры объекта"}
      </Typography>
      <Grid container spacing="0.5rem">
        <Grid item xs={5}>
          <Stack flexDirection="row" gap="0.25rem">
            <Typography variant="subtitle1" lineHeight="1.5rem">
              {"Количество комнат"}
            </Typography>
            <Box borderBottom="1px dashed" flexGrow={1} height="1.25rem" />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {flatInfo?.rentObject.roomsCount}
        </Grid>

        <Grid item xs={5}>
          <Stack flexDirection="row" gap="0.25rem">
            <Typography variant="subtitle1" lineHeight="1.5rem">
              {"Год постройки"}
            </Typography>
            <Box borderBottom="1px dashed" flexGrow={1} height="1.25rem" />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {flatInfo?.rentObject.constructionYear}
        </Grid>

        <Grid item xs={5}>
          <Stack flexDirection="row" gap="0.25rem">
            <Typography variant="subtitle1" lineHeight="1.5rem">
              {"Площадь общая"}
            </Typography>
            <Box borderBottom="1px dashed" flexGrow={1} height="1.25rem" />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {flatInfo?.rentObject.livingArea}&nbsp;м²
        </Grid>

        <Grid item xs={5}>
          <Stack flexDirection="row" gap="0.25rem">
            <Typography variant="subtitle1" lineHeight="1.5rem">
              {"Площадь общая"}
            </Typography>
            <Box borderBottom="1px dashed" flexGrow={1} height="1.25rem" />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {flatInfo?.rentObject.totalArea}&nbsp;м²
        </Grid>

        <Grid item xs={5}>
          <Stack flexDirection="row" gap="0.25rem">
            <Typography variant="subtitle1" lineHeight="1.5rem">
              {"Площадь кухни"}
            </Typography>
            <Box borderBottom="1px dashed" flexGrow={1} height="1.25rem" />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {flatInfo?.rentObject.kitchenArea}&nbsp;м²
        </Grid>

        <Grid item xs={5}>
          <Stack flexDirection="row" gap="0.25rem">
            <Typography variant="subtitle1" lineHeight="1.5rem">
              {"Этаж / этажность"}
            </Typography>
            <Box borderBottom="1px dashed" flexGrow={1} height="1.25rem" />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {flatInfo?.rentObject.floorNumber}&nbsp;/&nbsp;
          {flatInfo?.rentObject.floorsAmount}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailsPaper;
