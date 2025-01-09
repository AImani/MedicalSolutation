import { BaseRequest } from "../../general/@types";

export interface AppointmentReqDto extends BaseRequest {
    PatientId: number | null;
    DoctorId: number | null;
    FromDate: string | null;
    ToDate: string | null;
    AppointmentStatusId: number | null;
}

export interface AppointmentGridDto {
    Id: number;
    AppointmentPurpose: string;
    AppointmentDate: string;
    AppointmentStatus: string;
    PatientName: string;
    DoctorName: string;
}

export interface AppointmentDto {
    Id: number;
    AppointmentPurposeId: number;
    AppointmentPurpose: string;
    AppointmentDate: string;
    CancellationReason: string | null;
    AppointmentStatusId: number;
    AppointmentStatus: string;
    PatientId: number | null;
    PatientName: string;
    DoctorId: number | null;
    DoctorName: string;
}

export interface CreateAppointmentDto {
    AppointmentPurposeId: number;
    AppointmentDate: string;
    CancellationReason: string | null;
    AppointmentStatusId: number;
    PatientId: number | null;
    DoctorId: number | null;
}

export interface UpdateAppointmentDto {
    Id: number;
    AppointmentPurposeId: number;
    AppointmentDate: string;
    CancellationReason: string | null;
    AppointmentStatusId: number;
    PatientId: number | null;
    DoctorId: number | null;
}