import React from "react";
import { Stack, Typography } from "@mui/material";

export interface FormControlLabelProps {
  label: string;
  required?: boolean;
}

const FormControlLabel: React.FC<FormControlLabelProps> = ({
  label,
  required,
}) => {
  return (
    <Stack flexDirection="row" pb="0.5rem">
      <Typography variant="subtitle1">{label}</Typography>
      &nbsp;
      {required && (
        <Typography
          variant="subtitle2"
          color={"error"}
          fontSize={"1.5rem"}
          lineHeight="1.45rem"
        >
          {"*"}
        </Typography>
      )}
    </Stack>
  );
};

export default FormControlLabel;
