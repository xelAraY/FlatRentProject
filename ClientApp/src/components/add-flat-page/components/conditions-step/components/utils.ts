import {
  ConditionsStepFormikValues,
  CurrencyType,
  PrepaymentType,
  RentType,
  RentalPeriodType,
} from "./constants";
import * as Yup from "yup";

export const getInitialConditionsStepValues =
  (): ConditionsStepFormikValues => {
    return { preferences: [] };
  };

export const conditionsStepValidationSchema = Yup.object().shape({
  currency: Yup.string()
    .oneOf(Object.values(CurrencyType), "Неверный тип")
    .required("Выберите тип валюты"),
  rentPrice: Yup.number()
    .typeError("Неверное значение")
    .moreThan(0, "Неверное значение")
    .lessThan(100000000, "Неверное значение")
    .required("Введите стоимость аренды"),
  rent: Yup.string()
    .oneOf(Object.values(RentType), "Неверный тип")
    .required("Выберите вид коммунальных платежей"),
  rentalPeriod: Yup.string()
    .oneOf(Object.values(RentalPeriodType), "Неверный тип")
    .required("Выберите срок сдачи"),
  prepayment: Yup.string()
    .oneOf(Object.values(PrepaymentType), "Неверный тип")
    .nullable(),
  preferences: Yup.array().of(Yup.string()).nullable(),
});
