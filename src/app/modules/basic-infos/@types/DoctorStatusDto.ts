import { BaseRequest } from "../../general/@types";

export interface DoctorStatusRequestDto extends BaseRequest {
    Title: string | null;
}

export interface DoctorStatusGridDto {
    Id: number;
    Title: string;
}

export interface DoctorStatusDto {
    Id: number;
    Title: string;
}

export interface CreateDoctorStatusDto {
    Title: string;
}

export interface UpdateDoctorStatusDto {
    Id: number;
    Title: string;
}