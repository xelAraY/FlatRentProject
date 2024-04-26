import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { AdditionalStepProps, FurnitureType, PlateType } from "./constants";
import { FormikControlMui } from "src/formik-control";
import { useFormikContext } from "formik";
import { AdditionalStepFormikValues } from "./constants";

export const AdditionalStep: React.FC<AdditionalStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonAdditionalValues,
}) => {
  const { values, setFieldTouched, setFieldValue, isValid } =
    useFormikContext<AdditionalStepFormikValues>();
  const [appliances, setAppliances] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);

  React.useEffect(() => {
    console.log(values);
    setCommonAdditionalValues?.(values);
  }, [values]);

  React.useEffect(() => {
    return () => {
      setFieldTouched("appliances", true);
      console.log("setTouched");
    };
  }, []);

  React.useEffect(() => {
    const getAllAppliances = async () => {
      try {
        const applResponce = await fetch("api/addNewListing/getAllAppliances");
        const applData: { name: string }[] = await applResponce.json();
        if (applResponce.ok) {
          setAppliances(applData.map((item) => item.name));
        } else {
          console.log("Ошибка");
        }

        const facilitiResponce = await fetch(
          "api/addNewListing/getAllAppliances"
        );
        const facilitiData: { name: string }[] = await facilitiResponce.json();
        if (applResponce.ok) {
          setAppliances(facilitiData.map((item) => item.name));
        } else {
          console.log("Ошибка");
        }
      } catch (error) {
        console.error("Ошибка ", error);
      }
    };

    const getAllFacilities = async () => {
      try {
        const facilitiResponce = await fetch(
          "api/addNewListing/getAllFacilities"
        );
        const facilitiData: { name: string }[] = await facilitiResponce.json();
        if (facilitiResponce.ok) {
          setFacilities(facilitiData.map((item) => item.name));
        } else {
          console.log("Ошибка");
        }
      } catch (error) {
        console.error("Ошибка ", error);
      }
    };
    getAllAppliances();
    getAllFacilities();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <FormikControlMui name="appliances" label="Бытовая техника">
        <Stack flexDirection="row" gap="0.5rem" flexWrap={"wrap"}>
          {appliances.map((value) => (
            <Button
              key={value}
              onClick={() => {
                let appliances = values.appliances;
                if (appliances?.includes(value)) {
                  appliances = appliances.filter((item) => item !== value);
                } else {
                  appliances = [...appliances, value];
                }

                setFieldValue("appliances", appliances);
                setTimeout(() => {
                  setFieldTouched("appliances", true);
                }, 500);
              }}
              sx={{
                backgroundColor: values.appliances?.includes(value)
                  ? "#1976d2"
                  : "#ffffff",
                color: values.appliances?.includes(value) ? "white" : "#2b98e1",
                padding: "8px 16px",
                ":hover": {
                  backgroundColor: values.appliances?.includes(value)
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
      <FormikControlMui name="furnitureType" label="Мебель">
        <Stack flexDirection="row" gap="0.5rem">
          {Object.values(FurnitureType).map((value) => (
            <Box>
              <Button
                key={value}
                onClick={() => {
                  setFieldValue(
                    "furnitureType",
                    value === values.furnitureType ? undefined : value
                  );
                  setTimeout(() => {
                    setFieldTouched("furnitureType", true);
                  }, 500);
                }}
                sx={{
                  backgroundColor:
                    values.furnitureType === value ? "#1976d2" : "#ffffff",
                  color: values.furnitureType === value ? "white" : "#2b98e1",
                  padding: "8px 16px",
                  ":hover": {
                    backgroundColor:
                      values.furnitureType === value ? "#1565c0" : "#f6fafd",
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
      <FormikControlMui name="facilities" label="Удобства">
        <Stack flexDirection="row" gap="0.5rem" flexWrap={"wrap"}>
          {facilities.map((value) => (
            <Button
              key={value}
              onClick={() => {
                let facilities = values.facilities;
                if (facilities?.includes(value)) {
                  facilities = facilities.filter((item) => item !== value);
                } else {
                  facilities = [...facilities, value];
                }
                setFieldValue("facilities", facilities);
                setTimeout(() => {
                  setFieldTouched("facilities", true);
                }, 500);
              }}
              sx={{
                backgroundColor: values.facilities?.includes(value)
                  ? "#1976d2"
                  : "#ffffff",
                color: values.facilities?.includes(value) ? "white" : "#2b98e1",
                padding: "8px 16px",
                ":hover": {
                  backgroundColor: values.facilities?.includes(value)
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
      <FormikControlMui name="plateType" label="Плита">
        <Stack flexDirection="row" gap="0.5rem">
          {Object.values(PlateType).map((value) => (
            <Box>
              <Button
                key={value}
                onClick={() => {
                  setFieldValue(
                    "plateType",
                    value === values.plateType ? undefined : value
                  );
                  setTimeout(() => {
                    setFieldTouched("plateType", true);
                  }, 500);
                }}
                sx={{
                  backgroundColor:
                    value === values.plateType ? "#1976d2" : "#ffffff",
                  color: value === values.plateType ? "white" : "#2b98e1",
                  padding: "8px 16px",
                  ":hover": {
                    backgroundColor:
                      value === values.plateType ? "#1565c0" : "#f6fafd",
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
