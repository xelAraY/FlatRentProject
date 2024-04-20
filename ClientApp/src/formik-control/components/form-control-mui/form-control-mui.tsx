import React from "react";
import { FormControl } from "@mui/material";
import {
  FormControlLabel,
  FormHelperText,
  FormWarningMessage,
} from "./components";
import { FormControlMuiProps } from "../../duck";

const FormControlMui: React.FC<FormControlMuiProps> = ({
  label,
  required,
  requiredError,
  helpText,
  error,
  children,
  additionalError,
  ...otherProps
}) => {
  return (
    <FormControl {...otherProps}>
      {label && <FormControlLabel label={label} required={required} />}
      {children}
      {helpText && <FormHelperText helpText={helpText} />}
      {error && (
        <FormWarningMessage error={error} additionalError={additionalError} />
      )}
    </FormControl>
  );
};

export default FormControlMui;
