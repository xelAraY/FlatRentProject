import { AreaStepFormikValues } from "./constants";
import * as Yup from "yup";

export const getInitialAreaStepValues = (): AreaStepFormikValues => {
  return {};
};

export const areaStepValidationSchema = Yup.object().shape({
  totalArea: Yup.lazy(() =>
    Yup.number()
      .typeError("Неверное значение")
      .moreThan(0, "Неверное значение")
      .lessThan(300, "Неверное значение")
      .required("Введите общую площадь квартиры")
      .test(
        "areaCheck1",
        "Общая площадь не может быть меньше жилой + площади кухни",
        (value, context) => {
          console.log(
            value >=
              (context.parent.livingArea || 0) +
                (context.parent.kitchenArea || 0)
          );
          console.log(
            value,
            context.parent.livingArea || 0 + context.parent.kitchenArea || 0
          );
          return (
            value >=
            (context.parent.livingArea || 0) + (context.parent.kitchenArea || 0)
          );
        }
      )
  ),
  livingArea: Yup.lazy(
    () =>
      Yup.number()
        .typeError("Неверное значение")
        .moreThan(0, "Неверное значение")
        .lessThan(300, "Неверное значение")
        .required("Введите жилую площадь квартиры")
    // .test("areaCheck2", "Ошибка", (value, context) => {
    //   return (
    //     (context.parent.totalArea || 0) >=
    //     value + (context.parent.kitchenArea || 0)
    //   );
    // })
  ),
  kitchenArea: Yup.number()
    .typeError("Неверное значение")
    .moreThan(0, "Неверное значение")
    .lessThan(300, "Неверное значение")
    .required("Введите площадь кухни"),
  // .test("areaCheck3", "Ошибка", (value, context) => {
  //   return (
  //     (context.parent.totalArea || 0) >=
  //     value + (context.parent.livingArea || 0)
  //   );
  // }),
});
