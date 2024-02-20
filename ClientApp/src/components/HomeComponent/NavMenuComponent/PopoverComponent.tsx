import { Input, Slider, Stack } from "@mui/material";
import "./NavMenu.css";
import { Button } from "src/shared";
import { useState } from "react";

interface IPrice {
  min: number;
  max: number;
}

interface IPopoverProps {
  price: IPrice;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

export const PopoverComponent = ({ price, setMinPrice, setMaxPrice }: IPopoverProps) => {
  const [currentCurrency, setCurrentCurrency] = useState("BYN");
  const [value, setValue] = useState<number[]>([price.min, price.max]);

  const currencies = [
    {
      value: "BY",
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
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
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
          max={1000000}
          valueLabelFormat={valueText}
        />
      </Stack>
    </Stack>
  );
};
