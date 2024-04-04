import { Button } from "src/shared";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { RangeFilter } from "./RangeFilter";
import { SelectFilter } from "./SelectFilter";
import { SwitchFilter } from "./SwitchFilter";
import {
  AdditionalFiltersProps,
  AdditionalFiltersState,
  RangeValue,
} from "src/interfaces/SearchInterfaces";
import { useNavigate, useSearchParams } from "react-router-dom";

export const AdditionalFilters = ({
  additionalFilters,
  count,
  path,
}: AdditionalFiltersProps) => {
  const [open, setOpen] = React.useState(false);
  const [flatsCount, setFlatsCount] = useState(count);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const bathroomOptions = ["Раздельный", "Совмещенный", "2 и более"];
  const balconyOptions = ["Есть", "Нет", "Лоджия"];
  const appliancesOptions = [
    "Телевизор",
    "Холодильник",
    "Стиральная машина",
    "Посудомоечная машина",
    "Кондиционер",
    "Свч-печь",
    "Душевая кабина",
    "Интернет",
    "Мелкая бытовая техника",
  ];
  const rentalPeriodOptions = [
    "Месяц",
    "2 Месяца",
    "3 Месяца",
    "Пол года",
    "Год",
    "Длительный",
  ];
  const preferencesOptions = [
    "Можно с животными",
    "Студентам",
    "Семье",
    "Не курящим",
  ];
  const prepaymentOptions = [
    "Без предоплаты",
    "Месяц",
    "2 Месяца",
    "3 Месяца",
    "Пол года",
  ];

  const [filters, setFilters] =
    useState<AdditionalFiltersState>(additionalFilters);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const getSearchParams = (): string => {
    const paramsArray = [];

    const leftXParam = searchParams.get("leftX");
    const rightXParam = searchParams.get("rightX");
    const bottomYParam = searchParams.get("bottomY");
    const topYParam = searchParams.get("topY");

    const roomsParam = searchParams.get("numberOfRooms");
    const locationsParam = searchParams.get("locations");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const currencyParam = searchParams.get("currencyType");

    leftXParam && paramsArray.push(`leftX=${leftXParam}`);
    rightXParam && paramsArray.push(`rightX=${rightXParam}`);
    bottomYParam && paramsArray.push(`bottomY=${bottomYParam}`);
    topYParam && paramsArray.push(`topY=${topYParam}`);

    roomsParam && paramsArray.push(`numberOfRooms=${roomsParam}`);
    locationsParam && paramsArray.push(`locations=${locationsParam}`);
    minPriceParam && paramsArray.push(`minPrice=${minPriceParam}`);
    maxPriceParam && paramsArray.push(`maxPrice=${maxPriceParam}`);
    currencyParam && paramsArray.push(`currencyType=${currencyParam}`);

    filters.bathroom.length > 0 &&
      paramsArray.push(`bathroomType=${filters.bathroom.join(",")}`);
    filters.balcony.length > 0 &&
      paramsArray.push(`balconyType=${filters.balcony.join(",")}`);
    filters.appliances.length > 0 &&
      paramsArray.push(`appliances=${filters.appliances.join(",")}`);
    filters.preferences.length > 0 &&
      paramsArray.push(`preferences=${filters.preferences.join(",")}`);
    filters.prepayment.length > 0 &&
      paramsArray.push(`prepayment=${filters.prepayment.join(",")}`);

    !!filters.rentalPeriod &&
      paramsArray.push(`rentalPeriod=${filters.rentalPeriod}`);

    filters.floor.valueFrom &&
      paramsArray.push(`floorFrom=${filters.floor.valueFrom}`);
    filters.floor.valueTo &&
      paramsArray.push(`floorTo=${filters.floor.valueTo}`);

    filters.totalArea.valueFrom &&
      paramsArray.push(`totalAreaFrom=${filters.totalArea.valueFrom}`);
    filters.totalArea.valueTo &&
      paramsArray.push(`totalAreaTo=${filters.totalArea.valueTo}`);

    filters.livingArea.valueFrom &&
      paramsArray.push(`livingAreaFrom=${filters.livingArea.valueFrom}`);
    filters.livingArea.valueTo &&
      paramsArray.push(`livingAreaTo=${filters.livingArea.valueTo}`);

    filters.kitchenArea.valueFrom &&
      paramsArray.push(`kitchenAreaFrom=${filters.kitchenArea.valueFrom}`);
    filters.kitchenArea.valueTo &&
      paramsArray.push(`kitchenAreaTo=${filters.kitchenArea.valueTo}`);

    filters.furniture && paramsArray.push(`furniture=${filters.furniture}`);
    filters.withPhotos && paramsArray.push(`photos=${filters.withPhotos}`);

    const queryParams = paramsArray.join("&");

    return queryParams;
  };

  const fetchFlatsCount = async () => {
    const queryParams = getSearchParams();

    const response = await fetch(
      `api/search/filter?${
        queryParams !== "" ? queryParams + "&showData=false" : "showData=false"
      }`
    );
    const data = await response.json();

    if (response.ok) {
      setFlatsCount(data[0].count);
    } else {
      console.error("Ошибка при получении данных", data.message);
    }
  };

  useEffect(() => {
    fetchFlatsCount();
  }, [filters]);

  const handleShowDataClick = () => {
    navigate(`${path}?${getSearchParams()}`);
    handleClose();
  };

  const handleBathroomFilterChange = (options: string[]) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      bathroom: options,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleBalconyFilterChange = (options: string[]) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      balcony: options,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleAppliancesFilterChange = (options: string[]) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      appliances: options,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleRentalPeriodFilterChange = (options: string[]) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      rentalPeriod: options.length > 0 ? options[0] : "",
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handlePreferencesFilterChange = (options: string[]) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      preferences: options,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handlePrepaymentFilterChange = (options: string[]) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      prepayment: options,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleFurnitureCheck = (option: boolean) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      furniture: option,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handlePhotosCheck = (option: boolean) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      withPhotos: option,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleTotalAreaFilterChange = (option: RangeValue) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      totalArea: option,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleLivingAreaFilterChange = (option: RangeValue) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      livingArea: option,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleKitchenAreaFilterChange = (option: RangeValue) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      kitchenArea: option,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleFloorFilterChange = (option: RangeValue) => {
    const newFilters: Partial<AdditionalFiltersState> = {
      floor: option,
    };
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="large"
        color="info"
        onClick={handleClickOpen}
        style={{
          border: "1px solid rgba(0, 0, 0, 0.23)",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        <FilterAltIcon style={{ color: "#616467" }} />
        <Typography fontWeight={600} color={"black"}>
          Дополнительные фильтры
        </Typography>
      </Button>
      <Dialog
        maxWidth={"lg"}
        fullWidth
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        style={{ zIndex: 100000 }}
      >
        <DialogTitle id="scroll-dialog-title">
          <Box>
            <Typography variant="h5">
              <b>Дополнительные фильтры</b>
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Stack>
            <Stack marginBottom={3}>
              <Typography variant="h6" fontWeight={600}>
                Квартира
              </Typography>
              <RangeFilter
                fieldsName="Этаж"
                initValue={additionalFilters.floor}
                onFilterChange={handleFloorFilterChange}
              />
              <Stack
                flexDirection={"row"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
              >
                <RangeFilter
                  fieldsName="Площадь общая, м²"
                  initValue={additionalFilters.totalArea}
                  onFilterChange={handleTotalAreaFilterChange}
                />
                <RangeFilter
                  fieldsName="Площадь жилая, м²"
                  initValue={additionalFilters.livingArea}
                  onFilterChange={handleLivingAreaFilterChange}
                />
                <RangeFilter
                  fieldsName="Площадь кухни, м²"
                  initValue={additionalFilters.kitchenArea}
                  onFilterChange={handleKitchenAreaFilterChange}
                />
              </Stack>
              <Stack>
                <SelectFilter
                  groupName="Санузел"
                  options={bathroomOptions}
                  selectedOptions={additionalFilters.bathroom}
                  multiSelect
                  onFilterChange={handleBathroomFilterChange}
                />
                <SelectFilter
                  groupName="Балкон"
                  options={balconyOptions}
                  selectedOptions={additionalFilters.balcony}
                  multiSelect
                  onFilterChange={handleBalconyFilterChange}
                />
                <SwitchFilter
                  switchName="Мебель"
                  isChecked={additionalFilters.furniture}
                  onFilterChange={handleFurnitureCheck}
                />
                <SelectFilter
                  groupName="Удобства"
                  options={appliancesOptions}
                  selectedOptions={additionalFilters.appliances}
                  multiSelect
                  onFilterChange={handleAppliancesFilterChange}
                />
              </Stack>
            </Stack>
            <Stack>
              <Typography variant="h6" fontWeight={600}>
                Дополнительно
              </Typography>
              <SelectFilter
                groupName="Срок аренды"
                options={rentalPeriodOptions}
                selectedOptions={[additionalFilters.rentalPeriod]}
                multiSelect={false}
                onFilterChange={handleRentalPeriodFilterChange}
              />
              <SelectFilter
                groupName="Предпочтения"
                options={preferencesOptions}
                selectedOptions={additionalFilters.preferences}
                multiSelect
                onFilterChange={handlePreferencesFilterChange}
              />
              <SelectFilter
                groupName="Предоплата"
                options={prepaymentOptions}
                selectedOptions={additionalFilters.prepayment}
                multiSelect
                onFilterChange={handlePrepaymentFilterChange}
              />
              <SwitchFilter
                switchName="С фото"
                isChecked={additionalFilters.withPhotos}
                onFilterChange={handlePhotosCheck}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: "16px 24px" }}>
          <Stack
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
          >
            <Button>Сбросить</Button>
            <Button
              variant="contained"
              onClick={handleShowDataClick}
              style={{
                marginRight: "6px",
                width: "max-content",
                color: "#0a0f1c",
                backgroundColor: "#efcd6c",
              }}
            >
              <Typography fontSize="17px" marginLeft="3px">
                Показать <b>{flatsCount}</b>
              </Typography>
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
