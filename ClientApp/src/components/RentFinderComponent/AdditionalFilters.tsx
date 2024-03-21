import { Button } from "src/shared";
import React from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { RangeFilter } from "./RangeFilter";
import { SelectFilter } from "./SelectFilter";
import { SwitchFilter } from "./SwitchFilter";
import { AdditionalFiltersProps, FilterState } from "src/interfaces/SearchInterfaces";

export const AdditionalFilters = ({ additionalFilters, onFiltersChange }: AdditionalFiltersProps) => {
  const [open, setOpen] = React.useState(false);
  const bathroomOptions = ["Раздельный", "Совмещенный", "2 и более"];
  const balconyOptions = ["Есть", "Нет", "Лоджия"];
  const appliancesOptions = ["Телевизор", "Холодильник", "Стиральная машина", "Посудомоечная машина", "Кондиционер", "Свч-печь", "Душевая кабина", "Интернет", "Мелкая бытовая техника"];
  const rentalPeriodOptions = ["Месяц", "2 Месяца", "3 Месяца", "Пол года", "Год", "Длительный"];
  const preferencesOptions = ["Можно с животными", "Студентам", "Семье", "Не курящим"];
  const prepaymentOptions = ["Без предоплаты", "Месяц", "2 Месяца", "3 Месяца", "Пол года"];

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

  const handleBathroomFilterChange = (options: string[]) => {
    const newFilters: Partial<FilterState> = {
      bathroom: options,
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const handleBalconyFilterChange = (options: string[]) => {
    const newFilters: Partial<FilterState> = {
      balcony: options,
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const handleAppliancesFilterChange = (options: string[]) => {
    const newFilters: Partial<FilterState> = {
      appliances: options,
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const handleRentalPeriodFilterChange = (options: string[]) => {
    const newFilters: Partial<FilterState> = {
      rentalPeriod: options.length > 0 ? options[0] : "",
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const handlePreferencesFilterChange = (options: string[]) => {
    const newFilters: Partial<FilterState> = {
      appliances: options,
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const handlePrepaymentFilterChange = (options: string[]) => {
    const newFilters: Partial<FilterState> = {
      appliances: options,
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const handleFurnitureCheck = (option: boolean) => {
    const newFilters: Partial<FilterState> = {
      furniture: option,
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const handlePhotosCheck = (option: boolean) => {
    const newFilters: Partial<FilterState> = {
      withPhotos: option,
      showData: false,
    };
    onFiltersChange(newFilters);
  }

  const hanaleShowData = () => {
    const newFilters: Partial<FilterState> = {
      showData: true,
    };
    onFiltersChange(newFilters);
  }

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="large"
        color='info'
        onClick={handleClickOpen}
        style={{ border: '1px solid rgba(0, 0, 0, 0.23)', justifyContent: "space-between", height: "56px" }}
      >
        <FilterAltIcon style={{ color: "#616467" }} />
        <Typography fontWeight={600} color={"black"}>Дополнительные фильтры</Typography>
      </Button>
      <Dialog
        maxWidth={"lg"}
        fullWidth
        open={open}
        onClose={handleClose}
        scroll={'paper'}
      >
        <DialogTitle id="scroll-dialog-title">
          <Box>
            <Typography variant="h5"><b>Дополнительные фильтры</b></Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Stack>
            <Stack marginBottom={3}>
              <Typography variant="h6" fontWeight={600}>Квартира</Typography>
              <RangeFilter fieldsName="Этаж" />
              <Stack flexDirection={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>
                <RangeFilter fieldsName="Площадь общая, м²" />
                <RangeFilter fieldsName="Площадь жилая, м²" />
                <RangeFilter fieldsName="Площадь кухни, м²" />
              </Stack>
              <Stack>
                <SelectFilter groupName="Санузел" options={bathroomOptions} selectedOptions={additionalFilters.bathroom} multiSelect onFilterChange={handleBathroomFilterChange} />
                <SelectFilter groupName="Балкон" options={balconyOptions} selectedOptions={additionalFilters.balcony} multiSelect onFilterChange={handleBalconyFilterChange} />
                <SwitchFilter switchName="Мебель" isChecked={additionalFilters.furniture} onFilterChange={handleFurnitureCheck} />
                <SelectFilter groupName="Удобства" options={appliancesOptions} selectedOptions={additionalFilters.appliances} multiSelect onFilterChange={handleAppliancesFilterChange} />
              </Stack>
            </Stack>
            <Stack>
              <Typography variant="h6" fontWeight={600}>Дополнительно</Typography>
              <SelectFilter groupName="Срок аренды" options={rentalPeriodOptions} selectedOptions={[additionalFilters.rentalPeriod]} multiSelect={false} onFilterChange={handleRentalPeriodFilterChange} />
              <SelectFilter groupName="Предпочтения" options={preferencesOptions} selectedOptions={additionalFilters.preferences} multiSelect onFilterChange={handlePreferencesFilterChange} />
              <SelectFilter groupName="Предоплата" options={prepaymentOptions} selectedOptions={additionalFilters.prepayment} multiSelect onFilterChange={handlePrepaymentFilterChange} />
              <SwitchFilter switchName="С фото" isChecked={additionalFilters.withPhotos} onFilterChange={handlePhotosCheck} />
            </Stack>
          </Stack>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={hanaleShowData}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}