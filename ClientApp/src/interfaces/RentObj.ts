export interface RentObjectInformation {
  rentObject: RentObject;
  currency: string;
  owner: Owner;
  address: Address;
  photos: string[];
}

interface RentObject {
  rentObjId: number;
  title: string;
  description: string;
  roomsCount: number;
  floorNumber: number;
  floorsAmount: number;
  totalArea: number;
  livingArea: number;
  kitchenArea: number;
  bathroom: string;
  balcony: string;
  constructionYear: number;
  furniture: string;
  plate: string;
  addressId: number;
  rentPrice: number;
  currId: number; //
  prepayment: string;
  rent: string;
  rentalPeriod: string;
  ownerId: number; //
  createdAt: Date;
  updatedAt: Date;
}

interface Owner {
  name: string;
  fullName: string;
  phoneNumber: string;
  registrationDate: Date;
  lastLogin: Date;
}

interface Address {
  region: string;
  city: string;
  street: string;
  houseNumber: string;
  district: string;
  microdistrict: string;
  latitude: number;
  longitude: number;
}
