import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SelectFilterProps } from "src/interfaces/SearchInterfaces";
import { Button } from "src/shared";

export const SelectFilter = ({ groupName, options, selectedOptions, multiSelect, onFilterChange }: SelectFilterProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedOptions);

  const handleOptionClick = (option: string, multiSelect: boolean) => {
    if (multiSelect) {
      if (!selectedItems.includes(option)) {
        setSelectedItems([...selectedItems, option]);
      } else {
        setSelectedItems(selectedItems.filter(item => item !== option));
      }
    } else {
      if (selectedItems.includes(option)) {
        setSelectedItems([]);
      } else {
        setSelectedItems([option]);
      }
    }
  };

  useEffect(() => {
    console.log("new change");
    onFilterChange(selectedItems);
  }, [selectedItems]);

  return (
    <Stack gap={1} marginTop={2}>
      <Typography variant="body1" fontWeight={600}>{groupName}</Typography>
      <Stack flexDirection={"row"} alignItems={"center"} gap={2} flexWrap="wrap">
        {options.map((option, index) =>
          <Button
            key={index}
            value={option}
            onClick={() => handleOptionClick(option, multiSelect)}
            sx={{
              backgroundColor: selectedItems.includes(option) ? "#5b6473" : "#f3f5f7 ",
              color: selectedItems.includes(option) ? "white" : "black",
              padding: "8px 16px", ':hover': {
                backgroundColor: selectedItems.includes(option) ? "#5b6473" : "#ebecee ",
                transition: '0.5s'
              }
            }}
          >
            <Typography fontSize={17}>{option}</Typography>
          </Button>)}
      </Stack>
    </Stack>
  );
}