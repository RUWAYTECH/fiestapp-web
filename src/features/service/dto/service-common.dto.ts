export interface ServiceCommonDto {
	name: string;
	description: string;
	priceMin: number;
	priceMax: number;
	duration?: number;
	address: string;
	status: boolean;
	categoryId: string;
}
