import React from "react";
import { Stack, Typography } from "@mui/material";

export interface FormControlLabelProps {
  label: string;
  error: boolean;
  required?: boolean;
}

const FormControlLabel: React.FC<FormControlLabelProps> = ({
  label,
  error,
  required,
}) => {
  return (
    <Stack flexDirection="row" pb="0.5rem">
      <Typography variant="subtitle2">{label}</Typography>
      &nbsp;
      {required && (
        <Typography
          variant="subtitle2"
          color={`${error ? "error" : "black"}`}
          sx={{ opacity: `${error ? "1" : "0.5"}` }}
        >
          {"(required)"}
        </Typography>
      )}
    </Stack>
  );
};

export default FormControlLabel;
