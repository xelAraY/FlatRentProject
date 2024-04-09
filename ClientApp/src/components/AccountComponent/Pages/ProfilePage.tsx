import { Avatar, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { Button } from "src/shared";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserInfo } from "src/interfaces/UserInfo";

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
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  // const [firstLoad, setFirstLoad] = useState(true);

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
          <Stack flexDirection={"row"} spacing={14} useFlexGap>
            <Grid container>
              <Grid item sm={4} xs={12}>
                <Typography>Имя</Typography>
              </Grid>
              <Grid item sm={8} xs={12}>
                <Typography>
                  {userInfo?.name ? userInfo.name : "Неизвестно"}
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item sm={8} xs={12}>
                <Typography>{userInfo?.email}</Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Typography>Номер телефона</Typography>
              </Grid>
              <Grid item sm={8} xs={12}>
                <Typography>{userInfo?.phoneNumber}</Typography>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
