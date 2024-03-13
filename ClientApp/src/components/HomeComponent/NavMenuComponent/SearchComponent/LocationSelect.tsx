import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LocationProps } from "src/interfaces/SearchInterfaces";

export const LocationsSelect = ({ locations, setLocations }: LocationProps) => {

  const handleLocationsChange = (event: SelectChangeEvent<typeof locations>) => {
    const {
      target: { value },
    } = event;
    setLocations(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const roomsAmount = ["Могилев", "Минск", "Брест", "Витебск", "Гродно", "Гомель", "Бобруйск"];

  return (
    <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
      <InputLabel>Город, район...</InputLabel>
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