import { MapStepFormikValues, WayType } from "./constants";
import * as Yup from "yup";

export const getInitialMapStepValues = (): MapStepFormikValues => {
  return {};
};

export const mapStepValidationSchema = Yup.object().shape({
  region: Yup.string().required("Введите область"),
  city: Yup.string().required("Введите город"),
  street: Yup.string().required("Введите улицу"),
  houseNumber: Yup.string().required("Введите номер дома"),
  metroParams: Yup.array()
    .of(
      Yup.object().shape({
        station: Yup.object({
          name: Yup.string(),
          color: Yup.string(),
        }).required("Выберите станцию метро"),
        wayType: Yup.string()
          .oneOf(Object.values(WayType), "Неверное значение")
          .required("Выберите тип пути"),
        minutes: Yup.number()
          .typeError("Неверное значение")
          .moreThan(0, "Неверное значение")
          .lessThan(30, "Неверное значение")
          .required("Введите количество минут"),
      })
    )
    .nullable(),
});
