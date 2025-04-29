import { AppointmentDto } from "../../appointments/@types";
import { AddressDto, CreateAddressDto, CreateMedicalDocumentDto, EducationLevelDto, MaritalStatusDto, MedicalDocumentDto } from "../../basic-infos/@types";
import { MessageStatusDto } from "../../basic-infos/@types";
import { BaseRequest } from "../../general/@types";
import { ContactInfoDto, CreateContactInfoDto } from "./BasicInfoDto";

export interface MessageRequestDto extends BaseRequest {
    PhoneNo: string | null;
    FirstName: string | null;
    LastName: string | null;
    IntroductionChannel: string | null;
    MessageStatusId: number | null;
    MaritalStatusId: number | null;
    EducationLevelId: number | null;
    Occupation: string | null;
    InsuranceCompanyId: number | null;
}

export interface MessageGridDto {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNo: string;
    CellPhoneNo: string;
    EmergencyPhoneNo: string;
    BirthDate: string | null;
    MessageStatusName: string;
    MaritalStatusName: string;
    EducationLevelName: string;
    AddressLine: string;
    InsuranceCompanyName: string;
}

export interface MessageDto {
    Id: number;
    FirstName: string;
    LastName: string;
    ContactInfoId: number | null;
    BirthDate: string;
    Occupation: string;
    IntroductionChannel: string;
    ImageUrl: string;
    MessageStatusId: number;
    EducationLevelId: number | null;
    MaritalStatusId: number | null;
    AddressId: number | null;
    ContactInfo: ContactInfoDto;
    MessageStatus: MessageStatusDto;
    EducationLevel: EducationLevelDto;
    MaritalStatus: MaritalStatusDto;
    Address?: AddressDto;
    Appointments?: AppointmentDto[];
    // VisitHistories: VisitHistoryDto[];
    MedicalDocuments?: MedicalDocumentDto[];
    // InsurancePolicies: InsurancePolicyDto[];
    // Billings: BillingDto[];
}

export interface CreateMessageDto {
    Recipient: string;
    Message: string;
    SentDate?: Date | null;
}

export interface UpdateMessageDto {
    Id: number;
    Recipient: string;
    Message: string;
    SentDate?: string | null;
}