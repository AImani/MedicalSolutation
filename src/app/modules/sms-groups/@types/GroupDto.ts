import { AppointmentDto } from "../../appointments/@types";
import { AddressDto, CreateAddressDto, CreateMedicalDocumentDto, EducationLevelDto, MaritalStatusDto, MedicalDocumentDto } from "../../basic-infos/@types";
import { GroupStatusDto } from "../../basic-infos/@types";
import { BaseRequest } from "../../general/@types";
import { ContactInfoDto, CreateContactInfoDto } from "./BasicInfoDto";

export interface GroupRequestDto extends BaseRequest {
    PhoneNo: string | null;
    FirstName: string | null;
    LastName: string | null;
    IntroductionChannel: string | null;
    GroupStatusId: number | null;
    MaritalStatusId: number | null;
    EducationLevelId: number | null;
    Occupation: string | null;
    InsuranceCompanyId: number | null;
}

export interface GroupGridDto {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNo: string;
    CellPhoneNo: string;
    EmergencyPhoneNo: string;
    BirthDate: string | null;
    GroupStatusName: string;
    MaritalStatusName: string;
    EducationLevelName: string;
    AddressLine: string;
    InsuranceCompanyName: string;
}

export interface GroupDto {
    Id: number;
    FirstName: string;
    LastName: string;
    ContactInfoId: number | null;
    BirthDate: string;
    Occupation: string;
    IntroductionChannel: string;
    ImageUrl: string;
    GroupStatusId: number;
    EducationLevelId: number | null;
    MaritalStatusId: number | null;
    AddressId: number | null;
    ContactInfo: ContactInfoDto;
    GroupStatus: GroupStatusDto;
    EducationLevel: EducationLevelDto;
    MaritalStatus: MaritalStatusDto;
    Address?: AddressDto;
    Appointments?: AppointmentDto[];
    // VisitHistories: VisitHistoryDto[];
    MedicalDocuments?: MedicalDocumentDto[];
    // InsurancePolicies: InsurancePolicyDto[];
    // Billings: BillingDto[];
}

export interface CreateGroupDto {
    GroupName: string;
    LastName: string;
    BirthDate?: Date | null;
    IntroductionChannel?: string | null;
    Occupation?: string | null;
    GroupStatusId: number;
    MaritalStatusId?: number | null;
    EducationLevelId?: number | null;
    InsuranceCompanyId?: number | null;

    Address?: CreateAddressDto;
    ContactInfo?: CreateContactInfoDto;
    MedicalDocuments?: CreateMedicalDocumentDto[];
}

export interface UpdateGroupDto {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string | null;
    PhoneNo: string | null;
    CellPhoneNo: string | null;
    EmergencyPhoneNo: string;
    BirthDate: string | null;
    IntroductionChannel: string | null;
    GroupStatusId: number | null;
    MaritalStatusId: number | null;
    EducationLevelId: number | null;
    Occupation: string | null;
    AddressId: number | null;
    InsuranceCompanyId: number | null;
}