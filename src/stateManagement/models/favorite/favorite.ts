type Service = {
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

export interface FavoriteResponseDto {
  id: number;
  documentId: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  service: Service;
};


export interface FavoriteRequestDto {
	userId: string,
	service: string
}