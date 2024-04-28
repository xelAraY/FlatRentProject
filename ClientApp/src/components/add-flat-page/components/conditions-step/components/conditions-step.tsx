import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import {
  ConditionsStepProps,
  CurrencyType,
  PreferenceType,
  PrepaymentType,
  RentType,
  RentalPeriodType,
} from "./constants";
import { FormikControlMui } from "src/formik-control";
import { useFormikContext } from "formik";
import { ConditionsStepFormikValues } from "./constants";

export const ConditionsStep: React.FC<ConditionsStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonConditionsValues,
}) => {
  const { values, setFieldTouched, setFieldValue, isValid } =
    useFormikContext<ConditionsStepFormikValues>();

  React.useEffect(() => {
    console.log(values);
    setCommonConditionsValues?.(values);
  }, [values]);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <FormikControlMui name="currency" label="Валюта" required>
        <Stack flexDirection="row" gap="0.5rem" flexWrap={"wrap"}>
          {Object.values(CurrencyType).map((value) => (
            <Button
              key={value}
              onClick={() => {
                setFieldValue("currency", value);
                setTimeout(() => {
                  setFieldTouched("currency", true);
                }, 500);
              }}
              sx={{
                fontSize: "14px",
                backgroundColor:
                  values.currency === value ? "#1976d2" : "#ffffff",
                color: values.currency === value ? "white" : "#2b98e1",
                padding: "8px 16px",
                ":hover": {
                  backgroundColor:
                    values.currency === value ? "#1565c0" : "#f6fafd",
                  transition: "0.5s",
                },
              }}
              size="large"
            >
              {value}
            </Button>
          ))}
        </Stack>
      </FormikControlMui>
      <FormikControlMui
        name="rentPrice"
        label="Цена"
        sx={{ width: "50%" }}
        required
      >
        <TextField
          placeholder="Введите цену"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {values.currency}
              </InputAdornment>
            ),
          }}
        />
      </FormikControlMui>
      <FormikControlMui name="rent" label="Коммунальные платежи" required>
        <Stack flexDirection="row" gap="0.5rem">
          {Object.values(RentType).map((value) => (
            <Box>
              <Button
                key={value}
                onClick={() => {
                  setFieldValue(
                    "rent",
                    values.rent === value ? undefined : value
                  );
                  setTimeout(() => {
                    setFieldTouched("rent", true);
                  }, 500);
                }}
                sx={{
                  backgroundColor:
                    values.rent === value ? "#1976d2" : "#ffffff",
                  color: values.rent === value ? "white" : "#2b98e1",
                  padding: "8px 16px",
                  ":hover": {
                    backgroundColor:
                      values.rent === value ? "#1565c0" : "#f6fafd",
                    transition: "0.5s",
                  },
                }}
                size="large"
              >
                {value}
              </Button>
            </Box>
          ))}
        </Stack>
      </FormikControlMui>
      <FormikControlMui name="rentalPeriod" label="Срок сдачи" required>
        <Stack flexDirection="row" gap="0.5rem" flexWrap={"wrap"}>
          {Object.values(RentalPeriodType).map((value) => (
            <Button
              key={value}
              onClick={() => {
                setFieldValue(
                  "rentalPeriod",
                  values.rentalPeriod === value ? undefined : value
                );
                setTimeout(() => {
                  setFieldTouched("rentalPeriod", true);
                }, 500);
              }}
              sx={{
                backgroundColor:
                  values.rentalPeriod === value ? "#1976d2" : "#ffffff",
                color: values.rentalPeriod === value ? "white" : "#2b98e1",
                padding: "8px 16px",
                ":hover": {
                  backgroundColor:
                    values.rentalPeriod === value ? "#1565c0" : "#f6fafd",
                  transition: "0.5s",
                },
              }}
              size="large"
            >
              {value}
            </Button>
          ))}
        </Stack>
      </FormikControlMui>
      <FormikControlMui name="prepayment" label="Предоплата">
        <Stack flexDirection="row" gap="0.5rem">
          {Object.values(PrepaymentType).map((value) => (
            <Box>
              <Button
                key={value}
                onClick={() => {
                  setFieldValue(
                    "prepayment",
                    value === values.prepayment ? undefined : value
                  );
                  setTimeout(() => {
                    setFieldTouched("prepayment", true);
                  }, 500);
                }}
                sx={{
                  backgroundColor:
                    values.prepayment === value ? "#1976d2" : "#ffffff",
                  color: values.prepayment === value ? "white" : "#2b98e1",
                  padding: "8px 16px",
                  ":hover": {
                    backgroundColor:
                      values.prepayment === value ? "#1565c0" : "#f6fafd",
                    transition: "0.5s",
                  },
                }}
                size="large"
              >
                {value}
              </Button>
            </Box>
          ))}
        </Stack>
      </FormikControlMui>
      <FormikControlMui name="preferences" label="Предпочтения по сдаче">
        <Stack flexDirection="row" gap="0.5rem" flexWrap={"wrap"}>
          {Object.values(PreferenceType).map((value) => (
            <Button
              key={value}
              onClick={() => {
                let preferences = values.preferences;
                if (preferences?.includes(value)) {
                  preferences = preferences.filter((item) => item !== value);
                } else {
                  preferences = [...preferences, value];
                }
                setFieldValue("preferences", preferences);
                setTimeout(() => {
                  setFieldTouched("preferences", true);
                }, 500);
              }}
              sx={{
                backgroundColor: values.preferences?.includes(value)
                  ? "#1976d2"
                  : "#ffffff",
                color: values.preferences?.includes(value)
                  ? "white"
                  : "#2b98e1",
                padding: "8px 16px",
                ":hover": {
                  backgroundColor: values.preferences?.includes(value)
                    ? "#1565c0"
                    : "#f6fafd",
                  transition: "0.5s",
                },
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
