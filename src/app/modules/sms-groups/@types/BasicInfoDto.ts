import { BaseRequest, PaginateResult } from "../../general/@types";

export interface SmsGroupRequestDto extends PagingDataRequest {
    Name: string | null;
}

export interface SmsGroupGridDto {
    Id: number;
    Name: string;
    MemberCount: number;
}

export interface SmsGroupDto {
    Id: number;
    Name: string;
    Members: SmsGroupMemberDto[];
}

export interface CreateSmsGroupDto {
    Name: string;
    Members: CreateSmsGroupMemberDto[];
    CreatedById: string;
}

export interface UpdateSmsGroupDto {
    Id: number;
    Name: string;
    Members: UpdateSmsGroupMemberDto[];
    LastModifiedById: string;
}

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

export interface SmsGroupMemberRequestDto extends PaginateResult {
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