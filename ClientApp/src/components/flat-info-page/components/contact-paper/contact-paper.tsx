import React from "react";
import { Alert, Box, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { Button, DOLLAR_EXCHANGE_RATE, EURO_EXCHANGE_RATE } from "src/shared";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSearchParams } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

interface ContactPaperProps {
  flatInfo: RentObjectInformation;
}

const ContactPaper: React.FC<ContactPaperProps> = ({ flatInfo }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const price = Math.round(
    flatInfo.rentObject.rentPrice * flatInfo.currency.officialRate
  );
  const anotherPrice = Math.round(price / DOLLAR_EXCHANGE_RATE);

  const [isContactsOpen, setIsOpenContacts] = React.useState(false);
  const onCopyClick = async (value: string) => {
    await navigator.clipboard.writeText(value ?? "");
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
            {`≈ ${anotherPrice} $/мес.`}
          </Typography>
        </Stack>

        {flatInfo?.rentObject.rentalPeriod && (
          <Typography variant="body1">
            {`Срок аренды: ${flatInfo?.rentObject.rentalPeriod}`}
          </Typography>
        )}

        {flatInfo.contacts.map((contact, index) => (
          <Stack gap={1} key={index}>
            <Stack>
              <Typography variant="h6" color="black" mt="1rem">
                {contact.name}
              </Typography>
              <Typography variant="body2">{"Контактное лицо"}</Typography>
            </Stack>

            {isContactsOpen && (
              <Stack gap={1}>
                <Stack flexDirection="row">
                  <LocalPhoneIcon />
                  <Typography variant="body1" ml="0.25rem">
                    {contact.phone}
                  </Typography>
                  <ContentCopyIcon
                    sx={{ cursor: "pointer", height: "0.875rem" }}
                    onClick={() => onCopyClick(contact.phone)}
                  />
                </Stack>

                {contact.email && (
                  <Stack flexDirection="row">
                    <EmailIcon />
                    <Typography variant="body1" ml="0.25rem">
                      {contact.email}
                    </Typography>
                    <ContentCopyIcon
                      sx={{ cursor: "pointer", height: "0.875rem" }}
                      onClick={() => onCopyClick(contact.email)}
                    />
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        ))}
        {!isContactsOpen && (
          <Box mt="1.25rem" width="100%">
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
          </Box>
        )}
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

export default ContactPaper;
