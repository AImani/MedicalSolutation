import { BaseRequest } from "../../general/@types";

export interface SmsGroupMemberDto {
    Id: number;
    GroupId: number;
    PhoneNumber: string;
    PatientId: number | null;
    GroupName: string;
    PatientName: string;
}

export interface CreateSmsGroupMemberDto {
    PhoneNumber: string;
    PatientId: number | null;
    GroupId: number;
}

export interface UpdateSmsGroupMemberDto {
    Id: number;
    PhoneNumber: string;
    PatientId: number | null;
    GroupId: number;
}

export interface SmsGroupMemberRequestDto extends BaseRequest {
    PhoneNumber: string | null;
    GroupId: number | null;
    PatientId: number | null;
}

export interface SmsGroupMemberGridDto {
    Id: number;
    GroupId: number;
    PhoneNumber: string;
    GroupName: string;
    PatientName: string;
}