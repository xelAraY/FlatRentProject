import { AdditionalStepFormikValues } from "./constants";
import * as Yup from "yup";

export const getInitialAdditionalStepValues =
  (): AdditionalStepFormikValues => {
    return { appliances: [], facilities: [] };
  };

export const additionalStepValidationSchema = Yup.object().shape({
  furnitureType: Yup.string().nullable(),
  plateType: Yup.string().nullable(),
  facilities: Yup.array().of(Yup.string()).nullable(),
  appliances: Yup.array().of(Yup.string()).nullable(),
});
