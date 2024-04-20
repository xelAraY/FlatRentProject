import {
  Box,
  Paper,
  Stepper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { Button } from "src/shared";
import { GeneralStepWrapper } from "./components";
import { Formik } from "formik";
import { AddFlatFormikValues } from "./constants";
import { getInitialValues } from "./utils";

const steps = [
  {
    label: "Общая информация",
  },
  {
    label: "Карта",
  },
  {
    label: "Фото объекта",
  },
  {
    label: "Дополнительная информация",
  },
  {
    label: "Предпросмотр",
  },
];

export const AddFlatPageWrapper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiButton: {
            defaultProps: {
              variant: "outlined",
            },
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },
      })}
    >
      <Paper variant="outlined" sx={{ p: "1rem" }}>
        <Formik<AddFlatFormikValues>
          initialValues={getInitialValues()}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
              <GeneralStepWrapper
                currentStepIndex={1}
                setActiveStep={setActiveStep}
              />
              {/* <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box> */}
            </Stepper>
            {activeStep === steps.length && (
              <Paper
                elevation={2}
                sx={{ p: 3, background: "rgba(32, 160, 32, 0.238)" }}
              >
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </Formik>
      </Paper>
    </ThemeProvider>
  );
};
