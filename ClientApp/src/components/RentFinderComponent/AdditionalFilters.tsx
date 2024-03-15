import { Button } from "src/shared";
import React from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AdditionalFilters = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="large"
        color='info'
        onClick={handleClickOpen}
        style={{ border: '1px solid rgba(0, 0, 0, 0.23)', justifyContent: "space-between", height: "56px" }}
      >
        <FilterAltIcon style={{ color: "#616467" }} />
        <Typography fontWeight={600} color={"black"}>Дополнительные фильтры</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Box>
            <Typography variant="h5"><b>Дополнительные фильтры</b></Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6"><b>Квартира</b></Typography>
          <Stack flexDirection={"column"}>
            <Typography variant="body2">Этаж</Typography>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <TextField id="outlined-basic" label="От" variant="outlined" size="small" />
              <TextField id="outlined-basic" label="До" variant="outlined" size="small" />
            </Stack>
          </Stack>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}