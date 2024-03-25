import { Input, Slider, Stack, TextField } from "@mui/material";
import { Button } from "src/shared";
import { useState } from "react";
import { FilterState, PriceProps } from "src/interfaces/SearchInterfaces";

export const PopoverComponent = ({
  price,
  currentCurrency,
  onFiltersChange,
  isHome,
}: PriceProps) => {
  const [value, setValue] = useState<number[]>([price.min, price.max]);

  const currencies = [
    {
      value: "BYN",
      label: "BYN",
    },
    { value: "USD", label: "$" },
    { value: "EUR", label: "€" },
  ];

  const handleClickCurrBtn = (event: any) => {
    const { value } = event.currentTarget;

    const newFilters: Partial<FilterState> = {
      currentCurrency: value,
    };

    onFiltersChange(newFilters);
  };

  const selectedBtn = { backgroundColor: "#bebebe" };

  const handleChange = (event: Event, newValue: number | number[]) => {
    const numbers: number[] = newValue as number[];
    const newFilters: Partial<FilterState> = {
      minPrice: numbers[0],
      maxPrice: numbers[1],
    };
    setValue(numbers);
    onFiltersChange(newFilters);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = Number(event.target.value);
    if (!isNaN(minPrice)) {
      const newFilters: Partial<FilterState> = {
        minPrice: minPrice,
      };
      onFiltersChange(newFilters);

      setValue((prevValue) => {
        const newValue = [...prevValue];
        newValue[0] = minPrice;
        return newValue;
      });
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = Number(event.target.value);
    if (!isNaN(maxPrice)) {
      const newFilters: Partial<FilterState> = {
        maxPrice: maxPrice,
      };
      onFiltersChange(newFilters);

      setValue((prevValue) => {
        const newValue = [...prevValue];
        newValue[1] = maxPrice;
        return newValue;
      });
    }
  };

  const valueText = (value: number) => `${value} ${currentCurrency}`;

  return (
    <Stack flexDirection="column" spacing={2} padding={2} width={"min-content"}>
      <Stack flexDirection="row" spacing={1} useFlexGap>
        {currencies.map((option) => {
          return (
            <Button
              key={option.value}
              value={option.value}
              onClick={handleClickCurrBtn}
              style={{
                ...(option.value === currentCurrency ? selectedBtn : {}),
                ...{ color: "black" },
              }}
              className="currency-btn"
            >
              {option.label}
            </Button>
          );
        })}
      </Stack>
      <Stack flexDirection="row" spacing={2} useFlexGap>
        <TextField
          value={value[0] === 0 ? null : value[0]}
          onChange={handleMinPriceChange}
          label="От"
          variant="standard"
          size="small"
          key={"min"}
        />
        <TextField
          value={price.max !== 0 ? price.max : null}
          onChange={handleMaxPriceChange}
          label="До"
          variant="standard"
          size="small"
          key={"max"}
        />
      </Stack>
      {isHome && (
        <Stack flexDirection={"row"}>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            valueLabelFormat={valueText}
          />
        </Stack>
      )}
    </Stack>
  );
};
