import { BaseRequest } from "../../general/@types";

export interface CityRequestDto extends BaseRequest {
    Title?: string | null;
    ProvinceId?: number | null;
}

export interface CityGridDto {
    Id: number;
    Title: string;
    ProvinceTitle: string;
}

export interface CityDto {
    Id: number;
    Title: string;
    ProvinceId: number;
    ProvinceTitle: string;
}

export interface CreateCityDto {
    Title: string;
    ProvinceId: number;
}

export interface UpdateCityDto {
    Id: number;
    Title: string;
    ProvinceId: number;
}