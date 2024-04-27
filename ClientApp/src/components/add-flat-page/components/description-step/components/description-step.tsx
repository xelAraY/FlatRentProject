import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { DescriptionStepProps } from "./constants";
import { FormikControlMui } from "src/formik-control";
import { useFormikContext } from "formik";
import { DescriptionStepFormikValues } from "./constants";
import HelpIcon from "@mui/icons-material/Help";

export const DescriptionStep: React.FC<DescriptionStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonDescriptionValues,
}) => {
  const { values, setFieldTouched, setFieldValue, isValid } =
    useFormikContext<DescriptionStepFormikValues>();
  const descriptionTooltipText = `Подготовьте описание своего объявления на 3-4 предложения. 
    Оно будет отображаться на странице объявления в разделе "Описание".`;

  const titleTooltipText = `Создайте красивый заголовок своего объявления! Например, 
  "Светлая и просторная квартира с прекрасным панорамным видом" или 
  "Уютная студия с современным ремонтом в тихом жилом районе"`;

  React.useEffect(() => {
    setCommonDescriptionValues?.(values);
  }, [values]);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <Stack gap="1rem" width="100%">
        <FormikControlMui
          name="title"
          label="Заголовок"
          helpText={`${values.title.length}/100`}
          icon={
            <Tooltip
              title={
                <>
                  <Typography variant="subtitle2">
                    {titleTooltipText}
                  </Typography>
                </>
              }
              placement="top-start"
              arrow
            >
              <HelpIcon
                fontSize="small"
                sx={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "#c2c7cf",
                }}
              />
            </Tooltip>
          }
        >
          <TextField placeholder="Оригинальные заголовки привлекают больше внимания" />
        </FormikControlMui>
        <FormikControlMui
          name="description"
          label="Краткое описание"
          helpText={`${values.description.length}/500`}
          icon={
            <Tooltip
              title={
                <Typography variant="subtitle2">
                  {descriptionTooltipText}
                </Typography>
              }
              arrow
            >
              <span>
                <HelpIcon
                  fontSize="small"
                  sx={{
                    marginLeft: "10px",
                    color: "#c2c7cf",
                  }}
                />
              </span>
            </Tooltip>
          }
        >
          <TextField
            placeholder="Описание привлекает больше внимания"
            sx={{
              textarea: { paddingRight: "20px" },
            }}
            InputProps={{
              rows: 5,
              multiline: true,
              inputComponent: "textarea",
            }}
          />
          <div style={{ position: "absolute", right: 20, bottom: 30 }}>
            Text
          </div>
        </FormikControlMui>
      </Stack>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex + 1);
            }}
            type="submit"
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
