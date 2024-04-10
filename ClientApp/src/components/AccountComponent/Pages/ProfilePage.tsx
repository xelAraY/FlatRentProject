import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { Button } from "src/shared";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { stringAvatar } from "src/helpFunctions/avatarColor";
import { UserData } from "src/interfaces/UserData";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    gender: "",
    avatarUrl: "",
  });
  const [oldData, setOldData] = useState<UserData>({
    nickname: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    gender: "",
    avatarUrl: "",
  });
  const [dataChanged, setDataChanged] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let areEqual = true;
    for (const key in oldData) {
      if (oldData[key as keyof UserData] !== userData[key as keyof UserData]) {
        areEqual = false;
      }
    }
    setDataChanged(!areEqual);
  }, [userData]);

  useEffect(() => {
    const getUserData = async () => {
      if (isLoggedIn()) {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const decodedToken: any = jwtDecode(token);

            setLoading(true);
            await fetch(`api/account/getUserData/${decodedToken.nickname}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Failed to fetch user data: ${response.status} ${response.statusText}`
                  );
                }
                return response.json();
              })
              .then((data) => {
                setUserData(data);
                setOldData(data);
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate("/sign-in");
      }
    };

    getUserData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const src = String(event.target?.result);
      setUserData((prevUserData) => ({
        ...prevUserData,
        avatarUrl: src,
      }));
    };
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: event.target.value,
    }));
  };

  const handleSurNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      surname: event.target.value,
    }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        phoneNumber: "+375" + event.target.value,
      }));
      if (event.target.value.length !== 9) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      gender: event.target.value as string,
    }));
  };

  const handleUpdateUserData = async () => {
    if (isLoggedIn()) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("api/account/updateUserData", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
          setDataChanged(false);
          console.log("Successfully updated ", data.message);
          window.location.reload();
        } else {
          console.error("Error while updating user data ", data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      {loading ? (
        <Stack alignItems={"center"} height={"100%"}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Stack spacing={2} alignItems={"center"} padding={2}>
                {userData.avatarUrl !== "" ? (
                  <Avatar
                    src={userData.avatarUrl}
                    sx={{ width: 160, height: 160, fontSize: "50px" }}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(userData ? userData.nickname : "User")}
                    style={{ width: 160, height: 160, fontSize: "50px" }}
                  />
                )}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<UploadFileIcon />}
                  style={{ fontSize: "16px" }}
                >
                  Изменить аватар
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      avatarUrl: "",
                    }));
                  }}
                  color="error"
                  style={{ fontSize: "16px" }}
                >
                  Удалить
                </Button>
                <Stack alignItems={"center"}>
                  <Typography variant="h4" fontWeight={600}>
                    {userData.nickname}
                  </Typography>
                  <Typography variant="h6">Собственник</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={3} style={{ padding: 20, height: "100%" }}>
              <Stack spacing={3} useFlexGap>
                <Grid container rowSpacing={5} columnSpacing={10}>
                  <Grid item sm={6} xs={12}>
                    <Stack spacing={"5px"}>
                      <Typography>Имя</Typography>
                      <TextField
                        variant="outlined"
                        placeholder="Не указано"
                        value={userData.name}
                        onChange={handleNameChange}
                        size="small"
                      />
                    </Stack>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Stack spacing={"5px"}>
                      <Typography>Фамилия</Typography>
                      <TextField
                        variant="outlined"
                        placeholder="Не указано"
                        value={userData.surname}
                        onChange={handleSurNameChange}
                        size="small"
                      />
                    </Stack>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Stack spacing={"5px"}>
                      <Typography>Email</Typography>
                      <TextField
                        variant="outlined"
                        value={userData.email}
                        disabled
                        size="small"
                      />
                    </Stack>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Stack spacing={"5px"}>
                      <Typography>Номер телефона</Typography>
                      <TextField
                        variant="outlined"
                        placeholder="Не указано"
                        value={
                          userData.phoneNumber.length > 4
                            ? userData?.phoneNumber.substring(4)
                            : ""
                        }
                        onChange={handlePhoneChange}
                        size="small"
                        error={error}
                        helperText={
                          error ? "Номер телефона должен содержать 13 цифр" : ""
                        }
                        sx={{
                          ".MuiFormHelperText-root": {
                            top: "2.5rem",
                            position: "absolute",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              +375
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Stack spacing={"5px"}>
                      <Typography>Пол</Typography>
                      <Select
                        value={userData.gender}
                        onChange={handleGenderChange}
                        size="small"
                        placeholder="Не указано"
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected === "") {
                            return (
                              <div style={{ color: "#b0b0b0" }}>Не указано</div>
                            );
                          }

                          return selected;
                        }}
                      >
                        <MenuItem value={"Мужской"}>Мужской</MenuItem>
                        <MenuItem value={"Женский"}>Женский</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
                <Button
                  disabled={dataChanged && !error ? false : true}
                  startIcon={<UpdateIcon />}
                  variant="contained"
                  onClick={handleUpdateUserData}
                >
                  Обновить
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};
