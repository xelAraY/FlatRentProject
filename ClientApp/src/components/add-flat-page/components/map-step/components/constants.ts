import { StepProps } from "@mui/material";

export enum WayType {
  BYFOOT = "Пешком",
  ONTRANSPORT = "На транспорте",
}

export interface MetroParams {
  station: string;
  wayType: WayType;
  minutes: number;
}

export interface MapStepFormikValues {
  region?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  coordinates?: [number, number];
  metroParams?: MetroParams[];
}

export interface MapStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  setCommonMapValues?: (values: MapStepFormikValues) => void;
}
