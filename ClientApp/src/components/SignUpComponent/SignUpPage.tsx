import { Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "src/shared";
import "./../HomeComponent/NavMenuComponent/NavMenu.css";
import { NavLink, useNavigate } from "react-router-dom";

interface Errors {
  usrNameMiss: boolean;
  emailMiss: boolean;
  phoneNumberMiss: boolean;
  passMiss: boolean;
}

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null); // добавить проверку для каждого поля
  const [responceMsg, setResponceMsg] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !email || !phoneNumber || !password) {
      setIsError(true);
      setResponceMsg("Заполните все обязательные поля");
      return;
    }

    const userData = {
      username,
      fullName,
      email,
      phoneNumber,
      password,
    };

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.status === 422) {
        console.log(data);
        //setErrors(data);
        return;
      }

      setResponceMsg(data.message);
      if (response.ok) {
        console.log("Успешная регистрация");
        setIsError(false);
        navigate("/");
      } else {
        setIsError(true);
        console.error("Ошибка регистрации: ", responceMsg);
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  let textColor = isError ? "red" : "black";

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: "#F6F5F5",
        height: "100vh",
        backgroundImage: `url("./../../../home-page-image.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          padding: "1.5rem",
          height: "auto",
          borderRadius: "0.375rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <Stack direction="row" alignItems="flex-end" mt={-0.8}>
            <img
              src="./../../../FIcon.png"
              style={{ width: "50px", height: "50px" }}
            />
            <Typography
              variant="h4"
              style={{ marginLeft: "-10px" }}
              lineHeight={1}
            >
              latRent
            </Typography>
          </Stack>
        </NavLink>
        <Typography variant="h4" textAlign="center" mt={2}>
          Регистрация
        </Typography>
        <Stack flexDirection="column" height="auto" width="270px">
          <TextField
            id="usr_name"
            label="Имя пользователя"
            variant="outlined"
            name="user_name"
            placeholder="Иван"
            required
            helperText={errors?.usrNameMiss ? "Имя обязательно" : ""}
            error={errors?.usrNameMiss}
            value={username}
            onChange={handleUsernameChange}
            size="small"
            style={{ marginTop: "15px" }}
          />

          <TextField
            id="full_name"
            label="Полное имя"
            variant="outlined"
            name="full_name"
            placeholder="Иван Иванов"
            value={fullName}
            onChange={handleFullNameChange}
            size="small"
            style={{ marginTop: "15px" }}
          />
          <TextField
            id="email"
            label="Адрес электронной почты"
            variant="outlined"
            name="email"
            type="email"
            placeholder="name@gmail.com"
            required
            helperText={errors?.emailMiss ? "Почта обязательна" : ""}
            error={errors?.emailMiss}
            value={email}
            onChange={handleEmailChange}
            size="small"
            style={{ marginTop: "15px" }}
          />
          <TextField
            id="phone_number"
            label="Номер телефона"
            variant="outlined"
            name="phone_number"
            placeholder="+375(29)1111111"
            required
            helperText={
              errors?.phoneNumberMiss ? "Номер телефона обязателен" : ""
            }
            error={errors?.phoneNumberMiss}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            size="small"
            style={{ marginTop: "15px" }}
          />
          <TextField
            id="password"
            label="Пароль"
            variant="outlined"
            name="password"
            type="password"
            required
            helperText={errors?.passMiss ? "Пароль обязателен" : ""}
            error={errors?.passMiss}
            value={password}
            onChange={handlePasswordChange}
            size="small"
            style={{ marginTop: "15px" }}
          />
          <Button
            variant="contained"
            size="large"
            style={{
              marginTop: "15px",
              background: "linear-gradient(to right, #ff9a2e, #a00cfe)",
            }}
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </Button>
          <Typography color={textColor} fontFamily="serif" marginTop="5px">
            {responceMsg}
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};
