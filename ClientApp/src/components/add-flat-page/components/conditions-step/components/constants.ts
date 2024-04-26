import { StepProps } from "@mui/material";

export enum CurrencyType {
  BYN = "BYN",
  USD = "USD",
  EUR = "EUR",
}

export enum RentType {
  NO = "Нет",
  HALF = "50%",
  FULL = "100%",
}

export enum RentalPeriodType {
  MONTH = "Месяц",
  TWO_MONTH = "2 Месяца",
  THREE_MONTH = "3 Месяца",
  HALF_YEAR = "Пол года",
  YEAR = "Год",
  LONG = "Длительный",
}

export enum PrepaymentType {
  WITHOUT = "Без предоплаты",
  MONTH = "Месяц",
  TWO_MONTH = "2 Месяца",
  THREE_MONTH = "3 Месяца",
  HALF_YEAR = "Пол года",
}

export enum PreferenceType {
  FOR_FAMILY = "Семье",
  FOR_STUDENTS = "Студентам",
  WITH_ANIMALS = "Можно с животными",
  NO_SMOKERS = "Не курящим",
}

export interface ConditionsStepFormikValues {
  currency?: CurrencyType;
  rentPrice?: number;
  rent?: RentType;
  rentalPeriod?: RentalPeriodType;
  prepayment?: PrepaymentType;
  preferences: PreferenceType[];
}

export interface ConditionsStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  setCommonConditionsValues?: (values: ConditionsStepFormikValues) => void;
}
