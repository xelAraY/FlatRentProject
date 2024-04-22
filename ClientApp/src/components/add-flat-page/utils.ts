import { AddFlatFormikValues } from "./constants";
import {
  getInitialGeneralStepValues,
  getInitialMapStepValues,
  generalStepValidationSchema,
  mapStepValidationSchema,
} from "./components";
import * as Yup from "yup";

export const getInitialValues = (): AddFlatFormikValues => {
  return {
    general: { ...getInitialGeneralStepValues() },
    map: { ...getInitialMapStepValues() },
  };
};

export const addFlatPageValidationSchema = Yup.object().shape({
  general: generalStepValidationSchema,
  map: mapStepValidationSchema,
});
