import React from "react";
import { debounce } from "lodash";

export const useDebounce = <ValueType>(initialValue?: ValueType) => {
  const [value, setValue] = React.useState<ValueType | undefined>(initialValue);
  const [debounceValue, setDebounceValue] = React.useState<
    ValueType | undefined
  >(initialValue);

  const onChange = React.useCallback((val?: ValueType) => {
    setValue(val);
  }, []);

  const onDebounceChange = React.useCallback(
    debounce((value?: ValueType) => setDebounceValue(value), 500),
    []
  );

  React.useEffect(() => {
    onDebounceChange(value);
  }, [value]);

  return {
    value,
    debounceValue,
    onChange,
  };
};
