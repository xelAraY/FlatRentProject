import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";

interface AutocompleteWrapperProps
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  value?: string;
  options: any;
  setNewValue?: (newValue: string) => void;
  name?: string;
  error?: boolean;
  onBlur?: (e: any) => void;
  placeholder?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

export const AutocompleteWrapper: React.FC<AutocompleteWrapperProps> = ({
  value,
  setNewValue,
  options,
  name,
  error,
  onBlur,
  placeholder = "Выберите",
  renderInput = (params) => (
    <TextField
      {...params}
      name={name}
      error={error}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  ),
  ...props
}: AutocompleteWrapperProps) => {
  const { onChange, ...other } = props;
  return (
    <Autocomplete
      value={value || null}
      onChange={(_: any, newValue: any) => {
        setNewValue?.(newValue || "");
      }}
      options={options}
      renderInput={renderInput}
      {...other}
    />
  );
};
