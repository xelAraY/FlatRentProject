import {
  Box,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { Button } from "src/shared";

const GeneralTab: React.FC = () => {
  const [roomsCountButton, setRoomsCountButton] = React.useState<
    number | undefined
  >();

  const handleChange = (buttonNumber: number) => {
    setRoomsCountButton(buttonNumber);
  };

  return (
    <Paper elevation={0}>
      <Typography variant="subtitle1" mb="0.5rem">
        Количество комнат
      </Typography>
      <Stack flexDirection="row" gap="0.5rem">
        <Button
          variant={roomsCountButton === 0 ? "contained" : "outlined"}
          onClick={() => handleChange(0)}
        >
          Комната
        </Button>
        <Button
          variant={roomsCountButton === 1 ? "contained" : "outlined"}
          onClick={() => handleChange(1)}
        >
          1к квартира
        </Button>
        <Button
          variant={roomsCountButton === 2 ? "contained" : "outlined"}
          onClick={() => handleChange(2)}
        >
          2к квартира
        </Button>
        <Button
          variant={roomsCountButton === 3 ? "contained" : "outlined"}
          onClick={() => handleChange(3)}
        >
          3к квартира
        </Button>
        <Button
          variant={roomsCountButton === 4 ? "contained" : "outlined"}
          onClick={() => handleChange(4)}
        >
          4к квартира
        </Button>
        <Button
          variant={roomsCountButton === 5 ? "contained" : "outlined"}
          onClick={() => handleChange(5)}
        >
          5+ комнат
        </Button>
      </Stack>
    </Paper>
  );
};

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

function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (e: any) => {
    e?.stopPropagation();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e: any) => {
    e?.stopPropagation();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={
              {
                // "& .MuiStepIcon-root": {
                //   color: "green !important",
                // },
              }
            }
            completed={false}
            onClick={() => setActiveStep(index)}
          >
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <GeneralTab />
              <Box sx={{ mb: 2 }}>
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
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper
          elevation={2}
          sx={{ p: 3, background: "rgba(32, 160, 32, 0.238)" }}
        >
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export const AddListingPage = () => {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiButton: {
            defaultProps: {
              variant: "outlined",
              color: "success",
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
        <VerticalLinearStepper />
      </Paper>
    </ThemeProvider>
  );
};
