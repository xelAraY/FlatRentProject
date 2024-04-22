import { StepProps } from "@mui/material";

export enum BathroomType {
  COMBINED = "Совмещенный",
  SEPARATE = "Раздельный",
  TwoAndMore = "2 и более",
}

export enum BalconyType {
  LOGGIA = "Лоджия",
  BALCONY = "Балкон",
  NOTHING = "Нет",
}

export interface GeneralStepFormikValues {
  roomsCount?: number;
  floor?: number;
  floorAmount?: number;
  constructionYear?: number;
  bathroomType?: BathroomType;
  balconyType?: BalconyType;
}

export interface GeneralStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  setCommonGeneralValues?: (values: GeneralStepFormikValues) => void;
}
