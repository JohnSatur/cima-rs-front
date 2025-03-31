import type { Construction, Land } from "./property.interface";
import { PropertyType } from './property.enum';

export interface ApiResponse {
  properties: PropertyResponse[];
  pagination: Pagination;
}

export interface Pagination {
  page:       number;
  limit:      number;
  total:      number;
  totalPages: number;
}

export type ConstructionResponse = {
  type: PropertyType.CONSTRUCTION;
  data: Construction;
}

export type LandResponse = {
  type: PropertyType.LAND;
  data: Land;
}

export type PropertyResponse = ConstructionResponse | LandResponse;
