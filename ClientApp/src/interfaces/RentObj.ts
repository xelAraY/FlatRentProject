import { Contact } from "src/components/add-flat-page/components";

export interface RentObjectInformation {
  rentObject: RentObject;
  owner: Owner;
  address: Address;
  photos: string[];
  contacts: Contact[];
  appliances?: string[];
  preferences?: string[];
  additionalInformations?: string[];
  metroStations?: MetroStation[];
}

export interface RentObject {
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
  id: number; //
  prepayment: string;
  rent: string;
  rentalPeriod: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  hidden: boolean;
}

interface Owner {
  name: string;
  fullName: string;
  phoneNumber: string;
  registrationDate: Date;
  lastLogin: Date;
}

export interface Address {
  region: string;
  city: string;
  street: string;
  houseNumber: string;
  district: string;
  microdistrict: string;
  latitude: number;
  longitude: number;
}

export interface MetroStation {
  name: string;
  color: string;
  wayType: string;
  travelTime: number;
}
