import { BaseRequest } from "../../general/@types";

export interface MedicalSpecialtyRequestDto extends BaseRequest {
    Title: string | null;
}

export interface MedicalSpecialtyGridDto {
    Id: number;
    Title: string;
}

export interface MedicalSpecialtyDto {
    Id: number;
    Title: string;
}

export interface CreateMedicalSpecialtyDto {
    Title: string;
}

export interface UpdateMedicalSpecialtyDto {
    Id: number;
    Title: string;
}