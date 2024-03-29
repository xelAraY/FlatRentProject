import { Box, Grid, Stack, Typography } from "@mui/material";

interface InfoRowProps {
  title: string;
  value: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ title, value }) => {
  return (
    <>
      <Grid item xs={5}>
        <Stack flexDirection="row" gap="0.25rem">
          <Typography variant="subtitle1" lineHeight="1.5rem">
            {title}
          </Typography>
          <Box borderBottom="1px dashed" flexGrow={1} height="1.25rem" />
        </Stack>
      </Grid>
      <Grid item xs={7}>
        {value}
      </Grid>
    </>
  );
};

export default InfoRow;
