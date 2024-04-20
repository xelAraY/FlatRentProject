import React from "react";
import { Stack, FormHelperText as MuiFormHelperText, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export interface FormWarningMessageProps {
  error: string;
  additionalError?: React.ReactElement;
}

const FormWarningMessage: React.FC<FormWarningMessageProps> = ({
  error,
  additionalError,
}) => {
  return (
    <MuiFormHelperText
      error
      component={"span"}
      sx={{
        display: "flex",
        gap: "0.25rem",
        alignItems: "center",
        ml: 0,
        mt: "0.5rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      }}
    >
      <Stack flexShrink="0">
        <WarningIcon fontSize="small" />
      </Stack>
      <Box flexWrap="wrap">
        {error}
        {additionalError}
      </Box>
    </MuiFormHelperText>
  );
};

export default FormWarningMessage;
