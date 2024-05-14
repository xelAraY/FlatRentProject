import { Form, Formik, useFormikContext } from "formik";
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
import { AddFlatFormikValues } from "../../constants";

export const GeneralStepWrapper: React.FC<GeneralStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  initValues,
  ...other
}) => {
  const { setFieldValue, values } = useFormikContext<AddFlatFormikValues>();
  console.log("generalValues: ", initValues);
  return (
    <Formik<GeneralStepFormikValues>
      initialValues={initValues ? initValues : getInitialGeneralStepValues()}
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
                  setCommonGeneralValues={(newValues) =>
                    setFieldValue("general", newValues)
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
