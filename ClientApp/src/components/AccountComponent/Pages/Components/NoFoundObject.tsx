import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";

interface NoFoundObjectProps {
  headerText: string;
  descriptionText: string;
}

export const NoFoundObject = ({
  headerText,
  descriptionText,
}: NoFoundObjectProps) => {
  const isMedium = useMediaQuery((theme: any) =>
    theme.breakpoints.between(0, "1000")
  );
  return (
    <Paper elevation={6} style={{ width: isMedium ? "100%" : "60vw" }}>
      <Stack padding={5} alignItems={"center"} textAlign="center" gap={1}>
        <Box marginRight={5}>
          <img
            src="./../../../Objecr_no_found_icon.svg"
            alt="Object no found icon"
            height={125}
            width={125}
          />
        </Box>
        <Typography variant="h6">
          <b>{headerText}</b>
        </Typography>
        <Typography variant="body1">{descriptionText}</Typography>
      </Stack>
    </Paper>
  );
};
