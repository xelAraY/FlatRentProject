import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import {
  ContactsStepFormikValues,
  ContactsStepProps,
} from "./components/constants";
import {
  contactsStepValidationSchema,
  getInitialContactsStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { ContactsStep } from "./components";
import { AddFlatFormikValues } from "../../constants";

export const ContactsStepWrapper: React.FC<ContactsStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  ...other
}) => {
  const { setFieldValue } = useFormikContext<AddFlatFormikValues>();

  return (
    <Formik<ContactsStepFormikValues>
      initialValues={getInitialContactsStepValues()}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={contactsStepValidationSchema}
      validateOnMount
      validateOnChange
      validateOnBlur
    >
      {({ isValid, touched }) => {
        return (
          <Form>
            <Step completed={isValid} {...other}>
              <StepLabel
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(myIndex);
                }}
                error={
                  currentStepIndex !== myIndex &&
                  !isValid &&
                  !!Object.keys(touched).length
                }
              >
                {"Контакты"}
              </StepLabel>
              <StepContent>
                <ContactsStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                  setCommonContactsValues={(newValues) =>
                    setFieldValue("contacts", newValues)
                  }
                />
              </StepContent>
            </Step>
          </Form>
        );
      }}
    </Formik>
  );
};
