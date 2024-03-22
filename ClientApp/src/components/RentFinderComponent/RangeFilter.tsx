import { Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RangeValue } from "src/interfaces/SearchInterfaces";

interface RangeFilterProps {
  fieldsName: string;
  initValue: RangeValue;
  onFilterChange: (value: RangeValue) => void;
}

export const RangeFilter = ({ fieldsName, initValue, onFilterChange }: RangeFilterProps) => {
  const [valueFrom, setValueFrom] = useState(initValue.valueFrom);
  const [valueTo, setValueTo] = useState(initValue.valueTo);

  const handleValueFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFrom = Number(event.target.value);
    if (!isNaN(valueFrom)) {
      setValueFrom(valueFrom);
    }
  }

  const handleValueToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueTo = Number(event.target.value);
    if (!isNaN(valueTo)) {
      setValueTo(valueTo);
    }
  }

  useEffect(() => {
    onFilterChange({ valueFrom, valueTo });
  }, [valueFrom, valueTo]);

  return (
    <Stack gap={1} marginTop={2}>
      <Typography variant="body1" fontWeight={600}>{fieldsName}</Typography>
      <Stack flexDirection={"row"} alignItems={"center"} gap={2} flexWrap="wrap">
        <TextField
          value={valueFrom || ''}
          onChange={handleValueFromChange}
          label="От"
          variant="outlined"
          size="small"
          style={{ width: "170px" }}
        />
        <TextField
          value={valueTo || ''}
          onChange={handleValueToChange}
          label="До"
          variant="outlined"
          size="small"
          style={{ width: "170px" }}
        />
      </Stack>
    </Stack>
  );
}