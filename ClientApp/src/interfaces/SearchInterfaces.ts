interface IPrice {
  min: number;
  max: number;
}

export interface PriceProps {
  price: IPrice;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  currentCurrency: string;
  setCurrentCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export interface SearchProps {
  priceProps: PriceProps;
  roomsProps: RoomsProps;
}

export interface RoomsProps {
  rooms: string[];
  setRooms: React.Dispatch<React.SetStateAction<string[]>>;
}