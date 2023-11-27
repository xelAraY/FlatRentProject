import React from "react";
import { Box, Grid } from "@mui/material";
import { NavMenu } from "./NavMenu";

export const Home = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            <NavMenu />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ border: "2px solid black" }}>
            <h2>Main content</h2>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ border: "2px solid black" }}>
            <h2>Footer</h2>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
