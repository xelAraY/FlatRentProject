import { FormControlLabel, Stack, Switch } from "@mui/material";
import React from "react";

interface SwitchFilterProps {
  switchName: string;
}

export const SwitchFilter = ({ switchName }: SwitchFilterProps) => {
  return (
    <Stack flexDirection={"row"} gap={2} marginTop={2}>
      <FormControlLabel control={<Switch defaultChecked />} label={switchName} />
    </Stack>
  );
}