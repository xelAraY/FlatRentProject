import { StepProps } from "@mui/material";

export enum FurnitureType {
  YES = "Есть",
  NO = "Нет",
}

export enum PlateType {
  GAS = "Газовая",
  ELECTRIC = "Электрическая",
}

export interface AdditionalStepFormikValues {
  furnitureType?: FurnitureType;
  plateType?: PlateType;
  facilities: string[];
  appliances: string[];
}

export interface AdditionalStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  initValues?: AdditionalStepFormikValues;
  setCommonAdditionalValues?: (values: AdditionalStepFormikValues) => void;
}
