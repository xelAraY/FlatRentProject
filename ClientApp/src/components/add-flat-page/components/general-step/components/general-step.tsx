import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import { BalconyType, BathroomType, GeneralStepProps } from "./constants";
import { FormikControlMui } from "src/formik-control";
import { useFormikContext } from "formik";
import { GeneralStepFormikValues } from "./constants";

export const GeneralStep: React.FC<GeneralStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonGeneralValues,
}) => {
  const { values, setFieldTouched, setFieldValue, isValid } =
    useFormikContext<GeneralStepFormikValues>();

  React.useEffect(() => {
    setCommonGeneralValues?.(values);
  }, [values]);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <FormikControlMui name="roomsCount" label="Количество комнат" required>
        <Stack flexDirection="row" gap="0.5rem">
          {[
            "1к. квартира",
            "2к. квартира",
            "3к. квартира",
            "4к. квартира",
            "5к. квартира",
            "6+ комнат",
          ].map((value, index) => (
            <Button
              key={value}
              variant={
                values.roomsCount === index + 1 ? "contained" : "outlined"
              }
              onClick={() => {
                setFieldValue("roomsCount", index + 1);
                setTimeout(() => {
                  setFieldTouched("roomsCount", true);
                }, 500);
              }}
              size="large"
            >
              {value}
            </Button>
          ))}
        </Stack>
      </FormikControlMui>
      <Stack flexDirection="row" gap="1rem" width="100%">
        <FormikControlMui
          name="floor"
          label="Этаж"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите этаж" />
        </FormikControlMui>
        <FormikControlMui
          name="floorAmount"
          label="Этажность"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите этажность дома" />
        </FormikControlMui>
      </Stack>
      <Stack width="50%">
        <FormikControlMui
          name="constructionYear"
          label="Год постройки"
          sx={{ mr: "0.5rem" }}
        >
          <TextField placeholder="Введите год постройки" />
        </FormikControlMui>
      </Stack>
      <FormikControlMui name="bathroomType" label="Тип балкона">
        <Stack flexDirection="row" gap="0.5rem">
          {Object.values(BathroomType).map((value) => (
            <Button
              key={value}
              variant={values.bathroomType === value ? "contained" : "outlined"}
              onClick={() => {
                setFieldValue("bathroomType", value);
                setTimeout(() => {
                  setFieldTouched("bathroomType", true);
                }, 500);
              }}
              size="large"
            >
              {value}
            </Button>
          ))}
        </Stack>
      </FormikControlMui>
      <FormikControlMui name="balconyType" label="Тип санузла">
        <Stack flexDirection="row" gap="0.5rem">
          {Object.values(BalconyType).map((value) => (
            <Button
              key={value}
              variant={values.balconyType === value ? "contained" : "outlined"}
              onClick={() => {
                setFieldValue("balconyType", value);
                setTimeout(() => {
                  setFieldTouched("balconyType", true);
                }, 500);
              }}
              size="large"
            >
              {value}
            </Button>
          ))}
        </Stack>
      </FormikControlMui>
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
