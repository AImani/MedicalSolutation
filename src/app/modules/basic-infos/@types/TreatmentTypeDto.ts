import { BaseRequest } from "../../general/@types";

export interface TreatmentTypeRequestDto extends BaseRequest {
    Title: string | null;
}

export interface TreatmentTypeGridDto {
    Id: number;
    Title: string;
}

export interface TreatmentTypeDto {
    Id: number;
    Title: string;
}

export interface CreateTreatmentTypeDto {
    Title: string;
}

export interface UpdateTreatmentTypeDto {
    Id: number;
    Title: string;
}