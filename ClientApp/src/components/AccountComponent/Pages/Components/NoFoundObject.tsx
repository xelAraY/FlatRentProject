import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";

export const NoFoundObject = () => {
  const isMedium = useMediaQuery((theme: any) =>
    theme.breakpoints.between(0, "1000")
  );
  return (
    <Paper elevation={6} style={{ width: isMedium ? "100%" : "60vw" }}>
      <Stack padding={5} alignItems={"center"} gap={1}>
        <Box marginRight={5}>
          <img
            src="./../../../Objecr_no_found_icon.svg"
            alt="Object no found icon"
            height={125}
            width={125}
          />
        </Box>
        <Typography variant="h6">
          <b>{`На данный момент у вас нет размещенных объявлений`}</b>
        </Typography>
        <Typography variant="body1">
          {`Для размещения нового объявления перейдите на странциу добавления объявления`}
        </Typography>
      </Stack>
    </Paper>
  );
};
