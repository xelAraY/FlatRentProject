import React from "react";
import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { Button } from "src/shared";

export const NoFoundObject = () => {
  const isMedium = useMediaQuery((theme: any) => theme.breakpoints.between(0, '1000'));
  return (
    <Paper elevation={6} style={{ width: isMedium ? '100%' : "60vw" }}>
      <Stack flexDirection={"row"} padding={5}>
        <Box marginRight={5}>
          <img src="./../../../Objecr_no_found_icon.svg" alt="Object no found icon" height={125} width={125} />
        </Box>
        <Stack flexDirection={"column"}>
          <Typography variant="h5"><b>Нет подходящих объявлений по такому запросу</b></Typography>
          <Stack flexDirection={"column"}>
            <ul>
              <li style={{ color: "#d2d6db" }}>
                <Typography variant="body1" color={"black"}>Перейдите на карту для просмотра объявлений рядом</Typography>
              </li>
              <li style={{ color: "#d2d6db" }}>
                <Typography variant="body1" color={"black"}>Попробуйте сбросить или изменить фильтры</Typography>
              </li>
            </ul>
          </Stack>
          <Button variant="contained" style={{ marginRight: "6px", width: "max-content", color: "#0a0f1c", backgroundColor: "#efcd6c" }}>
            <Typography fontSize="17px">Посмотреть на карте</Typography>
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}