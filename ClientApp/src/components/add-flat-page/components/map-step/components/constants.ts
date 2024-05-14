import { StepProps } from "@mui/material";

export enum WayType {
  BYFOOT = "Пешком",
  ONTRANSPORT = "На транспорте",
}

export interface MetroStationParams {
  name: string;
  color: "error" | "primary" | "success";
}

export interface MetroParams {
  station?: MetroStationParams;
  wayType?: WayType;
  minutes?: number;
}

export interface MapStepFormikValues {
  region?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  district?: string;
  microDistrict?: string;
  coordinates?: [number, number];
  metroParams?: MetroParams[];
}

export interface MapStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  initValues?: MapStepFormikValues;
  setCommonMapValues?: (values: MapStepFormikValues) => void;
}
