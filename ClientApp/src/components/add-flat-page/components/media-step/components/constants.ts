import { StepProps } from "@mui/material";

export interface MediaStepFormikValues {
  photos: string[];
}

export interface MediaStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  initValues?: MediaStepFormikValues;
  setCommonMediaValues?: (values: MediaStepFormikValues) => void;
}
