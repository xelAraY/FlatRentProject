import React, { useRef } from "react";
import { Box, Grid, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { Address, RentObject } from "src/interfaces/RentObj";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import { Button, MetroSvg, SingleObjectMap } from "src/shared";
import { InfoRow } from "../info-row";

interface ApplianciesPaperProps {
  appliancies?: string[];
  title: string;
}

const ApplianciesPaper: React.FC<ApplianciesPaperProps> = ({
  appliancies,
  title,
}) => {
  return appliancies?.length ? (
    <Paper
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
        {title}
      </Typography>

      <Grid container spacing="0.5rem">
        {appliancies.map((appl, index) => (
          <Grid item sm={6} lg={4} key={`${appl}-${index}`}>
            <Typography variant="subtitle1" lineHeight="1.5rem">
              {appl}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  ) : (
    <></>
  );
};

export default ApplianciesPaper;
