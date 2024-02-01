import React from "react";
import { Button as ButtonBase, ButtonProps } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";

interface StyledButtonProps extends ButtonProps {}

const Button: React.FC<StyledButtonProps & CommonProps> = (
  props: StyledButtonProps & CommonProps
) => {
  return (
    <ButtonBase {...props} style={{ textTransform: "none", ...props.style }} />
  );
};

export default Button;
