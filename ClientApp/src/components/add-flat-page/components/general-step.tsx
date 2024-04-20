import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export const GeneralStep: React.FC = () => {
  const [roomsCountButton, setRoomsCountButton] = React.useState<
    number | undefined
  >();

  const handleChange = (buttonNumber: number) => {
    setRoomsCountButton(buttonNumber);
  };

  return (
    <Paper elevation={0}>
      <Typography variant="subtitle1" mb="0.5rem">
        Количество комнат
      </Typography>
      <Stack flexDirection="row" gap="0.5rem">
        <Button
          variant={roomsCountButton === 0 ? "contained" : "outlined"}
          onClick={() => handleChange(0)}
        >
          Комната
        </Button>
        <Button
          variant={roomsCountButton === 1 ? "contained" : "outlined"}
          onClick={() => handleChange(1)}
        >
          1к квартира
        </Button>
        <Button
          variant={roomsCountButton === 2 ? "contained" : "outlined"}
          onClick={() => handleChange(2)}
        >
          2к квартира
        </Button>
        <Button
          variant={roomsCountButton === 3 ? "contained" : "outlined"}
          onClick={() => handleChange(3)}
        >
          3к квартира
        </Button>
        <Button
          variant={roomsCountButton === 4 ? "contained" : "outlined"}
          onClick={() => handleChange(4)}
        >
          4к квартира
        </Button>
        <Button
          variant={roomsCountButton === 5 ? "contained" : "outlined"}
          onClick={() => handleChange(5)}
        >
          5+ комнат
        </Button>
      </Stack>
    </Paper>
  );
};
