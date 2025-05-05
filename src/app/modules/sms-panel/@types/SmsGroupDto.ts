import { BaseRequest } from "../../general/@types";
import { CreateSmsGroupMemberDto, SmsGroupMemberDto, UpdateSmsGroupMemberDto } from "./SmsGroupMemberDto";

export interface SmsGroupRequestDto extends BaseRequest {
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