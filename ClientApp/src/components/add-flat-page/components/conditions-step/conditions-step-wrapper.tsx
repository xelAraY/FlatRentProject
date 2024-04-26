import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import {
  ConditionsStepFormikValues,
  ConditionsStepProps,
} from "./components/constants";
import {
  conditionsStepValidationSchema,
  getInitialConditionsStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { ConditionsStep } from "./components";
import { AddFlatFormikValues } from "../../constants";

export const ConditionsStepWrapper: React.FC<ConditionsStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  ...other
}) => {
  const { setFieldValue, values } = useFormikContext<AddFlatFormikValues>();

  return (
    <Formik<ConditionsStepFormikValues>
      initialValues={getInitialConditionsStepValues()}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={conditionsStepValidationSchema}
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
                {"Условия сдачи"}
              </StepLabel>
              <StepContent>
                <ConditionsStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                  setCommonConditionsValues={(newValues) =>
                    setFieldValue("conditions", newValues)
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
