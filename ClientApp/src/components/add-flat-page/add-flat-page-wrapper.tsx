import { Box, Paper, Stepper, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { Button } from "src/shared";
import {
  AdditionalStepWrapper,
  AreaStepWrapper,
  ConditionsStepWrapper,
  ContactsStepWrapper,
  DescriptionStepWrapper,
  GeneralStepWrapper,
  MapStepWrapper,
  MediaStepWrapper,
} from "./components";
import { Form, Formik } from "formik";
import { AddFlatFormikValues } from "./constants";
import { addFlatPageValidationSchema, getInitialValues } from "./utils";

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
  const [activeStep, setActiveStep] = React.useState(-1);

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
          MuiAutocomplete: {
            styleOverrides: {
              popper: {
                maxHeight: "20rem",
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
          validationSchema={addFlatPageValidationSchema}
          validateOnMount
          validateOnChange
          validateOnBlur
        >
          {({ isValid }) => {
            return (
              <Form>
                <Box>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) =>
                      index === 0 ? (
                        <GeneralStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : index === 1 ? (
                        <MapStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : index === 2 ? (
                        <AreaStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : index === 3 ? (
                        <MediaStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : index === 4 ? (
                        <ConditionsStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : index === 5 ? (
                        <DescriptionStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : index === 6 ? (
                        <AdditionalStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : index === 7 ? (
                        <ContactsStepWrapper
                          key={index}
                          myIndex={index}
                          currentStepIndex={activeStep}
                          setActiveStep={setActiveStep}
                        />
                      ) : (
                        <></>
                      )
                    )}
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
                  {/* {activeStep === steps.length && (
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
                  )} */}
                  <Button disabled={!isValid}>Сохранить и продолжить</Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </ThemeProvider>
  );
};
