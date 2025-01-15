import { BaseRequest } from "../../general/@types";

export interface PhoneNumberTypeRequestDto extends BaseRequest {
    Title: string | null;
}

export interface PhoneNumberTypeGridDto {
    Id: number;
    Title: string;
}

export interface PhoneNumberTypeDto {
    Id: number;
    Title: string;
}

export interface CreatePhoneNumberTypeDto {
    Title: string;
}

export interface UpdatePhoneNumberTypeDto {
    Id: number;
    Title: string;
}