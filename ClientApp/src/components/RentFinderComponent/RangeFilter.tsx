import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

interface RangeFilterProps {
  fieldsName: string;
}

export const RangeFilter = ({ fieldsName }: RangeFilterProps) => {
  return (
    <Stack gap={1} marginTop={2}>
      <Typography variant="body1" fontWeight={600}>{fieldsName}</Typography>
      <Stack flexDirection={"row"} alignItems={"center"} gap={2} flexWrap="wrap">
        <TextField label="От" variant="outlined" size="small" style={{ width: "170px" }} />
        <TextField label="До" variant="outlined" size="small" style={{ width: "170px" }} />
      </Stack>
    </Stack>
  );
}