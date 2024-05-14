import { Box, Paper, Stepper, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "src/shared";
import {
  AdditionalStepWrapper,
  AreaStepWrapper,
  ConditionsStepWrapper,
  ContactsStepWrapper,
  CurrencyType,
  DescriptionStepWrapper,
  GeneralStepWrapper,
  MapStepWrapper,
  MediaStepWrapper,
} from "./components";
import { Form, Formik } from "formik";
import { AddFlatFormikValues } from "./constants";
import { addFlatPageValidationSchema, getInitialValues } from "./utils";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { RentObjectInformation } from "src/interfaces/RentObj";

const steps = [
  {
    label: "Общая информация",
  },
  {
    label: "Карта",
  },
  {
    label: "Фото объекта",
  },
  {
    label: "Дополнительная информация",
  },
  {
    label: "Предпросмотр",
  },
];

export const AddFlatPageWrapper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [initValues, setInitValues] = useState<AddFlatFormikValues | null>(
    null
  );
  const [action, setAction] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const hadleSaveListingData = async (values: AddFlatFormikValues) => {
    if (isLoggedIn()) {
      try {
        const token = localStorage.getItem("token");
        let data = {};
        if (token) {
          const decodedToken: any = jwtDecode(token);
          data = { ...values, userName: decodedToken.nickname };
        }
        const path =
          action === "add"
            ? `api/account/addNewListing/`
            : `api/account/updateListing/${searchParams.get("id")}`;

        await fetch(path, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to add: ${response.status} ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error adding new data:", error);
          });
      } catch (error) {
        console.error("Ошибка ", error);
      } finally {
        navigate("/account/myListings");
      }
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    const getFlatInfo = async () => {
      const flatId = Number(searchParams.get("id"));
      if (flatId) {
        const response = await fetch(`api/flat/${flatId}`);
        const data = await response.json();
        const listingData: RentObjectInformation = data[0];
        const initialValues: AddFlatFormikValues = {
          general: {
            roomsCount: listingData.rentObject.roomsCount,
            floor: listingData.rentObject.floorNumber,
            floorAmount: listingData.rentObject.floorsAmount,
            constructionYear: listingData.rentObject.constructionYear,
            bathroomType: listingData.rentObject.bathroom as any,
            balconyType: listingData.rentObject.balcony as any,
          },
          map: {
            region: listingData.address.region,
            city: listingData.address.city,
            street: listingData.address.street,
            houseNumber: listingData.address.houseNumber,
            district: listingData.address.district,
            microDistrict: listingData.address.microdistrict,
            coordinates: [
              listingData.address.latitude,
              listingData.address.longitude,
            ],
            metroParams: listingData.metroStations?.map((station) => {
              return {
                station: { name: station.name, color: station.color },
                wayType: station.wayType,
                minutes: station.travelTime,
              } as any;
            }),
          },
          area: {
            totalArea: listingData.rentObject.totalArea,
            livingArea: listingData.rentObject.livingArea,
            kitchenArea: listingData.rentObject.kitchenArea,
          },
          additional: {
            furnitureType: listingData.rentObject.furniture as any,
            plateType: listingData.rentObject.plate as any,
            facilities: listingData.additionalInformations as string[],
            appliances: listingData.appliances as string[],
          },
          conditions: {
            currency: CurrencyType.BYN,
            rentPrice: listingData.rentObject.rentPrice,
            rent: listingData.rentObject.rent as any,
            rentalPeriod: listingData.rentObject.rentalPeriod as any,
            prepayment: listingData.rentObject.prepayment as any,
            preferences: listingData.preferences as any,
          },
          description: {
            title: listingData.rentObject.title,
            description: listingData.rentObject.description,
          },
          contactsInfo: {
            contacts: listingData.contacts.map((contact) => {
              return {
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
              };
            }),
          },
          media: { photos: listingData.photos },
        };
        setInitValues(initialValues);
        setAction("edit");
      } else {
        setInitValues(getInitialValues());
        setAction("add");
      }
    };
    getFlatInfo();
  }, []);

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiButton: {
            defaultProps: {
              variant: "outlined",
            },
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
          MuiAutocomplete: {
            styleOverrides: {
              popper: {
                maxHeight: "20rem",
              },
            },
          },
        },
      })}
    >
      {initValues ? (
        <Paper variant="outlined" sx={{ p: "1rem" }}>
          <Formik<AddFlatFormikValues>
            initialValues={initValues}
            onSubmit={(values) => {
              hadleSaveListingData(values);
            }}
            validationSchema={addFlatPageValidationSchema}
            validateOnMount
            validateOnChange
            validateOnBlur
          >
            {({ isValid, values }) => {
              console.log("values ", values);
              return (
                <Form>
                  <Box>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) =>
                        index === 0 ? (
                          <GeneralStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.general}
                          />
                        ) : index === 1 ? (
                          <MapStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.map}
                          />
                        ) : index === 2 ? (
                          <AreaStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.area}
                          />
                        ) : index === 3 ? (
                          <MediaStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.media}
                          />
                        ) : index === 4 ? (
                          <ConditionsStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.conditions}
                          />
                        ) : index === 5 ? (
                          <DescriptionStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.description}
                          />
                        ) : index === 6 ? (
                          <AdditionalStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.additional}
                          />
                        ) : index === 7 ? (
                          <ContactsStepWrapper
                            key={index}
                            myIndex={index}
                            currentStepIndex={activeStep}
                            setActiveStep={setActiveStep}
                            initValues={initValues?.contactsInfo}
                          />
                        ) : (
                          <></>
                        )
                      )}
                      {/* <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box> */}
                    </Stepper>
                    {/* {activeStep === steps.length && (
                    <Paper
                      elevation={2}
                      sx={{ p: 3, background: "rgba(32, 160, 32, 0.238)" }}
                    >
                      <Typography>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                      </Button>
                    </Paper>
                  )} */}
                    <Button disabled={!isValid} type="submit">
                      Сохранить и продолжить
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      ) : (
        <div>Загрузка</div>
      )}
    </ThemeProvider>
  );
};
