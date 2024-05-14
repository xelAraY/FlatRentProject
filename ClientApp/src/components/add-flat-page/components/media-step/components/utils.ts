import { MediaStepFormikValues } from "./constants";
import * as Yup from "yup";

export const getInitialMediaStepValues = (): MediaStepFormikValues => {
  return { photos: [] };
};

export const mediaStepValidationSchema = Yup.object().shape({
  photos: Yup.array().of(Yup.string()).nullable(),
});
