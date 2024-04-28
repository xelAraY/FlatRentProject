import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import { MediaStepFormikValues, MediaStepProps } from "./components/constants";
import {
  mediaStepValidationSchema,
  getInitialMediaStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { MediaStep } from "./components";
import { AddFlatFormikValues } from "../../constants";

export const MediaStepWrapper: React.FC<MediaStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  ...other
}) => {
  const { setFieldValue } = useFormikContext<AddFlatFormikValues>();

  return (
    <Formik<MediaStepFormikValues>
      initialValues={getInitialMediaStepValues()}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={mediaStepValidationSchema}
      validateOnMount
      validateOnChange
      validateOnBlur
    >
      {({ isValid, touched }) => {
        return (
          <Form>
            <Step completed={isValid && !!touched.photos} {...other}>
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
                {"Фотографии"}
              </StepLabel>
              <StepContent>
                <MediaStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                  setCommonMediaValues={(newValues) =>
                    setFieldValue("media", newValues)
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
