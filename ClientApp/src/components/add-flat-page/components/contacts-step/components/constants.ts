import { StepProps } from "@mui/material";

export interface Contact {
  phone: string;
  name: string;
  email: string;
}

export interface ContactsStepFormikValues {
  contacts: Contact[];
}

export interface ContactsStepProps extends StepProps {
  setActiveStep: (step: number) => void;
  currentStepIndex: number;
  myIndex: number;
  initValues?: ContactsStepFormikValues;
  setCommonContactsValues?: (values: ContactsStepFormikValues) => void;
}
