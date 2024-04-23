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

type MetroStationProps = {
  setFieldValue: (newValue: MetroStationParams) => void;
  stationsInfo: MetroStationParams[];
} & TextFieldProps;

export const MetroStation: React.FC<MetroStationProps> = ({
  setFieldValue,
  stationsInfo,
  ...props
}) => {
  console.log(props.value);
  const metroParam = props.value as MetroStationParams;
  return (
    <AutocompleteWrapper
      value={metroParam}
      setNewValue={(newValue: MetroStationParams) => setFieldValue(newValue)}
      options={stationsInfo}
      autoHighlight
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
          placeholder="Выберите станцию"
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
