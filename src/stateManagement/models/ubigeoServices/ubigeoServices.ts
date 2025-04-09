export interface UbigeoServiceResponseDto {
  id: number;
  documentId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  service: {
    id: number;
    documentId: string;
    name: string;
    description: string;
    priceMin: number;
    priceMax: number;
    score: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  ubigeo: {
    id: number;
    documentId: string;
    code: string;
    district: string;
    province: string;
    department: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}