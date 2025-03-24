import type { ConstructionType, DealType, LandType, LandUse, Topography } from './construction.enum';
import { PropertyType } from './construction.enum';

interface Address {
  neighborhood?: string;
  zipCode?:      number;
  city?:         string;
  state?:        string;
  country?:      string;
}

interface Location {
  longitude?: number;
  latitude?:  number;
  _id?:       string;
}

interface BaseProperty {
  _id: string;
  address: Address;
  description: string;
  price: number;
  landArea?: number;
  dealType: DealType;
  services: string[];
  location: Location;
  code: string;
  featured: boolean;
  coverImage: string;
  images: string[];
  propertyType: PropertyType;
}

export interface Land extends BaseProperty {
  propertyType: PropertyType.LAND;
  landUse: LandUse;
  landOccupationCoefficient?: number;
  landType: LandType;
  topography: Topography;
}

export interface Construction extends BaseProperty {
  propertyType: PropertyType.CONSTRUCTION;
  rooms: number;
  bathrooms: number;
  builtArea: number;
  floors?: number;
  equipment: string[];
  finishes: string;
  furnished: boolean;
  constructionStyle: string;
  private: boolean;
  constructionYear?: number;
  constructionType: ConstructionType;
}

export type Property = Land | Construction;

export const isLand = (property: Property): property is Land => {
  return property.propertyType === PropertyType.LAND;
}

export const isConstruction = (property: Property): property is Construction => {
  return property.propertyType === PropertyType.CONSTRUCTION;
}
