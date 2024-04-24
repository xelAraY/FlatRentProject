import React from "react";
import { Alert, Box, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { Button, DOLLAR_EXCHANGE_RATE, EURO_EXCHANGE_RATE } from "src/shared";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSearchParams } from "react-router-dom";

interface OwnerPaperProps {
  flatInfo: RentObjectInformation;
}

const OwnerPaper: React.FC<OwnerPaperProps> = ({ flatInfo }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const price = flatInfo?.rentObject.rentPrice;
  let currencyType = searchParams.get("currencyType");
  let anotherPrice = 0;
  if (currencyType === "EUR") {
    anotherPrice = Math.round(price / EURO_EXCHANGE_RATE);
  } else {
    anotherPrice = Math.round(price / DOLLAR_EXCHANGE_RATE);
    currencyType = "USD";
  }

  const [isContactsOpen, setIsOpenContacts] = React.useState(false);
  const onCopyPhoneClick = async () => {
    await navigator.clipboard.writeText(flatInfo?.owner.phoneNumber ?? "");
    openAlert();
  };

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlertOpen(false);
  };

  return (
    <div style={{ position: "sticky", top: "10%" }}>
      <Paper
        variant="outlined"
        sx={{
          p: "2rem",
          borderRadius: "0.375rem",
          hyphens: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="h5" fontWeight="600" color="primary">
            {price} р./мес.&nbsp;
          </Typography>
          <Typography variant="body1" fontWeight="400">
            ≈&nbsp;{anotherPrice} {currencyType}
            /мес.
          </Typography>
        </Stack>

        {flatInfo?.rentObject.rentalPeriod && (
          <Typography variant="body1">
            {`Срок аренды: ${flatInfo?.rentObject.rentalPeriod}`}
          </Typography>
        )}

        <Typography variant="body1" color="black" mt="1rem">
          {flatInfo?.owner.fullName}
        </Typography>
        <Typography variant="body1">{"Контактное лицо"}</Typography>

        <Box mt="1.25rem" width="100%">
          {!isContactsOpen ? (
            <Button
              variant="contained"
              fullWidth
              sx={{
                fontSize: "1rem",
              }}
              onClick={() => setIsOpenContacts(true)}
            >
              {"Показать контакты"}
            </Button>
          ) : (
            <>
              <Stack flexDirection="row">
                <LocalPhoneIcon />
                <Typography variant="body1" ml="0.25rem">
                  {flatInfo?.owner.phoneNumber}
                </Typography>
                <ContentCopyIcon
                  sx={{ cursor: "pointer", height: "0.875rem" }}
                  onClick={() => onCopyPhoneClick()}
                />
              </Stack>
            </>
          )}
        </Box>
      </Paper>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={2000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeAlert} severity="success">
          Скопировано в буфер обмена
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OwnerPaper;
