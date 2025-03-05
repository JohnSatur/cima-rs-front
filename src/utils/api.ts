export interface Address {
  street: string;
  intNumber?: string;
  extNumber: string;
  neighborhood: string;
  zipCode: number;
  city: string;
  state: string;
  country: string;
}

interface BaseProperty {
  _id: string;
  address: Address;
  price: number;
  dealType: 'Venta' | 'Renta';
  landArea?: number;
  description?: string;
  services?: string[];
  location?: {
    longitude: number;
    latitude: number;
  };
  code: string;
  propertyType: 'Land' | 'Construction';
}

export interface LandProperty extends BaseProperty {
  propertyType: 'Land';
  landUse: string;
  landOccupationCoefficient: number;
  landType: string;
  topography: string;
}

export interface ConstructionProperty extends BaseProperty {
  propertyType: 'Construction';
  rooms: number;
  bathrooms: number;
  builtArea: number;
  floors?: number;
  equipment?: string[];
  finishes?: string;
  furnished?: boolean;
  constructionStyle?: string;
  private?: boolean;
  constructionYear?: number;
  constructionType: string;
}

export type Property = LandProperty | ConstructionProperty;

export interface ApiResponse {
  data: Property[];
  total: number;
  page: number;
  totalPages: number;
}