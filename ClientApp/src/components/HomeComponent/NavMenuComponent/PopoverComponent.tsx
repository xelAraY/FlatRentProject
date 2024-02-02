import { Input, Stack } from "@mui/material";
import "./NavMenu.css";
import { Button } from "src/shared";
import { useState } from "react";

export const PopoverComponent = () => {
  const [currentCurrency, setCurrentCurrency] = useState("BY");

  const currencies = [
    {
      value: "BY",
      label: "BYN",
    },
    { value: "USD", label: "$" },
    { value: "EUR", label: "€" },
  ];

  const handleClick = (event: any) => {
    console.log(event.target.value);
    setCurrentCurrency(event.target.value);
  };

  const selectedBtn = { backgroundColor: "#bebebe" };

  return (
    <Stack flexDirection="column" spacing={2} padding={2}>
      <Stack flexDirection="row" spacing={1} useFlexGap>
        {currencies.map((option) => {
          return (
            <Button
              key={option.value}
              value={option.value}
              onClick={handleClick}
              style={option.value === currentCurrency ? selectedBtn : {}}
              className="currency-btn"
            >
              {option.label}
            </Button>
          );
        })}
      </Stack>
      <Stack flexDirection="row" spacing={2}>
        <Input />
        <Input />
      </Stack>
    </Stack>
  );
};
