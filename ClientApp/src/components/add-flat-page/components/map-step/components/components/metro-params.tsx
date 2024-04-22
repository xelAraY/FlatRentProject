import {
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { AutocompleteWrapper } from "./autocomplete-wrapper";
import { MetroSvg } from "src/shared";
import { MapStepFormikValues } from "../constants";
import { useFormikContext } from "formik";

const regionsTypes = [
  { name: "Каменка", color: "error" },
  { name: "edwedw", color: "success" },
  { name: "wedewdwedwed", color: "primary" },
];

export const MetroParams: React.FC<TextFieldProps> = ({ ...props }) => {
  const { values, setFieldValue } = useFormikContext<MapStepFormikValues>();
  console.log(values.metroParams?.[0].station);
  return (
    <Stack gap="0.5rem">
      <Stack gap="1rem" width="100%">
        <AutocompleteWrapper
          value={values.metroParams?.[0].station}
          setNewValue={(newValue: any) =>
            setFieldValue("metroParams[0].station", newValue.name)
          }
          options={regionsTypes}
          renderOption={(props, option) => {
            return (
              <li {...props}>
                <SvgIcon color={option.color} viewBox="0 0 17 16">
                  <MetroSvg />
                </SvgIcon>
                <Typography width="100%" ml="0.5rem">
                  {option.name}
                </Typography>
              </li>
            );
          }}
          renderInput={(params) => {
            console.log(params);
            return (
              <TextField
                {...params}
                name={props.name}
                error={props.error}
                onBlur={props.onBlur}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      {values.metroParams?.[0].station && (
                        <SvgIcon
                          color={
                            (regionsTypes.find(
                              (el) =>
                                el.name === values.metroParams?.[0].station
                            )?.color as any) || "error"
                          }
                          viewBox="0 0 17 16"
                        >
                          <MetroSvg />
                        </SvgIcon>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            );
          }}
          getOptionLabel={(option: any) => {
            console.log("OPTION", option);
            return option || "";
          }}
        />
      </Stack>
    </Stack>
  );
};
