import { Form, Formik, useFormikContext } from "formik";
import React, { useEffect } from "react";
import {
  MapStepFormikValues,
  MapStepProps,
  MetroStationParams,
} from "./components/constants";
import {
  mapStepValidationSchema,
  getInitialMapStepValues,
} from "./components/utils";
import { Step, StepContent, StepLabel } from "@mui/material";
import { MapStep } from "./components";
import { AddFlatFormikValues } from "../../constants";

export const MapStepWrapper: React.FC<MapStepProps> = ({
  setActiveStep,
  currentStepIndex,
  myIndex,
  ...other
}) => {
  const { setFieldValue } = useFormikContext<AddFlatFormikValues>();

  return (
    <Formik<MapStepFormikValues>
      initialValues={getInitialMapStepValues()}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={mapStepValidationSchema}
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
                {"Местоположение"}
              </StepLabel>
              <StepContent>
                <MapStep
                  myIndex={myIndex}
                  setActiveStep={setActiveStep}
                  currentStepIndex={currentStepIndex}
                  setCommonMapValues={(newValues) =>
                    setFieldValue("map", newValues)
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
