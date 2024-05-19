import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { FilterState, LocationProps } from "src/interfaces/SearchInterfaces";

export const LocationsSelect = ({
  locations,
  onFiltersChange,
}: LocationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleLocationsChange = (
    event: SelectChangeEvent<typeof locations>
  ) => {
    const {
      target: { value },
    } = event;
    const newLocations = Array.isArray(value) ? value : [value];

    if (onFiltersChange) {
      const newFilters: Partial<FilterState> = {
        locations: newLocations,
      };
      onFiltersChange(newFilters);
    } else {
      setSearchParams(
        (urlParams) => {
          if (newLocations.length > 0) {
            urlParams.set("locations", newLocations.join(","));
          } else {
            urlParams.delete("locations");
          }
          return urlParams;
        },
        { replace: true }
      );
    }
  };

  const locationsAmount = [
    "Могилев",
    "Минск",
    "Брест",
    "Витебск",
    "Гродно",
    "Гомель",
    "Бобруйск",
  ];

  return (
    <FormControl sx={{ m: 1, width: 300, zIndex: 9999 }} variant="outlined">
      <InputLabel style={{ fontWeight: "600", color: "black" }}>
        Город, район...
      </InputLabel>
      <Select
        value={locations}
        onChange={handleLocationsChange}
        multiple
        label="Город, район..."
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
      >
        {locationsAmount.map((amount, index) => (
          <MenuItem style={{ borderRadius: "4px" }} value={amount} key={index}>
            {amount}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
