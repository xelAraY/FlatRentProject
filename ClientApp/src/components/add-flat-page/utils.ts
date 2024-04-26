import { AddFlatFormikValues } from "./constants";
import {
  getInitialGeneralStepValues,
  getInitialMapStepValues,
  getInitialAreaStepValues,
  getInitialAdditionalStepValues,
  getInitialConditionsStepValues,
  generalStepValidationSchema,
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
  };
};

export const addFlatPageValidationSchema = Yup.object().shape({
  general: generalStepValidationSchema,
  map: mapStepValidationSchema,
  area: areaStepValidationSchema,
  additional: additionalStepValidationSchema,
  conditions: conditionsStepValidationSchema,
});
