import { Slider, Stack, TextField } from "@mui/material";
import { Button } from "src/shared";
import { useState } from "react";
import { FilterState, PriceProps } from "src/interfaces/SearchInterfaces";
import { useSearchParams } from "react-router-dom";

export const PopoverComponent = ({
  price,
  currentCurrency,
  onFiltersChange,
  isHome,
}: PriceProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
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

    if (onFiltersChange) {
      const newFilters: Partial<FilterState> = {
        currentCurrency: value,
      };
      onFiltersChange(newFilters);
    } else {
      setSearchParams(
        (urlParams) => {
          if (value !== "") {
            urlParams.set("currencyType", value);
          } else {
            urlParams.delete("currencyType");
          }
          return urlParams;
        },
        { replace: true }
      );
    }
  };

  const selectedBtn = { backgroundColor: "#bebebe" };

  const handleChange = (event: Event, newValue: number | number[]) => {
    const numbers: number[] = newValue as number[];

    if (onFiltersChange) {
      const newFilters: Partial<FilterState> = {
        minPrice: numbers[0],
        maxPrice: numbers[1],
      };
      onFiltersChange(newFilters);
    } else {
      setSearchParams(
        (urlParams) => {
          if (numbers[0] !== 0) {
            urlParams.set("minPrice", numbers[0].toString());
          } else {
            urlParams.delete("minPrice");
          }
          if (numbers[1] !== 0) {
            urlParams.set("maxPrice", numbers[1].toString());
          } else {
            urlParams.delete("maxPrice");
          }
          return urlParams;
        },
        { replace: true }
      );
    }
    setValue(numbers);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = Number(event.target.value);
    if (!isNaN(minPrice)) {
      if (onFiltersChange) {
        const newFilters: Partial<FilterState> = {
          minPrice: minPrice,
        };
        onFiltersChange(newFilters);
      } else {
        setSearchParams(
          (urlParams) => {
            if (minPrice !== 0) {
              urlParams.set("minPrice", minPrice.toString());
            } else {
              urlParams.delete("minPrice");
            }
            return urlParams;
          },
          { replace: true }
        );
      }

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
      if (onFiltersChange) {
        const newFilters: Partial<FilterState> = {
          maxPrice: maxPrice,
        };
        onFiltersChange(newFilters);
      } else {
        setSearchParams(
          (urlParams) => {
            if (maxPrice !== 0) {
              urlParams.set("maxPrice", maxPrice.toString());
            } else {
              urlParams.delete("maxPrice");
            }
            return urlParams;
          },
          { replace: true }
        );
      }

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
