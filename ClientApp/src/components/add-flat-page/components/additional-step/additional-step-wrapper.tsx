import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import {
  AdditionalStepFormikValues,
  AdditionalStepProps,
} from "./components/constants";
import {
  additionalStepValidationSchema,
  getInitialAdditionalStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { AdditionalStep } from "./components";
import { AddFlatFormikValues } from "../../constants";

export const AdditionalStepWrapper: React.FC<AdditionalStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  ...other
}) => {
  const { setFieldValue, values } = useFormikContext<AddFlatFormikValues>();

  return (
    <Formik<AdditionalStepFormikValues>
      initialValues={getInitialAdditionalStepValues()}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={additionalStepValidationSchema}
      validateOnMount
      validateOnChange
      validateOnBlur
    >
      {({ isValid, touched }) => {
        return (
          <Form>
            <Step completed={isValid && touched.appliances} {...other}>
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
                {"Дополнительная информация"}
              </StepLabel>
              <StepContent>
                <AdditionalStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                  setCommonAdditionalValues={(newValues) =>
                    setFieldValue("additional", newValues)
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
