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
      {({ isValid }) => {
        return (
          <Form onClick={(e) => e.stopPropagation()}>
            <Step
              completed={isValid}
              // onClick={(e) => {
              //   e.stopPropagation();
              //   e.preventDefault();
              //   setActiveStep(currentStepIndex);
              // }}
              {...other}
            >
              <StepLabel
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {"Общая информация"}
              </StepLabel>
              <StepContent>
                <GeneralStep
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
