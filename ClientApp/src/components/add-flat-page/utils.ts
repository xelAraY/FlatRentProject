import { AddFlatFormikValues } from "./constants";
import {
  getInitialGeneralStepValues,
  getInitialMapStepValues,
  getInitialAreaStepValues,
  generalStepValidationSchema,
  mapStepValidationSchema,
  areaStepValidationSchema,
} from "./components";
import * as Yup from "yup";

export const getInitialValues = (): AddFlatFormikValues => {
  return {
    general: { ...getInitialGeneralStepValues() },
    map: { ...getInitialMapStepValues() },
    area: { ...getInitialAreaStepValues() },
  };
};

export const addFlatPageValidationSchema = Yup.object().shape({
  general: generalStepValidationSchema,
  map: mapStepValidationSchema,
  area: areaStepValidationSchema,
});
