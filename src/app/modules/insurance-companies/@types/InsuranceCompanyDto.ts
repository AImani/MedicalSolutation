import { BaseRequest } from "../../general/@types";

export interface InsuranceCompanyRequestDto extends BaseRequest {
    Name: string | null;
    PhoneNumber: string | null;
    Email: string | null;
}

export interface InsuranceCompanyGridDto {
    Id: number;
    Name: string;
    PhoneNumber: string;
    Email?: string;
}

export interface InsuranceCompanyDto {
    Id?: number;
    Name: string;
    Address: string;
    PhoneNumber: string;
    Email?: string;
    Website?: string;
}

export type CreateInsuranceCompanyDto = Omit<InsuranceCompanyDto, 'Id'>

export interface UpdateInsuranceCompanyDto {
    Id: number;
    Name: string;
    Address: string;
    PhoneNumber: string;
    Email?: string;
    Website?: string;
}