import React from "react";
import { FieldInputProps, useField } from "formik";
import { FormControlMui } from "./components";
import { SxProps, Theme } from "@mui/material";
import { FormControlMuiProps } from "./duck";

export interface FormikControlMuiChildProps extends FieldInputProps<any> {
  error?: boolean;
  showBorders?: boolean;
}

export interface FormikControlMuiProps extends FormControlMuiProps {
  name: string;
  showError?: boolean;
  additionalError?: React.ReactElement;
  absoluteError?: boolean;
  mb?: string;
  /**
   * Indicates special situations to show `required` as error text
   * @note Overrides default behaviour
   */
  requiredError?: boolean;
  icon?: React.ReactElement;
}

const FormikControlMui: React.FC<FormikControlMuiProps> = ({
  name,
  showError = false,
  requiredError: requiredErrorProps,
  mb = "initial",
  children,
  ...other
}: FormikControlMuiProps) => {
  const { absoluteError, ...formProps } = other;
  const [field, meta] = useField(name);

  const error = showError ? meta.error : meta.touched ? meta.error : undefined;
  const reqiredError =
    requiredErrorProps ?? (other.required ? !!error && !field.value : false);
  const isInvalid = !!error;
  const isChecked = field.checked;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps: FormikControlMuiChildProps = { ...field };
      if (isChecked != undefined) {
        childProps.checked = isChecked;
      }
      if (error != undefined) {
        childProps.error = isInvalid;
        childProps.showBorders = true;
      }
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  const sx: SxProps<Theme> | undefined = {
    ...other.style,
    ...other.sx,
    display: absoluteError ? "initial" : "flex",
    flexDirection: absoluteError ? "initial" : "column",
    marginBottom: mb,

    "& .MuiFormHelperText-root.Mui-error": {
      position: absoluteError ? "absolute" : "initial",
    },
  };

  return (
    <FormControlMui
      error={error}
      {...formProps}
      requiredError={reqiredError}
      sx={sx}
    >
      {childrenWithProps}
    </FormControlMui>
  );
};

export default FormikControlMui;
