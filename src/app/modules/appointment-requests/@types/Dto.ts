import { CreateAppointmentDto } from "../../appointments/@types";
import { AppointmentRequestStatusDto } from "../../basic-infos/@types";
import { BaseRequest } from "../../general/@types";

export interface AppointmentRequestRequestDto extends BaseRequest {
    PatientName: string | null;
    PhoneNumber: string | null;
    FromDate: string | null;
    ToDate: string | null;
}

export interface AppointmentRequestGridDto {
    Id: number;
    PatientName: string;
    PhoneNumber: string;
    AppointmentDate: string;
    AppointmentTime: string;
    AppointmentRequestStatus: string;
}

export interface AppointmentRequestDto {
    Id: number;
    PatientName: string;
    PhoneNumber: string;
    AppointmentDate: string;
    AppointmentTime: string;
    Description: string | null;
    AppointmentRequestStatusId: number;
    AppointmentRequestStatus: AppointmentRequestStatusDto;
}

export interface CreateAppointmentRequestDto {
    PatientName: string;
    PhoneNumber: string;
    AppointmentDate: string;
    AppointmentTime: string;
    Description: string | null;
    AppointmentRequestStatusId: number;
}

export interface UpdateAppointmentRequestDto {
    Id: number;
    PatientName: string;
    PhoneNumber: string;
    AppointmentDate: string;
    AppointmentTime: string;
    Description: string | null;
    AppointmentRequestStatusId: number;
}

export interface ApproveAppointmentRequestDto {
    Id: number;
    Appointment: CreateAppointmentDto
}