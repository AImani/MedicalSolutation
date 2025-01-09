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
    Email: string;
}

export interface InsuranceCompanyDto {
    Id: number;
    Name: string;
    Address: string;
    PhoneNumber: string;
    Email: string;
    Website: string;
}

export interface CreateInsuranceCompanyDto {
    Name: string;
    Address: string | null;
    PhoneNumber: string | null;
    Email: string | null;
    Website: string | null;
}

export interface UpdateInsuranceCompanyDto {
    Id: number;
    Name: string;
    Address: string | null;
    PhoneNumber: string | null;
    Email: string | null;
    Website: string | null;
}