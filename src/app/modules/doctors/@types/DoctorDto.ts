import { AddressDto, CreateMedicalDocumentDto } from "../../basic-infos/@types";
import { BaseRequest } from "../../general/@types";

export interface DoctorGridDto {
    Id: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    DateOfBirth: string;
    MedicalSpecialtyName: string;
    DoctorStatusName: string;
    AddressLine: string;
}

export interface CreateDoctorDto {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    DateOfBirth: string;
    MedicalLicenseNumber: string;
    MedicalSpecialtyId: number;
    DoctorStatusId: number;
    AddressId: number;
}

export interface DoctorRequestDto extends BaseRequest {
    PhoneNumber: string | null;
    FirstName: string | null;
    LastName: string | null;
    MedicalSpecialtyId: number | null;
    DoctorStatusId: number | null;
}

export interface PatientGridDto {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNo: string;
    CellPhoneNo: string;
    EmergencyPhoneNo: string;
    BirthDate: string | null;
    PatientStatusName: string;
    MaritalStatusName: string;
    EducationLevelName: string;
    AddressLine: string;
    InsuranceCompanyName: string;
}

export interface CreatePatientDto {
    FirstName: string;
    LastName: string;
    Email: string | null;
    PhoneNo: string | null;
    CellPhoneNo: string | null;
    EmergencyPhoneNo: string;
    BirthDate: string | null;
    IntroductionChannel: string | null;
    PatientStatusId: number | null;
    MaritalStatusId: number | null;
    EducationLevelId: number | null;
    Occupation: string | null;
    Address: AddressDto;
    InsuranceCompanyId: number | null;
    MedicalDocuments: CreateMedicalDocumentDto[];
}

export interface UpdatePatientDto {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string | null;
    PhoneNo: string | null;
    CellPhoneNo: string | null;
    EmergencyPhoneNo: string;
    BirthDate: string | null;
    IntroductionChannel: string | null;
    PatientStatusId: number | null;
    MaritalStatusId: number | null;
    EducationLevelId: number | null;
    Occupation: string | null;
    AddressId: number | null;
    InsuranceCompanyId: number | null;
}