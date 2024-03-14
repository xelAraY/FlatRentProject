interface IPrice {
  min: number;
  max: number;
}

export interface FilterState {
  rooms: string[];
  locations: string[];
  minPrice: number;
  maxPrice: number;
  currentCurrency: string;
}

export interface PriceProps {
  price: IPrice;
  currentCurrency: string;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
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