export interface ContactInfoGridDto {
    Id: number;
    Email: string | null;
    PhoneNumbers: string | null;
}

export interface ContactInfoDto {
    Id: number;
    Email: string | null;
    PatientId: number;
    PhoneNumbers: PhoneNumberDto[];
}

export interface CreateContactInfoDto {
    Email: string | null;
    PatientId: number;
    PhoneNumbers: CreatePhoneNumberDto[];
}

export interface UpdateContactInfoDto {
    Id: number;
    Email: string | null;
    PatientId: number;
    PhoneNumbers: UpdatePhoneNumberDto[];
}

export interface PhoneNumberGridDto {
    Id: number;
    PhoneNumberValue: string;
    PhoneNumberTypeId: number;
    PhoneNumberType: string;
}

export interface PhoneNumberDto {
    Id: number;
    PhoneNumberValue: string;
    PhoneNumberTypeId: number;
    PhoneNumberType: string;
}

export interface CreatePhoneNumberDto {
    PhoneNumberValue: string;
    PhoneNumberTypeId: number;
}

export interface UpdatePhoneNumberDto {
    Id: number;
    PhoneNumberValue: string;
    PhoneNumberTypeId: number;
}