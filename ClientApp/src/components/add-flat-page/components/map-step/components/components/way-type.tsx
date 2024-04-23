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

type WayTypeProps = {
  setNewValue: (newValue: string) => void;
} & TextFieldProps;

export const WayTypeComponent: React.FC<WayTypeProps> = ({
  setNewValue,
  ...props
}) => {
  console.log(props.value);
  const wayTypeParam = props.value as string;
  return (
    <AutocompleteWrapper
      value={wayTypeParam}
      disableClearable
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
                {wayTypeParam &&
                  (wayTypeParam === "Пешком" ? (
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
