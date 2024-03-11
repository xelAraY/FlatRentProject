import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { RoomsProps } from "src/interfaces/SearchInterfaces";

export const RoomsSelect = ({ rooms, setRooms }: RoomsProps) => {


  const handleRoomsCountChange = (event: SelectChangeEvent<typeof rooms>) => {
    const {
      target: { value },
    } = event;
    setRooms(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const roomsAmount = ["1", "2", "3", "4", "5", "6+"];

  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} variant="outlined">
      <InputLabel>Комнат</InputLabel>
      <Select
        value={rooms}
        onChange={handleRoomsCountChange}
        autoWidth
        multiple
        label="Комнат"
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