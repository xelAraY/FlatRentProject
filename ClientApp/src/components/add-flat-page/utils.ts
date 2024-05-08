import { AddFlatFormikValues } from "./constants";
import {
  getInitialGeneralStepValues,
  getInitialDescriptionStepValues,
  getInitialMapStepValues,
  getInitialAreaStepValues,
  getInitialAdditionalStepValues,
  getInitialConditionsStepValues,
  getInitialContactsStepValues,
  getInitialMediaStepValues,
  generalStepValidationSchema,
  descriptionStepValidationSchema,
  mapStepValidationSchema,
  areaStepValidationSchema,
  additionalStepValidationSchema,
  conditionsStepValidationSchema,
  contactsStepValidationSchema,
  mediaStepValidationSchema,
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
    contactsInfo: { ...getInitialContactsStepValues() },
    media: { ...getInitialMediaStepValues() },
  };
};

export const addFlatPageValidationSchema = Yup.object().shape({
  general: generalStepValidationSchema,
  map: mapStepValidationSchema,
  area: areaStepValidationSchema,
  additional: additionalStepValidationSchema,
  conditions: conditionsStepValidationSchema,
  description: descriptionStepValidationSchema,
  contactsInfo: contactsStepValidationSchema,
  media: mediaStepValidationSchema,
});
