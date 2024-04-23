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
import { MetroStationParams } from "../constants";

const regionsTypes: MetroStationParams[] = [
  { name: "Каменка", color: "error" },
  { name: "edwedw", color: "success" },
  { name: "wedewdwedwed", color: "primary" },
];

type MetroStationProps = {
  setFieldValue: (newValue: MetroStationParams) => void;
} & TextFieldProps;

export const MetroStation: React.FC<MetroStationProps> = ({
  setFieldValue,
  ...props
}) => {
  console.log(props.value);
  const metroParam = props.value as MetroStationParams;
  return (
    <AutocompleteWrapper
      value={metroParam}
      setNewValue={(newValue: MetroStationParams) => setFieldValue(newValue)}
      options={regionsTypes}
      renderOption={(props, option: MetroStationParams) => (
        <li {...props}>
          <SvgIcon color={option.color} viewBox="0 0 17 16">
            <MetroSvg />
          </SvgIcon>
          <Typography width="100%" ml="0.5rem">
            {option.name}
          </Typography>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          name={props.name}
          error={props.error}
          onBlur={props.onBlur}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {metroParam && (
                  <SvgIcon
                    color={metroParam.color || "error"}
                    viewBox="0 0 17 16"
                  >
                    <MetroSvg />
                  </SvgIcon>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
      getOptionLabel={(option: MetroStationParams) => option.name || ""}
    />
  );
};
