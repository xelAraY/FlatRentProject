import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, Stack, SvgIcon, Typography } from "@mui/material";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { FlatPreview } from "./Components/FlatPreview";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { NoFoundObject } from "./Components/NoFoundObject";
import { MetroSvg } from "src/shared";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

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
  "Ближайшее метро",
  "Предочтения при сдаче",
  "Тип плиты",
  "Предоплата",
  "Коммунальные платежи",
  "Срок сдачи",
  "Дата последнего обновления",
];

export const ComparisonsPage = () => {
  const [comparisonObjects, setComparisonObjects] = useState<
    RentObjectInformation[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formLayout = (values: any[] | undefined) => {
    return (
      <Stack>
        {values && values.length > 0 ? (
          <>
            {values.map((value, index) => (
              <Typography key={index}>{value}</Typography>
            ))}
          </>
        ) : (
          <Typography fontSize={14}>{`—`}</Typography>
        )}
      </Stack>
    );
  };

  const fetchData = async (flatId: number) => {
    return await fetch(`api/flat/${flatId}`).then((data) => data.json());
  };

  const getComparisonObjects = async () => {
    if (isLoggedIn()) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwtDecode(token);

          setLoading(true);
          const response = await fetch(
            `api/account/getComparisonObjects/${decodedToken.nickname}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            let compareObjects: RentObjectInformation[] = [];
            for (let i = 0; i < data.length; i++) {
              await fetchData(data[i]).then((object) => {
                compareObjects.push(object[0]);
              });
            }
            setComparisonObjects(compareObjects);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    getComparisonObjects();
  }, []);

  console.log(comparisonObjects);

  return (
    <Stack>
      {/* <Stack flexDirection="row" justifyContent="space-evenly">
        {Array.from({ length: 4 }).map((_, index) => (
          <Button key={index}>{`Добавить объект`}</Button>
        ))}
      </Stack> */}
      {loading ? (
        <Stack alignItems={"center"} height={"100%"}>
          <CircularProgress />1
        </Stack>
      ) : (
        <>
          {comparisonObjects.length === 0 ? (
            <Stack alignItems={"center"} height={"100%"}>
              <NoFoundObject
                headerText="На данный момент ваш список сравнений пуст"
                descriptionText="Для добавления объявления к сравнению перейдите на страницу объявления. Объявление так же должно быть в вашем спсике избранных объявлений"
              />
            </Stack>
          ) : (
            <Paper sx={{ width: "100%" }}>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width="10%">
                        Параметр
                      </TableCell>
                      {comparisonObjects.map((rentObject, index) => (
                        <TableCell
                          sx={{
                            borderLeft: "1px solid rgba(224, 224, 224, 1)",
                            width: "30%",
                          }}
                          align="left"
                          key={index}
                        >
                          <FlatPreview
                            rentInformation={rentObject}
                            onCardClick={(flatId: number) =>
                              navigate(`/flats/${flatId}`)
                            }
                            onComparisonDelete={getComparisonObjects}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paramsNames.map((parametr, index) => {
                      let startValue: any;
                      return (
                        <TableRow key={index}>
                          <TableCell align="justify">{parametr}</TableCell>
                          {comparisonObjects.map((item, index) => {
                            let value;
                            let backGroundColor;
                            switch (parametr) {
                              case "Количество комнат":
                                if (index === 0) {
                                  startValue = item.rentObject.roomsCount;
                                } else {
                                  backGroundColor =
                                    startValue !== item.rentObject.roomsCount
                                      ? "#ffecc4"
                                      : "white";
                                }
                                value = item.rentObject.roomsCount;
                                break;
                              case "Цена аренды":
                                value = `${Math.round(
                                  item.rentObject.rentPrice *
                                    item.currency.officialRate
                                )} р./мес.`;
                                break;
                              case "Площадь общая":
                                if (index === 0) {
                                  startValue = item.rentObject.totalArea;
                                } else {
                                  backGroundColor =
                                    startValue !== item.rentObject.totalArea
                                      ? "#ffecc4"
                                      : "white";
                                }
                                value = item.rentObject.totalArea + " м²";
                                break;
                              case "Площадь жилая":
                                if (index === 0) {
                                  startValue = item.rentObject.livingArea;
                                } else {
                                  backGroundColor =
                                    startValue !== item.rentObject.livingArea
                                      ? "#ffecc4"
                                      : "white";
                                }
                                value = item.rentObject.livingArea + " м²";
                                break;
                              case "Площадь кухни":
                                value = item.rentObject.kitchenArea + " м²";
                                break;
                              case "Этаж":
                                value = item.rentObject.floorNumber;
                                break;
                              case "Этажность дома":
                                value = item.rentObject.floorsAmount;
                                break;
                              case "Тип ванной":
                                if (index === 0) {
                                  startValue = item.rentObject.bathroom;
                                } else {
                                  backGroundColor =
                                    startValue !== item.rentObject.bathroom
                                      ? "#ffecc4"
                                      : "white";
                                }
                                value = item.rentObject.bathroom;
                                break;
                              case "Тип балкона":
                                value = item.rentObject.balcony;
                                break;
                              case "Год постройки":
                                value = item.rentObject.constructionYear;
                                break;
                              case "Наличие мебели":
                                if (index === 0) {
                                  startValue = item.rentObject.furniture;
                                } else {
                                  backGroundColor =
                                    startValue !== item.rentObject.furniture
                                      ? "#ffecc4"
                                      : "white";
                                }
                                value = item.rentObject.furniture;
                                break;
                              case "Тип плиты":
                                if (index === 0) {
                                  startValue = item.rentObject.plate;
                                } else {
                                  backGroundColor =
                                    startValue !== item.rentObject.plate
                                      ? "#ffecc4"
                                      : "white";
                                }
                                value = item.rentObject.plate;
                                break;
                              case "Предоплата":
                                value = item.rentObject.prepayment;
                                break;
                              case "Коммунальные платежи":
                                if (index === 0) {
                                  startValue = item.rentObject.rent;
                                } else {
                                  backGroundColor =
                                    startValue !== item.rentObject.rent
                                      ? "#ffecc4"
                                      : "white";
                                }
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
                                value = formLayout(item.appliances);
                                break;
                              case "Список удобств":
                                value = formLayout(item.additionalInformations);
                                break;
                              case "Предочтения при сдаче":
                                value = formLayout(item.preferences);
                                break;
                              case "Ближайшее метро":
                                value = (
                                  <Stack gap={1}>
                                    {item.metroStations &&
                                    item.metroStations.length > 0 ? (
                                      <>
                                        {item.metroStations.map(
                                          (station, index) => (
                                            <Stack
                                              flexDirection="row"
                                              gap="0.5rem"
                                              key={index}
                                            >
                                              <Stack
                                                flexDirection="row"
                                                gap="0.1rem"
                                              >
                                                <SvgIcon
                                                  color={station.color as any}
                                                  viewBox="0 0 17 16"
                                                >
                                                  <MetroSvg />
                                                </SvgIcon>
                                                <Typography variant="body1">
                                                  {station.name}
                                                </Typography>
                                              </Stack>

                                              <Stack
                                                flexDirection="row"
                                                key={index}
                                              >
                                                {station.wayType ===
                                                "Пешком" ? (
                                                  <DirectionsWalkOutlinedIcon
                                                    style={{
                                                      height: "1.5rem",
                                                    }}
                                                  />
                                                ) : (
                                                  <DirectionsCarIcon
                                                    style={{
                                                      height: "1.5rem",
                                                    }}
                                                  />
                                                )}

                                                <Typography variant="body1">{`${station.travelTime} минут`}</Typography>
                                              </Stack>
                                            </Stack>
                                          )
                                        )}
                                      </>
                                    ) : (
                                      <Typography
                                        fontSize={14}
                                      >{`—`}</Typography>
                                    )}
                                  </Stack>
                                );
                                break;
                              default:
                                value = "";
                            }
                            return (
                              <TableCell
                                sx={{
                                  backgroundColor: backGroundColor,
                                  borderLeft:
                                    "1px solid rgba(224, 224, 224, 1)",
                                }}
                                key={index}
                              >
                                {value || "—"}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </>
      )}
    </Stack>
  );
};
