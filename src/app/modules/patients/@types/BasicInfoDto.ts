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
    Email?: string;
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
    PhoneNo: string;
    PhoneTypeId: number;
    PhoneNumberType: string;
}

export interface PhoneNumberDto {
    Id: number;
    PhoneNo: string;
    PhoneTypeId: number;
    PhoneNumberType: string;
}

export interface CreatePhoneNumberDto {
    PhoneNo?: string;
    PhoneTypeId?: number;
}

export interface UpdatePhoneNumberDto {
    Id: number;
    PhoneNo: string;
    PhoneTypeId: number;
}