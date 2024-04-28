import {
  Alert,
  Avatar,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { MediaStepProps } from "./constants";
import { useFormikContext } from "formik";
import { MediaStepFormikValues } from "./constants";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";
import HelpIcon from "@mui/icons-material/Help";

const VisuallyHiddenInput = styled("input")({
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
  height: "100%",
  opacity: 0,
});

const photoTooltipText = `Фото размещается в соответствии с
выбранным приоритетом. Первый приоритет присваивается 1 фото. 
Это же фото будет являться главным и отображаться первым при присмотре 
объявления в списке поиска, поэтому поставьте на первое место самое яркое 
и красочное фото, чтобы как можно большее количество людей просмотрели ваше 
объявление. Файл с фото должен быть в одном из трех форматов: jpg, png, jpeg, gif`;

export const MediaStep: React.FC<MediaStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonMediaValues,
}) => {
  const { values, setFieldValue, setFieldTouched, isValid } =
    useFormikContext<MediaStepFormikValues>();
  const [dragging, setDragging] = useState(false);
  const maxPhotos = 5;

  React.useEffect(() => {
    setCommonMediaValues?.(values);
    console.log(values);
  }, [values]);

  const handleFiles = async (files: FileList) => {
    const remainingSlots = maxPhotos - values.photos.length;

    if (remainingSlots <= 0) {
      openLimitPhotosAlert();
      return;
    }

    let incorFiles: string[] = [];
    const promises = Array.from(files)
      .map((file) => {
        if (!file.type.startsWith("image/")) {
          console.log("Файл не является изображением:", file.name);
          incorFiles.push(file.name);
          return;
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            try {
              const src = String(event.target?.result);
              console.log("Изображения загружены");
              resolve(src);
            } catch (err) {
              reject(err);
            }
          };
        });
      })
      .filter(Boolean);

    let uploadedFiles = (await Promise.all(promises)) as string[];
    uploadedFiles = uploadedFiles.slice(0, remainingSlots);
    setFieldValue("photos", [...values.photos, ...uploadedFiles]);

    incorFiles.length > 0 && openIncorrectFilesAlert(incorFiles);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      handleFiles(files);
    }
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };
  const inputRef = React.createRef<HTMLInputElement>();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [isLimitPhotosAlertOpen, setIsLimitPhotosAlertOpen] =
    React.useState(false);

  const handleDragPhotoStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragPhotoOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const newPhotos = [...values.photos];
      const draggedPhoto = newPhotos[draggedIndex];
      newPhotos.splice(draggedIndex, 1);
      newPhotos.splice(index, 0, draggedPhoto);
      setFieldValue("photos", newPhotos);
      setDraggedIndex(index);
    }
  };

  const handleDragPhotoEnd = () => {
    setDraggedIndex(null);
  };

  const handleClearPhoto = (ind: number) => {
    let newPhotos = values.photos;
    newPhotos = newPhotos.filter((_, index) => index !== ind);
    setFieldValue("photos", newPhotos);
  };

  const openLimitPhotosAlert = () => {
    setIsLimitPhotosAlertOpen(true);
  };

  const closeLimitPhotosAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsLimitPhotosAlertOpen(false);
  };

  const [incorrectFiles, setIncorrectFiles] = React.useState<string[] | null>(
    null
  );

  const openIncorrectFilesAlert = (incorrectFiles: string[]) => {
    setIncorrectFiles(incorrectFiles);
  };

  const closeIncorrectFilesAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIncorrectFiles(null);
  };

  React.useEffect(() => {
    return () => {
      setFieldTouched("photos", true);
    };
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <Stack flexDirection="row" alignItems="center">
        <Typography>Фото</Typography>
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2">{photoTooltipText}</Typography>
            </>
          }
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
      </Stack>
      {values.photos.length > 0 && (
        <Stack gap={2}>
          <Stack flexDirection="row" gap={2} flexWrap="wrap">
            {values.photos.map((photo, index) => (
              <Stack sx={{ position: "relative" }}>
                <ClearIcon
                  sx={{
                    position: "absolute",
                    zIndex: 1000,
                    right: 0,
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClearPhoto(index)}
                />
                <Avatar
                  key={index}
                  src={photo}
                  variant="rounded"
                  sx={{ height: "130px", width: "130px", cursor: "pointer" }}
                  draggable
                  onDragStart={() => handleDragPhotoStart(index)}
                  onDragOver={(event) => handleDragPhotoOver(event, index)}
                  onDragEnd={handleDragPhotoEnd}
                />
              </Stack>
            ))}
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography>Перетаскивайте фото в своем порядке</Typography>
            <Typography>{values.photos.length} фото</Typography>
          </Stack>
        </Stack>
      )}

      <Paper
        elevation={3}
        style={{
          padding: "24px 20px",
          border: "1px dashed #f3f5f7",
          backgroundColor: `${dragging ? "#f3f5f7" : "#ffffff"}`,
          position: "relative",
        }}
      >
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={() => setDragging(true)}
          onDragEnter={() => setDragging(true)}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
          onDragEnd={() => setDragging(false)}
          disabled={values.photos.length === maxPhotos}
          sx={{
            cursor: values.photos.length !== maxPhotos ? "pointer" : "no-drop",
          }}
        />
        <Stack alignItems="center" gap={2}>
          <Button
            variant="contained"
            tabIndex={-1}
            startIcon={<UploadFileIcon />}
            style={{ fontSize: "16px" }}
            onClick={(e) => inputRef.current?.click()}
            disabled={values.photos.length === maxPhotos}
          >
            Выберите фотографии
          </Button>
          <Typography>или перетащите в область</Typography>
          <Typography mt="2rem" color="rgb(127, 134, 146)">
            Арендаторов привлекают качественные фото. Чем больше фото вы
            загрузите, тем больше шансов сдать квартиру ;)
          </Typography>
        </Stack>
      </Paper>
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
      <Snackbar
        open={isLimitPhotosAlertOpen}
        autoHideDuration={2000}
        onClose={closeLimitPhotosAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeLimitPhotosAlert} severity="error">
          Превышен лимит по количеству загружаемых фотографий
        </Alert>
      </Snackbar>

      <Snackbar
        open={incorrectFiles !== null}
        onClose={closeIncorrectFilesAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeIncorrectFilesAlert} severity="error">
          {`Файл${
            incorrectFiles?.length === 1 ? "" : "ы"
          } не являются изображением: ${incorrectFiles?.join(", ")}`}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
