import {
  AreaStepFormikValues,
  GeneralStepFormikValues,
  MapStepFormikValues,
  AdditionalStepFormikValues,
} from "./components";
import { ConditionsStepFormikValues } from "./components/conditions-step";

export interface AddFlatFormikValues {
  general: GeneralStepFormikValues;
  map: MapStepFormikValues;
  area: AreaStepFormikValues;
  additional: AdditionalStepFormikValues;
  conditions: ConditionsStepFormikValues;
}
