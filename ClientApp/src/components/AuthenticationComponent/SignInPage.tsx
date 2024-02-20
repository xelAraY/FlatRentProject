import { Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button } from "src/shared";
import "./../HomeComponent/NavMenuComponent/NavMenu.css";
import { NavLink, useNavigate } from 'react-router-dom';

export const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(true);
  const [responceMsg, setResponceMsg] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setIsError(true);
      setResponceMsg("Заполните все обязательные поля");
      return;
    }

    const userData = {
      username,
      password
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Успешная регистрация');
        localStorage.setItem('token', data.token);
        setIsError(false);
        navigate("/");
      } else {
        setIsError(true);
        setResponceMsg(data.message);
        console.error('Ошибка регистрации: ', responceMsg);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  let textColor = isError ? "red" : "black";

  return (
    <Stack alignItems="center" justifyContent="center" style={{ backgroundColor: "#F6F5F5", height: "100vh" }}>
      <Paper elevation={12} sx={{ padding: '1.5rem', height: 'auto', borderRadius: '0.375rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <Stack direction="row" alignItems='flex-end' mt={-0.8}>
            <img src="./../../../FIcon.png" style={{ width: '50px', height: '50px' }} />
            <Typography variant='h4' style={{ marginLeft: '-10px' }} lineHeight={1}>latRent</Typography>
          </Stack>
        </NavLink>
        <Typography variant='h4' textAlign='center' mt={2}>Вход</Typography>
        <Stack flexDirection="column" height="auto" width="270px">
          <TextField
            id="usr_name"
            label="Имя пользователя"
            variant="outlined"
            name="user_name"
            placeholder='Иван'
            required
            value={username}
            onChange={handleUsernameChange}
            size="small"
            style={{ marginTop: "15px" }} />
          <TextField
            id="password"
            label="Пароль"
            variant="outlined"
            name="password"
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            size="small"
            style={{ marginTop: "15px" }}
          />
          <Button variant="contained" size="large" style={{ marginTop: "15px", background: 'linear-gradient(to right, #ff9a2e, #a00cfe)' }} onClick={handleSubmit}>Войти</Button>
          <Typography color={textColor} fontFamily="serif" marginTop="5px">{responceMsg}</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

