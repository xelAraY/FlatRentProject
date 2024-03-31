import React, { useRef } from "react";
import { Box, Grid, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { Address, RentObject } from "src/interfaces/RentObj";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import { Button, MetroSvg, SingleObjectMap } from "src/shared";
import { InfoRow } from "../info-row";

interface LocationPaperProps {
  locationInfo?: Address;
  mapRef: React.RefObject<HTMLDivElement>;
}

const LocationPaper: React.FC<LocationPaperProps> = ({
  locationInfo,
  mapRef,
}) => {
  return (
    <Paper
      ref={mapRef}
      variant="outlined"
      sx={{
        p: "2rem",
        borderRadius: "0.375rem",
        hyphens: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {"Местоположение"}
      </Typography>

      <Stack flexDirection="row" gap="0.5rem">
        <Stack flexDirection="row" gap="0.1rem">
          <SvgIcon color="error" viewBox="0 0 17 16">
            <MetroSvg />
          </SvgIcon>
          <Typography variant="body1">{`Каменная Горка`}</Typography>
        </Stack>

        <Stack flexDirection="row">
          <DirectionsWalkOutlinedIcon style={{ height: "1.5rem" }} />
          <Typography variant="body1">{`10 минут`}</Typography>
        </Stack>
      </Stack>

      <div
        style={{
          height: "60vh",
          width: "100%",
          flexGrow: "1",
          margin: "0.5rem 0",
        }}
      >
        <SingleObjectMap
          coordinates={[
            locationInfo?.latitude || 0,
            locationInfo?.longitude || 0,
          ]}
          houseNumber={locationInfo?.houseNumber || ""}
        />
      </div>

      <Grid container spacing="0.5rem">
        <InfoRow title={"Область"} value={`${locationInfo?.region}`} />
        <InfoRow
          title={"Населенный пункт"}
          value={`${locationInfo?.city}`}
          link={`/flats?locations=${locationInfo?.city}`}
        />
        <InfoRow title={"Улица"} value={`${locationInfo?.street}`} />
        <InfoRow title={"Номер дома"} value={`${locationInfo?.houseNumber}`} />
        <InfoRow title={"Район города"} value={`${locationInfo?.district}`} />
        {locationInfo?.microdistrict && (
          <InfoRow
            title={"Микрорайон"}
            value={`${locationInfo?.microdistrict}`}
          />
        )}
        <InfoRow
          title={"Координаты"}
          value={`${locationInfo?.latitude
            .toString()
            .substring(0, 7)}, ${locationInfo?.longitude
            .toString()
            .substring(0, 7)}`}
        />
      </Grid>
    </Paper>
  );
};

export default LocationPaper;
