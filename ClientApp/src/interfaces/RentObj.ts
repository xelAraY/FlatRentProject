
export interface RentObjectInformation {
  rentObject: RentObject;
  currency: string;
  owner: Owner;
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
  address: string;
  rentPrice: number;
  currId: number;//
  prepayment: string;
  rent: string;
  preferences: string;
  ownerId: number;//
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