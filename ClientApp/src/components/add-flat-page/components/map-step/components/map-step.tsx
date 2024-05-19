import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  StandardTextFieldProps,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { MapStepProps, MetroStationParams } from "./constants";
import { FormikControlMui } from "src/formik-control";
import { useFormikContext } from "formik";
import { MapStepFormikValues } from "./constants";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import {
  MetroStation,
  AutocompleteWrapper,
  WayTypeComponent,
} from "./components";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const regionsTypes = [
  "Брестская область",
  "Витебская область",
  "Гомельская область",
  "Гродненская область",
  "Минская область",
  "Могилевская область",
];

export const MapStep: React.FC<MapStepProps> = ({
  setActiveStep,
  currentStepIndex,
  setCommonMapValues,
}) => {
  const {
    values,
    setFieldValue,
    isValid,
    setFieldTouched,
    errors,
    validateForm,
  } = useFormikContext<MapStepFormikValues>();

  const [mapData, setMapData] = useState({
    center: [53.900487, 27.555324],
    zoom: 12,
  });
  const [newCoords, setNewCoords] = useState([53.900487, 27.555324]);
  const [enableFetch, setEnableFetch] = useState(false);
  const [automaticChange, setAutomaticChange] = useState(false);

  const [metroStationsInfo, setMetroStationsInfo] = React.useState<
    MetroStationParams[]
  >([]);

  React.useEffect(() => {
    const getAllMetroStationsInfo = async () => {
      try {
        const response = await fetch("api/addNewListing/getAllStationsInfo");
        const data = await response.json();
        if (response.ok) {
          setMetroStationsInfo(data);
        } else {
          console.log("Ошибка ", data.message);
        }
      } catch (error) {
        console.error("Ошибка: ", error);
      }
    };
    getAllMetroStationsInfo();
  }, []);

  React.useEffect(() => {
    setMapData((prevState) => {
      return {
        ...prevState,
        center: newCoords,
      };
    });
  }, [newCoords]);

  React.useEffect(() => {
    setCommonMapValues?.(values);
  }, [values]);

  const fetchAddress = async (newCoords: [number, number]) => {
    const coords = [...newCoords];
    const res = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=9b519c88-ed0c-45e5-934a-7132b8bc1451&geocode=${coords
        .reverse()
        .join(",")}&format=json`
    );
    const data = await res.json();
    setAutomaticChange(true);
    console.log("data ", data);

    let region = "";
    let city = "";
    let street = "";
    let house = "";
    let district = "";
    let microdistrict = "";

    data.response.GeoObjectCollection.featureMember.forEach((feature: any) => {
      const addressComponents =
        feature.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;

      addressComponents.forEach((component: any) => {
        if (component.kind === "province" && region === "") {
          region = component.name;
        }
        if (component.kind === "locality" && city === "") {
          city = component.name;
        }
        if (component.kind === "street" && street === "") {
          street = component.name;
        }
        if (component.kind === "house" && house === "") {
          house = component.name;
        }
        if (component.kind === "district") {
          component.name.startsWith("микрорайон")
            ? (microdistrict = component.name)
            : (district = component.name);
        }
      });
    });

    setFieldValue("region", region === "Минск" ? "Минская область" : region);
    setFieldValue("city", city);
    setFieldValue("street", street);
    setFieldValue("houseNumber", house);
    setFieldValue("district", district);
    setFieldValue("microDistrict", microdistrict);
    const newValues: MapStepFormikValues = {
      ...values,
      region: region === "Минск" ? "Минская область" : region,
      city: city,
      street: street,
      houseNumber: house,
      district: district,
      microDistrict: microdistrict,
    };
    validateForm(newValues);
  };

  const fetchCoordinates = async () => {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=9b519c88-ed0c-45e5-934a-7132b8bc1451&geocode=${values.city} ${values.street} ${values.houseNumber}&format=json`
    );
    const data = await response.json();
    const coordinates =
      data.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos
        .split(" ")
        .reverse();
    console.log(coordinates);
    setFieldValue("coordinates", coordinates);
    setNewCoords(coordinates.map((el: any) => Number(el)));
    setAutomaticChange(false);
  };

  // React.useEffect(() => {
  //   enableFetch && fetchAddress();
  // }, [newCoords, enableFetch]);

  // React.useEffect(() => {
  //   if (values.city && values.street) {
  //     setAutomaticChange(false);
  //   }
  // }, [values.city, values.region, values.street, values.houseNumber]);

  // React.useEffect(() => {
  //   !automaticChange && fetchCoordinates();
  // }, [automaticChange]);

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <Stack flexDirection="row" gap="1rem" width="100%">
        <FormikControlMui
          name="region"
          label="Область"
          sx={{ width: "50%" }}
          required
        >
          <AutocompleteWrapper
            value={values.region}
            setNewValue={(newValue) => setFieldValue("region", newValue)}
            options={regionsTypes}
            placeholder={"Область"}
          />
        </FormikControlMui>
        <FormikControlMui
          name="city"
          label="Город"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите город" />
        </FormikControlMui>
      </Stack>

      <Stack flexDirection="row" gap="1rem" width="100%">
        <FormikControlMui
          name="street"
          label="Улица"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите улицу" />
        </FormikControlMui>
        <FormikControlMui
          name="houseNumber"
          label="Номер дома"
          sx={{ width: "50%" }}
          required
        >
          <TextField placeholder="Введите номер дома" />
        </FormikControlMui>
        {/* <Button onClick={() => setFieldValue("metroParams[0].station", "11")}>
          ddd
        </Button>
        <Button onClick={() => setFieldValue("metroParams[0]", undefined)}>
          ddd
        </Button> */}
      </Stack>

      <Stack flexDirection="row" gap="1rem" width="100%">
        <FormikControlMui name="district" label="Район" sx={{ width: "50%" }}>
          <TextField placeholder="Введите район" />
        </FormikControlMui>
        <FormikControlMui
          name="microDistrict"
          label="Микрорайон"
          sx={{ width: "50%" }}
        >
          <TextField placeholder="Введите микрорайон" />
        </FormikControlMui>
      </Stack>
      <Button onClick={() => fetchCoordinates()}>ChangeMarker</Button>
      <Stack
        style={{
          height: "40rem",
          width: "100%",
        }}
      >
        <YMaps
          query={{
            // load: "package.full",
            apikey: "9b519c88-ed0c-45e5-934a-7132b8bc1451",
          }}
        >
          <Map
            width={"100%"}
            height={"100%"}
            state={mapData}
            options={{ minZoom: 5 }}
            // instanceRef={(ref: React.SetStateAction<ymaps.Map | undefined>) =>
            //   setMap(ref)
            // }
          >
            <ZoomControl />
            <Placemark
              geometry={newCoords}
              options={{ draggable: true }}
              onDragEnd={(event: any) => {
                const newCoords = event.get("target").geometry.getCoordinates();
                setNewCoords(newCoords);
                setFieldValue("coordinates", newCoords);
                fetchAddress(newCoords);
              }}
              properties={{
                hintContent: newCoords
                  .map((coord) => coord.toString().substring(0, 9))
                  .join(","),
              }}
            />
          </Map>
        </YMaps>
      </Stack>
      {values.metroParams?.map((_, index) => {
        return (
          <Stack flexDirection="row" gap="1rem" alignItems="flex-start">
            <Stack flexDirection="row" gap="1rem" width="100%">
              <FormikControlMui
                name={`metroParams[${index}].station`}
                label="Ближайшее метро"
                fullWidth
                required
                key={index}
              >
                <MetroStation
                  setFieldValue={(newValue: MetroStationParams) =>
                    setFieldValue(`metroParams[${index}].station`, newValue)
                  }
                  stationsInfo={metroStationsInfo}
                />
              </FormikControlMui>
              <FormikControlMui
                name={`metroParams[${index}].wayType`}
                label="Пешком / Транспортом"
                fullWidth
                required
                key={index}
              >
                <WayTypeComponent
                  setNewValue={(newValue: string) =>
                    setFieldValue(`metroParams[${index}].wayType`, newValue)
                  }
                />
              </FormikControlMui>
              <FormikControlMui
                name={`metroParams[${index}].minutes`}
                label="Минут до метро"
                fullWidth
                required
                key={index}
              >
                <TextField placeholder="Минут в пути" />
              </FormikControlMui>
            </Stack>
            <Box pt="2.7rem">
              <IconButton
                onClick={() => {
                  const metroParams = values.metroParams
                    ? [...values.metroParams]
                    : [];
                  const newMetroParams = metroParams.filter(
                    (_, metroIndex) => metroIndex !== index
                  );
                  setFieldValue("metroParams", newMetroParams);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        );
      })}
      {(!values.metroParams || values.metroParams?.length <= 2) && (
        <Box>
          <Button
            variant="text"
            disableTouchRipple
            onClick={() => {
              const newMetroParams = values.metroParams
                ? [...values.metroParams]
                : [];
              newMetroParams.push({});
              setFieldValue("metroParams", newMetroParams);
            }}
            sx={{
              ":hover": {
                background: "transparent !important",
              },
            }}
            startIcon={<AddIcon />}
          >
            Добавить станцию
          </Button>
        </Box>
      )}
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex + 1);
            }}
            sx={{ mt: 1, mr: 1 }}
          >
            Далее
          </Button>
          <Button
            disabled={currentStepIndex === 0}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex - 1);
            }}
            sx={{ mt: 1, mr: 1 }}
          >
            Назад
          </Button>
        </div>
      </Box>
    </Paper>
  );
};
