import { BaseRequest } from "../../general/@types";

export interface PatientStatusRequestDto extends BaseRequest {
    Title: string | null;
}

export interface PatientStatusGridDto {
    Id: number;
    Title: string;
}

export interface PatientStatusDto {
    Id: number;
    Title: string;
}

export interface CreatePatientStatusDto {
    Title: string;
}

export interface UpdatePatientStatusDto {
    Id: number;
    Title: string;
}