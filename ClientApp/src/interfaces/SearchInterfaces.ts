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

interface AdditionalFilters {
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
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}