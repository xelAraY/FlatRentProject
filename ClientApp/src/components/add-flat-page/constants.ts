import {
  AreaStepFormikValues,
  MediaStepFormikValues,
  MapStepFormikValues,
  AdditionalStepFormikValues,
  DescriptionStepFormikValues,
  ContactsStepFormikValues,
  GeneralStepFormikValues,
} from "./components";
import { ConditionsStepFormikValues } from "./components/conditions-step";

export interface AddFlatFormikValues {
  general: GeneralStepFormikValues;
  map: MapStepFormikValues;
  area: AreaStepFormikValues;
  additional: AdditionalStepFormikValues;
  conditions: ConditionsStepFormikValues;
  description: DescriptionStepFormikValues;
  contactsInfo: ContactsStepFormikValues;
  media: MediaStepFormikValues;
}
