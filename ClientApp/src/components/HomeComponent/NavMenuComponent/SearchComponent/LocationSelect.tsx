import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FilterState, LocationProps } from "src/interfaces/SearchInterfaces";

export const LocationsSelect = ({ locations, onFiltersChange }: LocationProps) => {

  const handleLocationsChange = (event: SelectChangeEvent<typeof locations>) => {
    const {
      target: { value },
    } = event;
    const newLocations = Array.isArray(value) ? value : [value];

    const newFilters: Partial<FilterState> = {
      locations: newLocations,
    };

    onFiltersChange(newFilters);
  };

  const roomsAmount = ["Могилев", "Минск", "Брест", "Витебск", "Гродно", "Гомель", "Бобруйск"];

  return (
    <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
      <InputLabel style={{ fontWeight: "600", color: "black" }}>Город, район...</InputLabel>
      <Select
        value={locations}
        onChange={handleLocationsChange}

        multiple
        label="Город, район..."
        MenuProps={{
          PaperProps: {
            style: {
              width: '300px'
            }
          },
          MenuListProps: {
            sx: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: '8px'
            },
          }
        }}
      >
        {roomsAmount.map((amount, index) =>
          <MenuItem style={{ borderRadius: "4px" }} value={amount} key={index}>{amount}</MenuItem>
        )}
      </Select>
    </FormControl>);
}