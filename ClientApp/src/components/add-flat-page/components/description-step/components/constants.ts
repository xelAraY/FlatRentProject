import { StepProps } from "@mui/material";

export interface DescriptionStepFormikValues {
  title: string;
  description: string;
}

export interface DescriptionStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  setCommonDescriptionValues?: (values: DescriptionStepFormikValues) => void;
}
