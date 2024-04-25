import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import { AreaStepProps } from "./constants";
import { FormikControlMui } from "src/formik-control";
import { useFormikContext } from "formik";
import { AreaStepFormikValues } from "./constants";

export const AreaStep: React.FC<AreaStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonAreaValues,
}) => {
  const { values, setFieldTouched, setFieldValue, isValid } =
    useFormikContext<AreaStepFormikValues>();

  React.useEffect(() => {
    setCommonAreaValues?.(values);
  }, [values]);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <Stack gap="1rem" width="100%">
        <FormikControlMui
          name="totalArea"
          label="Площадь общая, м²"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите общую площадь" />
        </FormikControlMui>
        <FormikControlMui
          name="livingArea"
          label="Площадь жилая, м²"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите жилую площадь" />
        </FormikControlMui>
        <FormikControlMui
          name="kitchenArea"
          label="Площадь кухни, м²"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите площадь кухни" />
        </FormikControlMui>
      </Stack>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex + 1);
            }}
            type="submit"
            sx={{ mt: 1, mr: 1 }}
          >
            Далее
          </Button>
          <Button
            disabled={currentStepIndex === 0}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex - 1);
            }}
            sx={{ mt: 1, mr: 1 }}
          >
            Назад
          </Button>
        </div>
      </Box>
    </Paper>
  );
};
