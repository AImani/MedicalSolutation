import { BaseRequest } from "../../general/@types";

export interface ProvinceRequestDto extends BaseRequest {
    Title: string | null;
}

export interface ProvinceGridDto {
    Id: number;
    Title: string;
}

export interface ProvinceDto {
    Id: number;
    Title: string;
}

export interface CreateProvinceDto {
    Title: string;
}

export interface UpdateProvinceDto {
    Id: number;
    Title: string;
}