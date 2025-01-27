import { BaseRequest } from "../../general/@types";

export interface AppointmentStatusRequestDto extends BaseRequest {
    Title: string | null;
}

export interface AppointmentStatusGridDto {
    Id: number;
    Title: string;
}

export interface AppointmentStatusDto {
    Id: number;
    Title: string;
}

export interface CreateAppointmentStatusDto {
    Title: string;
}

export interface UpdateAppointmentStatusDto {
    Id: number;
    Title: string;
}