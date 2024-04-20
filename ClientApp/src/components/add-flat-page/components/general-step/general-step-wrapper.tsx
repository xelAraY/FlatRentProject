import { Form, Formik } from "formik";
import React from "react";
import {
  GeneralStepFormikValues,
  GeneralStepProps,
} from "./components/constants";
import {
  generalStepValidationSchema,
  getInitialGeneralStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { GeneralStep } from "./components";

export const GeneralStepWrapper: React.FC<GeneralStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  ...other
}) => {
  return (
    <Formik<GeneralStepFormikValues>
      initialValues={getInitialGeneralStepValues()}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={generalStepValidationSchema}
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
                {"Общая информация"}
              </StepLabel>
              <StepContent>
                <GeneralStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                />
              </StepContent>
            </Step>
          </Form>
        );
      }}
    </Formik>
  );
};
