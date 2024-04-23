import {
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { AutocompleteWrapper } from "./autocomplete-wrapper";
import { WayType } from "../constants";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

type MinutesProps = {
  setNewValue: (newValue: string) => void;
} & TextFieldProps;

export const MinutesComponent: React.FC<MinutesProps> = ({
  setNewValue,
  ...props
}) => {
  console.log(props.value);
  const minutesParam = props.value as string;
  return (
    <AutocompleteWrapper
      value={minutesParam}
      setNewValue={(newValue: string) => setNewValue(newValue)}
      options={Object.values(WayType) as string[]}
      renderOption={(props, option: string) => (
        <li {...props}>
          {option === "Пешком" ? <DirectionsWalkIcon /> : <DirectionsBusIcon />}
          <Typography width="100%" ml="0.5rem">
            {option}
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
                {minutesParam &&
                  (minutesParam === "Пешком" ? (
                    <DirectionsWalkIcon />
                  ) : (
                    <DirectionsBusIcon />
                  ))}
              </InputAdornment>
            ),
          }}
        />
      )}
      getOptionLabel={(option: string) => option || ""}
    />
  );
};
