import React from "react";
import { FormHelperText as MuiFormHelperText } from "@mui/material";

export interface FormHelperTextProps {
  helpText: string;
}

const FormHelperText: React.FC<FormHelperTextProps> = ({ helpText }) => {
  return (
    <MuiFormHelperText
      sx={{
        ml: 0,
        mt: "0.5rem",
        color: "black",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      }}
    >
      {helpText}
    </MuiFormHelperText>
  );
};

export default FormHelperText;
