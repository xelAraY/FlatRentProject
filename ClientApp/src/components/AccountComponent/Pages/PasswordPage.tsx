import { Paper, Stack, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { Button } from "src/shared";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import { FormikControlMui } from "src/formik-control";

export const PasswordPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Введите старый пароль"),
    newPassword: Yup.string()
      .required("Введите новый пароль")
      .min(8, "Пароль должен содержать как минимум 8 символов")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Пароли должны совпадать")
      .required("Подтвердите новый пароль"),
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/sign-in");
    }
  }, []);

  // const handleUpdateUserPassword = async () => {
  //   if (isLoggedIn()) {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch("api/account/password", {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(userPasswords),
  //       });
  //       const data = await response.json();
  //       if (response.ok) {
  //         console.log("Successfully updated ", data.message);
  //       } else {
  //         console.error("Error while updating user data ", data.message);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     navigate("/sign-in");
  //   }
  // };

  const handleSubmit = (values: FormikValues) => {
    //console.log(values);
  };

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <Paper elevation={3} style={{ padding: 20, height: "100%" }}>
              <Stack spacing={3} width={"30%"}>
                <FormikControlMui name="oldPassword" label="Старый пароль">
                  <TextField variant="outlined" type="password" size="small" />
                </FormikControlMui>
                <FormikControlMui
                  name="newPassword"
                  label="Новый пароль пароль"
                >
                  <TextField variant="outlined" type="password" size="small" />
                </FormikControlMui>
                <FormikControlMui
                  name="confirmPassword"
                  label="Подтвердите пароль"
                >
                  <TextField variant="outlined" type="password" size="small" />
                </FormikControlMui>
                <Button variant="contained" type="submit">
                  Сменить пароль
                </Button>
              </Stack>
            </Paper>
          </Form>
        );
      }}
    </Formik>
  );
};
