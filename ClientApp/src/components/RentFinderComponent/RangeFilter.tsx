import { Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RangeValue } from "src/interfaces/SearchInterfaces";
import { useDebounce } from "src/shared";

interface RangeFilterProps {
  fieldsName: string;
  initValue: RangeValue;
  onFilterChange: (value: RangeValue) => void;
}

export const RangeFilter = ({
  fieldsName,
  initValue,
  onFilterChange,
}: RangeFilterProps) => {
  const {
    debounceValue: valueFrom,
    onChange: onChangeValueFrom,
    value: valFrom,
  } = useDebounce<number | null>(initValue.valueFrom);

  const {
    debounceValue: valueTo,
    onChange: onChangeValueTo,
    value: valTo,
  } = useDebounce<number | null>(initValue.valueTo);

  const handleValueFromChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valueFrom = Number(event.target.value);
    if (!isNaN(valueFrom)) {
      onChangeValueFrom(valueFrom);
    }
  };

  const handleValueToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueTo = Number(event.target.value);
    if (!isNaN(valueTo)) {
      onChangeValueTo(valueTo);
    }
  };

  useEffect(() => {
    onFilterChange({ valueFrom: Number(valueFrom), valueTo: Number(valueTo) });
  }, [valueFrom, valueTo]);

  return (
    <Stack gap={1} marginTop={2}>
      <Typography variant="body1" fontWeight={600}>
        {fieldsName}
      </Typography>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
        flexWrap="wrap"
      >
        <TextField
          value={valFrom || null}
          onChange={handleValueFromChange}
          label="От"
          variant="outlined"
          size="small"
          style={{ width: "170px" }}
        />
        <TextField
          value={valTo || null}
          onChange={handleValueToChange}
          label="До"
          variant="outlined"
          size="small"
          style={{ width: "170px" }}
        />
      </Stack>
    </Stack>
  );
};
