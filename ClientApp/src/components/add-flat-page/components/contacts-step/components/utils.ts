import { ContactsStepFormikValues } from "./constants";
import * as Yup from "yup";

export const getInitialContactsStepValues = (): ContactsStepFormikValues => {
  return { contacts: [{ phone: "", name: "", email: "" }] };
};

export const contactsStepValidationSchema = Yup.object().shape({
  contacts: Yup.array()
    .of(
      Yup.object().shape({
        phone: Yup.string()
          .test("phoneCheck", "Введите корректный номер телефона", (value) => {
            return value?.match(/^\+375\d{9}$/) ? true : false;
          })
          .required("Выберите номер телефона"),
        name: Yup.string().required("Введите имя"),
        email: Yup.string()
          .test("emailCheck", "Email адрес некорректный", (value) => {
            return value?.match(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            )
              ? true
              : false;
          })
          .nullable(),
      })
    )
    .required("Введите контактные данные"),
});
