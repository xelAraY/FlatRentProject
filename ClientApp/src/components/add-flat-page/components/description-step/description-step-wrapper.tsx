import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import {
  DescriptionStepFormikValues,
  DescriptionStepProps,
} from "./components/constants";
import {
  descriptionStepValidationSchema,
  getInitialDescriptionStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { DescriptionStep } from "./components";
import { AddFlatFormikValues } from "../../constants";

export const DescriptionStepWrapper: React.FC<DescriptionStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  initValues,
  ...other
}) => {
  const { setFieldValue } = useFormikContext<AddFlatFormikValues>();

  return (
    <Formik<DescriptionStepFormikValues>
      initialValues={
        initValues ? initValues : getInitialDescriptionStepValues()
      }
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={descriptionStepValidationSchema}
      validateOnMount
      validateOnChange
      validateOnBlur
    >
      {({ isValid, touched }) => {
        return (
          <Form>
            <Step completed={isValid && !!touched.title} {...other}>
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
                {"Описание"}
              </StepLabel>
              <StepContent>
                <DescriptionStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                  setCommonDescriptionValues={(newValues) =>
                    setFieldValue("description", newValues)
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
