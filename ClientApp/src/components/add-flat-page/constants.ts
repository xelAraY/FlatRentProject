import {
  AreaStepFormikValues,
  GeneralStepFormikValues,
  MapStepFormikValues,
} from "./components";

export interface AddFlatFormikValues {
  general: GeneralStepFormikValues;
  map: MapStepFormikValues;
  area: AreaStepFormikValues;
}
