import React from "react";
import { Stack, Typography } from "@mui/material";

export interface FormControlLabelProps {
  label: string;
  required?: boolean;
  icon?: React.ReactElement;
}

const FormControlLabel: React.FC<FormControlLabelProps> = ({
  label,
  required,
  icon,
}) => {
  return (
    <Stack flexDirection="row" pb="0.5rem" alignItems={"center"}>
      <Typography variant="subtitle1">{label}</Typography>
      {required && (
        <Typography
          variant="subtitle2"
          color={"error"}
          fontSize={"1.5rem"}
          lineHeight="1.45rem"
        >
          &nbsp;{"*"}
        </Typography>
      )}
      {icon}
      {/* {icon && <Icon />} */}
    </Stack>
  );
};

export default FormControlLabel;
