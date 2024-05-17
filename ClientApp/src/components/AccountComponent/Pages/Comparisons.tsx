import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Stack, Typography } from "@mui/material";
import { Button } from "src/shared";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { FlatPreviewCard } from "src/components/HomeComponent/ListingComponent/FlatPreviewCard";
import { FlatPreview } from "./Components/FlatPreview";
import { useNavigate } from "react-router-dom";

const paramsNames = [
  "Цена аренды",
  "Количество комнат",
  "Площадь общая",
  "Площадь жилая",
  "Площадь кухни",
  "Этаж",
  "Этажность дома",
  "Тип ванной",
  "Тип балкона",
  "Год постройки",
  "Наличие мебели",
  "Бытовая техника",
  "Список удобств",
  "Тип плиты",
  "Предоплата",
  "Коммунальные платежи",
  "Срок сдачи",
  "Дата последнего обновления",
];

export const ComparisonsPage = () => {
  const [comparisonObjects, setComparisonObjects] = React.useState<
    RentObjectInformation[]
  >([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async (id: number) => {
      return await fetch(`api/flat/${id}`).then((data) => data.json());
    };

    fetchData(225).then((data) => {
      setComparisonObjects((prevObjects) => [...prevObjects, data[0]]);
    });

    fetchData(229).then((data) => {
      setComparisonObjects((prevObjects) => [...prevObjects, data[0]]);
    });

    fetchData(225).then((data) => {
      setComparisonObjects((prevObjects) => [...prevObjects, data[0]]);
    });

    fetchData(229).then((data) => {
      setComparisonObjects((prevObjects) => [...prevObjects, data[0]]);
    });
  }, []);

  console.log(comparisonObjects);

  return (
    <>
      {/* <Stack flexDirection="row" justifyContent="space-evenly">
        {Array.from({ length: 4 }).map((_, index) => (
          <Button key={index}>{`Добавить объект`}</Button>
        ))}
      </Stack> */}

      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Параметр</TableCell>
                {comparisonObjects.map((rentObject, index) => (
                  <TableCell
                    sx={{
                      borderLeft: "1px solid rgba(224, 224, 224, 1)",
                      minWidth: "15rem",
                    }}
                    align="left"
                    key={index}
                  >
                    <FlatPreview
                      rentInformation={rentObject}
                      onCardClick={(flatId: number) =>
                        navigate(`/flats/${flatId}`)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paramsNames.map((parametr, index) => (
                <TableRow key={index}>
                  <TableCell align="justify">{parametr}</TableCell>
                  {comparisonObjects.map((item, index) => {
                    let value;
                    let backGroundColor;
                    switch (parametr) {
                      case "Количество комнат":
                        value = item.rentObject.roomsCount;
                        const isDifferent =
                          index !== 0 &&
                          value !==
                            comparisonObjects[
                              (index + 1) % comparisonObjects.length
                            ].rentObject.roomsCount;
                        backGroundColor = isDifferent ? "#ffecc4" : "white";
                        break;
                      case "Цена аренды":
                        value = `${Math.round(
                          item.rentObject.rentPrice * item.currency.officialRate
                        )} р./мес.`;
                        break;
                      case "Площадь общая":
                        value = item.rentObject.totalArea;
                        break;
                      case "Площадь жилая":
                        value = item.rentObject.livingArea;
                        break;
                      case "Площадь кухни":
                        value = item.rentObject.kitchenArea;
                        break;
                      case "Этаж":
                        value = item.rentObject.floorNumber;
                        break;
                      case "Этажность дома":
                        value = item.rentObject.floorsAmount;
                        break;
                      case "Тип ванной":
                        value = item.rentObject.bathroom;
                        break;
                      case "Тип балкона":
                        value = item.rentObject.balcony;
                        break;
                      case "Год постройки":
                        value = item.rentObject.constructionYear;
                        break;
                      case "Наличие мебели":
                        value = item.rentObject.furniture;
                        break;
                      case "Тип плиты":
                        value = item.rentObject.plate;
                        break;
                      case "Предоплата":
                        value = item.rentObject.prepayment;
                        break;
                      case "Коммунальные платежи":
                        value = item.rentObject.rent;
                        break;
                      case "Срок сдачи":
                        value = item.rentObject.rentalPeriod;
                        break;
                      case "Дата последнего обновления":
                        value = `${new Date(
                          item.rentObject.updatedAt
                        ).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })} в ${new Date(
                          item.rentObject.updatedAt
                        ).toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}`;
                        break;
                      case "Бытовая техника":
                        value = (
                          <Stack>
                            {item.appliances?.map((appliance) => (
                              <Typography>{appliance}</Typography>
                            ))}
                          </Stack>
                        );
                        break;
                      case "Список удобств":
                        value = item.additionalInformations?.join(", ");
                        break;
                      default:
                        value = "";
                    }
                    return (
                      <TableCell
                        sx={{
                          backgroundColor: backGroundColor,
                          borderLeft: "1px solid rgba(224, 224, 224, 1)",
                        }}
                        key={index}
                      >
                        {value || "—"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
