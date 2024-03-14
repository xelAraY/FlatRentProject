import { Input, Slider, Stack } from "@mui/material";
import { Button } from "src/shared";
import { useState } from "react";
import { PriceProps } from "src/interfaces/SearchInterfaces";

export const PopoverComponent = ({ price, setMinPrice, setMaxPrice, currentCurrency, setCurrentCurrency }: PriceProps) => {
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
    setCurrentCurrency(event.target.value);
  };

  const selectedBtn = { backgroundColor: "#bebebe" };

  const handleChange = (event: Event, newValue: number | number[]) => {
    const numbers: number[] = newValue as number[];
    setMinPrice(numbers[0]);
    setMaxPrice(numbers[1]);
    setValue(numbers);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = Number(event.target.value);
    if (!isNaN(minPrice)) {
      setMinPrice(minPrice);
      setValue((prevValue) => {
        const newValue = [...prevValue];
        newValue[0] = minPrice;
        return newValue;
      })
    } else {
      setMinPrice((prevValue) => prevValue);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = Number(event.target.value)
    if (!isNaN(maxPrice)) {
      setMaxPrice(maxPrice);
      setValue((prevValue) => {
        const newValue = [...prevValue];
        newValue[1] = maxPrice;
        return newValue;
      })
    } else {
      setMaxPrice((prevValue) => prevValue);
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
              style={option.value === currentCurrency ? selectedBtn : {}}
              className="currency-btn"
            >
              {option.label}
            </Button>
          );
        })}
      </Stack>
      <Stack flexDirection="row" spacing={2} useFlexGap>
        <Input
          value={price.min}
          onChange={handleMinPriceChange}
          key={"min"}
        />
        <Input
          value={price.max}
          onChange={handleMaxPriceChange}
          key={"max"}
        />
      </Stack>
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
    </Stack>
  );
};
