import { FormControlProps as FormControlPropsMui } from "@mui/material";

export interface FormControlMuiProps
  extends Omit<FormControlPropsMui, "error"> {
  label?: string;
  helpText?: string;
  error?: string;
  requiredError?: boolean;
  fullWidth?: boolean;
  additionalError?: React.ReactElement;
}
