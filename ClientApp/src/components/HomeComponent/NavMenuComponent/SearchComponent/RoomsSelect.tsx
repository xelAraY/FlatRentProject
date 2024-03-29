import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { FilterState, RoomsProps } from "src/interfaces/SearchInterfaces";

export const RoomsSelect = ({ rooms, onFiltersChange }: RoomsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleRoomsCountChange = (event: SelectChangeEvent<typeof rooms>) => {
    const {
      target: { value },
    } = event;

    const newRooms = Array.isArray(value) ? value : [value];

    if (onFiltersChange) {
      const newFilters: Partial<FilterState> = {
        rooms: newRooms,
      };
      onFiltersChange(newFilters);
    } else {
      setSearchParams(
        (urlParams) => {
          if (newRooms.length > 0) {
            urlParams.set("numberOfRooms", newRooms.join(","));
          } else {
            urlParams.delete("numberOfRooms");
          }
          return urlParams;
        },
        { replace: true }
      );
    }
  };

  const roomsAmount = ["1", "2", "3", "4", "5", "6+"];

  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} variant="outlined">
      <InputLabel style={{ fontWeight: "600", color: "black" }}>
        Комнат
      </InputLabel>
      <Select
        value={rooms}
        onChange={handleRoomsCountChange}
        autoWidth
        multiple
        label="Комнат"
        MenuProps={{
          PaperProps: {
            style: {
              width: "300px",
            },
          },
          MenuListProps: {
            sx: {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: "8px",
            },
          },
        }}
        // sx={{
        //   ".MuiOutlinedInput-input": {
        //     padding: "12px 12px",
        //   },
        // }}
      >
        {roomsAmount.map((amount, index) => (
          <MenuItem
            style={{ borderRadius: "4px" }}
            value={amount[0]}
            key={index}
          >
            {amount}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
