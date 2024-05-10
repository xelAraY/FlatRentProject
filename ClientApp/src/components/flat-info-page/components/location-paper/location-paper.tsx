import React from "react";
import { Grid, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { Address, MetroStation } from "src/interfaces/RentObj";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { MetroSvg, SingleObjectMap } from "src/shared";
import { InfoRow } from "../info-row";

interface LocationPaperProps {
  locationInfo?: Address;
  mapRef: React.RefObject<HTMLDivElement>;
  metroStations?: MetroStation[];
}

const LocationPaper: React.FC<LocationPaperProps> = ({
  locationInfo,
  mapRef,
  metroStations,
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

      {metroStations && metroStations.length > 0 && (
        <Stack flexDirection="row" gap="2rem">
          {metroStations.map((station, index) => (
            <Stack flexDirection="row" gap="0.5rem">
              <Stack flexDirection="row" gap="0.1rem" key={index}>
                <SvgIcon color={station.color as any} viewBox="0 0 17 16">
                  <MetroSvg />
                </SvgIcon>
                <Typography variant="body1">{station.name}</Typography>
              </Stack>

              <Stack flexDirection="row" key={index}>
                {station.wayType === "Пешком" ? (
                  <DirectionsWalkOutlinedIcon style={{ height: "1.5rem" }} />
                ) : (
                  <DirectionsCarIcon style={{ height: "1.5rem" }} />
                )}

                <Typography variant="body1">{`${station.travelTime} минут`}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}

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
