interface IPrice {
  min: number;
  max: number;
}

// export interface BaseFilters {
//   rooms: string[];
//   locations: string[];
//   minPrice: number;
//   maxPrice: number;
//   currentCurrency: string;
// }

export interface RangeValue {
  valueFrom: number | null;
  valueTo: number | null;
}

interface AdditionalFilters {
  floor: RangeValue;
  totalArea: RangeValue;
  livingArea: RangeValue;
  kitchenArea: RangeValue;
  bathroom: string[];
  balcony: string[];
  appliances: string[];
  rentalPeriod: string;
  preferences: string[];
  prepayment: string[];
  furniture: boolean;
  withPhotos: boolean;
}

export interface FilterState {
  rooms: string[];
  locations: string[];
  minPrice: number;
  maxPrice: number;
  currentCurrency: string;
  floor: RangeValue;
  totalArea: RangeValue;
  livingArea: RangeValue;
  kitchenArea: RangeValue;
  bathroom: string[];
  balcony: string[];
  appliances: string[];
  rentalPeriod: string;
  preferences: string[];
  prepayment: string[];
  furniture: boolean;
  withPhotos: boolean;
  showData?: boolean;
}

export interface FilterOptionsProps {
  filters: FilterState;
  count: number | null;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}

export interface PriceProps {
  price: IPrice;
  currentCurrency: string;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
  isHome: boolean;
}

export interface RoomsProps {
  rooms: string[];
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}

export interface LocationProps {
  locations: string[];
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}

export interface SearchProps {
  priceProps: PriceProps;
  roomsProps: RoomsProps;
  locationsProps: LocationProps
}

export interface SelectFilterProps {
  groupName: string;
  options: string[];
  selectedOptions: string[];
  multiSelect: boolean;
  onFilterChange: (items: string[]) => void;
}

export interface SwitchFilterProps {
  switchName: string;
  isChecked: boolean;
  onFilterChange: (isChecked: boolean) => void;
}

export interface AdditionalFiltersProps {
  additionalFilters: AdditionalFilters;
  count: number | null;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}