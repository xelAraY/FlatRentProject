import { AddFlatFormikValues } from "./constants";
import { getInitialGeneralStepValues } from "./components";

export const getInitialValues = (): AddFlatFormikValues => {
  return {
    ...getInitialGeneralStepValues(),
  };
};
