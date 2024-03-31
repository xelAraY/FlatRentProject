import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { RentObject } from "src/interfaces/RentObj";
import { InfoRow } from "../info-row";

interface DetailsPaperProps {
  flatInfo?: RentObject;
  preferences?: string[];
}

const DetailsPaper: React.FC<DetailsPaperProps> = ({
  flatInfo,
  preferences,
}) => {
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
        <InfoRow
          title={"Количество комнат"}
          value={`${flatInfo?.roomsCount}`}
        />
        <InfoRow
          title={"Год постройки"}
          value={`${flatInfo?.constructionYear}`}
        />
        <InfoRow title={"Площадь общая"} value={`${flatInfo?.totalArea} м²`} />
        <InfoRow title={"Площадь жилая"} value={`${flatInfo?.livingArea} м²`} />
        <InfoRow
          title={"Площадь кухни"}
          value={`${flatInfo?.kitchenArea} м²`}
        />
        <InfoRow
          title={"Этаж / этажность"}
          value={`${flatInfo?.floorNumber} / ${flatInfo?.floorsAmount}`}
        />
        <InfoRow
          title={"Количество комнат"}
          value={`${flatInfo?.roomsCount}`}
        />
        <InfoRow title={"Санузел"} value={`${flatInfo?.bathroom}`} />
        <InfoRow title={"Балкон"} value={`${flatInfo?.balcony}`} />
        <InfoRow title={"Мебель"} value={`${flatInfo?.furniture}`} />
        {preferences && (
          <InfoRow
            title={"Условия сдачи"}
            value={`${preferences.join(", ")}`}
          />
        )}
        <InfoRow title={"Предоплата"} value={`${flatInfo?.prepayment}`} />
        <InfoRow title={"Срок аренды"} value={`${flatInfo?.rentalPeriod}`} />
        {flatInfo?.rent && (
          <InfoRow title={"Квартплата"} value={`${flatInfo.rent}`} />
        )}
      </Grid>
    </Paper>
  );
};

export default DetailsPaper;
