import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { ContactsStepProps } from "./constants";
import { FormikControlMui } from "src/formik-control";
import { useFormikContext } from "formik";
import { ContactsStepFormikValues } from "./constants";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const ContactsStep: React.FC<ContactsStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonContactsValues,
}) => {
  const { values, setFieldTouched, setFieldValue, isValid } =
    useFormikContext<ContactsStepFormikValues>();

  React.useEffect(() => {
    setCommonContactsValues?.(values);
  }, [values]);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      {values.contacts?.map((_, index) => {
        return (
          <Stack flexDirection="row" gap="1rem" alignItems="flex-start">
            <Stack flexDirection="row" gap="1rem" width="95%">
              <FormikControlMui
                name={`contacts[${index}].phone`}
                label="Телефон"
                fullWidth
                required
                key={index}
              >
                <TextField placeholder="+375(44)111-11-11" />
              </FormikControlMui>
              <FormikControlMui
                name={`contacts[${index}].name`}
                label="Имя"
                fullWidth
                required
                key={index}
              >
                <TextField placeholder="Алексей" />
              </FormikControlMui>
              <FormikControlMui
                name={`contacts[${index}].email`}
                label="Email"
                fullWidth
                key={index}
              >
                <TextField placeholder="exampleEmail@gmail.com" />
              </FormikControlMui>
            </Stack>
            {index !== 0 && (
              <Box pt="2.7rem">
                <IconButton
                  onClick={() => {
                    const contacts = values.contacts;
                    const newContacts = contacts.filter(
                      (_, contactIndex) => contactIndex !== index
                    );
                    setFieldValue("contacts", newContacts);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Stack>
        );
      })}
      {values.contacts?.length < 4 && (
        <Box>
          <Button
            variant="contained"
            disableTouchRipple
            onClick={() => {
              const newContacts = values.contacts;
              newContacts.push({ phone: "", name: "", email: "" });
              setFieldValue("contacts", newContacts);
            }}
            size="large"
            startIcon={<AddIcon />}
          >
            Добавить контакт
          </Button>
        </Box>
      )}
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            disabled={!isValid || currentStepIndex === 7}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex + 1);
            }}
            sx={{ mt: 1, mr: 1 }}
          >
            Далее
          </Button>
          <Button
            disabled={currentStepIndex === 0}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex - 1);
            }}
            sx={{ mt: 1, mr: 1 }}
          >
            Назад
          </Button>
        </div>
      </Box>
    </Paper>
  );
};
