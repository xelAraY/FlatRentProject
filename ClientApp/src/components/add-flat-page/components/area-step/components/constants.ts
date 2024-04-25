import { StepProps } from "@mui/material";

export interface AreaStepFormikValues {
  totalArea?: number;
  livingArea?: number;
  kitchenArea?: number;
}

export interface AreaStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  setCommonAreaValues?: (values: AreaStepFormikValues) => void;
}
