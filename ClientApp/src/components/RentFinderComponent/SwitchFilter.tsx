import { FormControlLabel, Stack, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SwitchFilterProps } from "src/interfaces/SearchInterfaces";

export const SwitchFilter = ({
  switchName,
  isChecked,
  onFilterChange,
}: SwitchFilterProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    onFilterChange(checked);
  }, [checked]);

  return (
    <Stack flexDirection={"row"} gap={2} marginTop={2}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={switchName}
      />
    </Stack>
  );
};
