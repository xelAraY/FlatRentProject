import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import { AreaStepFormikValues, AreaStepProps } from "./components/constants";
import {
  areaStepValidationSchema,
  getInitialAreaStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { AreaStep } from "./components";
import { AddFlatFormikValues } from "../../constants";

export const AreaStepWrapper: React.FC<AreaStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  initValues,
  ...other
}) => {
  const { setFieldValue } = useFormikContext<AddFlatFormikValues>();

  return (
    <Formik<AreaStepFormikValues>
      initialValues={initValues ? initValues : getInitialAreaStepValues()}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={areaStepValidationSchema}
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
                {"Площадь"}
              </StepLabel>
              <StepContent>
                <AreaStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                  setCommonAreaValues={(newValues) =>
                    setFieldValue("area", newValues)
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
