import { DescriptionStepFormikValues } from "./constants";
import * as Yup from "yup";

export const getInitialDescriptionStepValues =
  (): DescriptionStepFormikValues => {
    return { title: "", description: "" };
  };

export const descriptionStepValidationSchema = Yup.object().shape({
  title: Yup.string().max(100, "Превышен лимит символов").nullable(),
  description: Yup.string().max(500, "Превышен лимит символов").nullable(),
});
