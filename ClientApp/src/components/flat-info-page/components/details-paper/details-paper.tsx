import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { RentObject } from "src/interfaces/RentObj";
import { InfoRow } from "../info-row";

interface DetailsPaperProps {
  flatInfo?: RentObject;
  preferences?: string[];
  addInf?: string[];
}

const DetailsPaper: React.FC<DetailsPaperProps> = ({
  flatInfo,
  preferences,
  addInf,
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
        {flatInfo?.constructionYear && (
          <InfoRow
            title={"Год постройки"}
            value={`${flatInfo?.constructionYear}`}
          />
        )}

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

        {flatInfo?.bathroom && (
          <InfoRow title={"Санузел"} value={`${flatInfo?.bathroom}`} />
        )}

        {flatInfo?.balcony && (
          <InfoRow title={"Балкон"} value={`${flatInfo?.balcony}`} />
        )}

        {flatInfo?.furniture && (
          <InfoRow title={"Мебель"} value={`${flatInfo?.furniture}`} />
        )}

        {flatInfo?.plate && (
          <InfoRow title={"Плита"} value={`${flatInfo?.plate}`} />
        )}

        <InfoRow title={"Срок аренды"} value={`${flatInfo?.rentalPeriod}`} />
        <InfoRow title={"Квартплата"} value={`${flatInfo?.rent}`} />

        {flatInfo?.prepayment && (
          <InfoRow title={"Предоплата"} value={`${flatInfo?.prepayment}`} />
        )}

        {preferences && preferences.length > 0 && (
          <InfoRow
            title={"Условия сдачи"}
            value={`${preferences.join(", ")}`}
          />
        )}

        {addInf &&
          addInf.length > 0 &&
          addInf.map((inf, index) => (
            <InfoRow key={index} title={inf} value={`Есть`} />
          ))}
      </Grid>
    </Paper>
  );
};

export default DetailsPaper;
