import { BaseRequest } from "../../general/@types";

export interface AppointmentPurposeRequestDto extends BaseRequest {
    Title: string | null;
}

export interface AppointmentPurposeGridDto {
    Id: number;
    Title: string;
}

export interface AppointmentPurposeDto {
    Id: number;
    Title: string;
}

export interface CreateAppointmentPurposeDto {
    Title: string;
}

export interface UpdateAppointmentPurposeDto {
    Id: number;
    Title: string;
}