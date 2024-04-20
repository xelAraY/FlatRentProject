import {
  BalconyType,
  BathroomType,
  GeneralStepFormikValues,
} from "./constants";
import * as Yup from "yup";

export const getInitialGeneralStepValues = (): GeneralStepFormikValues => {
  return {};
};

export const generalStepValidationSchema = Yup.object().shape({
  roomsCount: Yup.number().required("Выберите количество комнат"),
  floor: Yup.number()
    .typeError("Неверное значение")
    .moreThan(0, "Неверное значение")
    .lessThan(100, "Этаж не может быть таким большим:)")
    .required("Введите номер этажа"),
  floorAmount: Yup.number()
    .typeError("Неверное значение")
    .moreThan(0, "Неверное значение")
    .lessThan(100, "Этаж не может быть таким большим:)")
    .required("Введите этажность дома")
    .test(
      "invalid",
      "Этажность не может быть меньше указанного этажа",
      (value, context) => {
        return value && context.parent.floor
          ? value >= context.parent.floor
          : true;
      }
    ),
  constructionYear: Yup.number()
    .typeError("Неверное значение")
    .moreThan(1700, "Год не может быть таким давним:)")
    .lessThan(new Date().getFullYear() + 1, "Год не может быть таким большим:)")
    .nullable(),
  bathroomType: Yup.string()
    .nullable()
    .oneOf(Object.values(BathroomType), "Неверный тип"),
  balconyType: Yup.string()
    .nullable()
    .oneOf(Object.values(BalconyType), "Неверный тип"),
});
