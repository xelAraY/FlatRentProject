import { AddFlatFormikValues } from "./constants";
import {
  getInitialGeneralStepValues,
  getInitialDescriptionStepValues,
  getInitialMapStepValues,
  getInitialAreaStepValues,
  getInitialAdditionalStepValues,
  getInitialConditionsStepValues,
  generalStepValidationSchema,
  descriptionStepValidationSchema,
  mapStepValidationSchema,
  areaStepValidationSchema,
  additionalStepValidationSchema,
  conditionsStepValidationSchema,
} from "./components";
import * as Yup from "yup";

export const getInitialValues = (): AddFlatFormikValues => {
  return {
    general: { ...getInitialGeneralStepValues() },
    map: { ...getInitialMapStepValues() },
    area: { ...getInitialAreaStepValues() },
    additional: { ...getInitialAdditionalStepValues() },
    conditions: { ...getInitialConditionsStepValues() },
    description: { ...getInitialDescriptionStepValues() },
  };
};

export const addFlatPageValidationSchema = Yup.object().shape({
  general: generalStepValidationSchema,
  map: mapStepValidationSchema,
  area: areaStepValidationSchema,
  additional: additionalStepValidationSchema,
  conditions: conditionsStepValidationSchema,
  description: descriptionStepValidationSchema,
});
