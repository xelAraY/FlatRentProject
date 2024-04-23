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
  const { values, setFieldValue, isValid, errors, validateForm } =
    useFormikContext<MapStepFormikValues>();

  const [mapData, setMapData] = useState({
    center: [53.900487, 27.555324],
    zoom: 12,
  });
  const [newCoords, setNewCoords] = useState([53.900487, 27.555324]);
  const [enableFetch, setEnableFetch] = useState(false);
  const [automaticChange, setAutomaticChange] = useState(false);

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
    console.log("data", data);
    const addresInfo =
      data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
        ?.metaDataProperty?.GeocoderMetaData?.Address?.Components;
    console.log(addresInfo);

    const newRegion =
      addresInfo.find((el: any) => el.kind === "province")?.name || "";
    const newCity =
      addresInfo.find((el: any) => el.kind === "locality")?.name || "";
    const newStreet =
      addresInfo.find((el: any) => el.kind === "street")?.name || "";
    const newHouse =
      addresInfo.find((el: any) => el.kind === "house")?.name || "";

    setFieldValue(
      "region",
      newRegion === "Минск" ? "Минская область" : newRegion
    );
    setFieldValue("city", newCity);
    setFieldValue("street", newStreet);
    setFieldValue("houseNumber", newHouse);
    const newValues: MapStepFormikValues = {
      ...values,
      city: newCity,
      street: newStreet,
      houseNumber: newHouse,
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
                console.log("set");
                const newCoords = event.get("target").geometry.getCoordinates();
                setNewCoords(newCoords);
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
          <Stack flexDirection="row" gap="1rem" alignItems="center">
            <Stack flexDirection="row" gap="1rem" width="100%">
              <FormikControlMui
                name={`metroParams[${index}].station`}
                label="f"
                fullWidth
                required
                key={index}
              >
                <MetroStation
                  setFieldValue={(newValue: MetroStationParams) =>
                    setFieldValue(`metroParams[${index}].station`, newValue)
                  }
                />
              </FormikControlMui>
              <FormikControlMui
                name={`metroParams[${index}].wayType`}
                label="ff"
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
                label="fff"
                fullWidth
                required
                key={index}
              >
                <TextField placeholder="Введите " />
              </FormikControlMui>
            </Stack>
            <Box>
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
      <Button
        variant="contained"
        onClick={() => {
          const newMetroParams = values.metroParams
            ? [...values.metroParams]
            : [];
          newMetroParams.push({});
          setFieldValue("metroParams", newMetroParams);
        }}
        sx={{ mt: 1, mr: 1 }}
      >
        Добавить станцию
      </Button>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={(e) => {
              e?.stopPropagation();
              setActiveStep(currentStepIndex + 1);
            }}
            type="submit"
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
