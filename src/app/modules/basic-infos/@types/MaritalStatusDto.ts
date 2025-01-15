import { BaseRequest } from "../../general/@types";

export interface MaritalStatusRequestDto extends BaseRequest {
    Title: string | null;
}

export interface MaritalStatusGridDto {
    Id: number;
    Title: string;
}

export interface MaritalStatusDto {
    Id: number;
    Title: string;
}

export interface CreateMaritalStatusDto {
    Title: string;
}

export interface UpdateMaritalStatusDto {
    Id: number;
    Title: string;
}