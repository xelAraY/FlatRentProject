import {
  Avatar,
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
import { UserInfo } from "src/interfaces/UserInfo";
import UpdateIcon from "@mui/icons-material/Update";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const wordsInName = name.split(" ");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${wordsInName[0][0]}${
      wordsInName.length > 1 ? wordsInName[1][0] : ""
    }`,
  };
}

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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickName: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [oldInfo, setOldInfo] = useState<UserInfo>({
    nickName: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [infoChanged, setInfoChanged] = useState(false);
  const [error, setError] = useState(false);
  // const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    let areEqual = true;
    for (const key in oldInfo) {
      if (oldInfo[key as keyof UserInfo] !== userInfo[key as keyof UserInfo]) {
        areEqual = false;
      }
    }
    setInfoChanged(!areEqual);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      fetch(`api/account/getAvatarImage/${userInfo?.nickName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch avatar data: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setAvatarUrl(data.avatarImageUrl);
        })
        .catch((error) => {
          console.error("Error fetching avatar data:", error);
        });
      // setFirstLoad(true);
    }
    console.log("userInfo: ", userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (isLoggedIn()) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        console.log("tokenInfo: ", decodedToken);
        setUserInfo(decodedToken);
        setOldInfo(decodedToken);
      }
    } else {
      navigate("/sign-in");
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const src = event.target?.result;
      setAvatarUrl(src as string);
    };
  };

  const updateAvatarImage = async () => {
    if (userInfo) {
      try {
        await fetch("api/account/updateProfileImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userInfo.nickName,
            imageUrl: avatarUrl,
          }),
        });
      } catch (error) {
        console.error("Произошла ошибка ", error);
      }
    }
  };

  useEffect(() => {
    // if (firstLoad) {
    //   setFirstLoad(false);
    //   return;
    // }
    updateAvatarImage();
  }, [avatarUrl]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: event.target.value,
    }));
  };

  const handleSurNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      surname: event.target.value,
    }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
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
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      gender: event.target.value as string,
    }));
  };

  const handleUpdateUserInfo = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Stack spacing={2} alignItems={"center"} padding={2}>
            {avatarUrl !== "" ? (
              <Avatar
                src={avatarUrl}
                sx={{ width: 160, height: 160, fontSize: "50px" }}
              />
            ) : (
              <Avatar
                {...stringAvatar(userInfo ? userInfo.nickName : "User")}
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
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={() => setAvatarUrl("")}
              color="error"
              style={{ fontSize: "16px" }}
            >
              Удалить
            </Button>
            <Stack alignItems={"center"}>
              <Typography variant="h4" fontWeight={600}>
                {userInfo?.nickName}
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
                    value={userInfo?.name}
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
                    value={userInfo?.surname}
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
                    value={userInfo?.email}
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
                      userInfo?.phoneNumber.length > 4
                        ? userInfo?.phoneNumber.substring(4)
                        : ""
                    }
                    onChange={handlePhoneChange}
                    size="small"
                    error={error}
                    helperText={
                      error ? "Номер телефона должен содержать 13 цифр" : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+375</InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Stack spacing={"5px"}>
                  <Typography>Пол</Typography>
                  <Select
                    value={userInfo.gender}
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
                    <MenuItem disabled value="">
                      Не указано
                    </MenuItem>
                    <MenuItem value={"Мужской"}>Мужской</MenuItem>
                    <MenuItem value={"Женский"}>Женский</MenuItem>
                  </Select>
                </Stack>
              </Grid>
            </Grid>
            <Button
              disabled={infoChanged && !error ? false : true}
              startIcon={<UpdateIcon />}
              variant="contained"
              onClick={handleUpdateUserInfo}
            >
              Обновить
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
