import { BaseRequest } from "../../general/@types";

export interface AppointmentRequestStatusRequestDto extends BaseRequest {
    Title: string | null;
}

export interface AppointmentRequestStatusGridDto {
    Id: number;
    Title: string;
}

export interface AppointmentRequestStatusDto {
    Id: number;
    Title: string;
}

export interface CreateAppointmentRequestStatusDto {
    Title: string;
}

export interface UpdateAppointmentRequestStatusDto {
    Id: number;
    Title: string;
}