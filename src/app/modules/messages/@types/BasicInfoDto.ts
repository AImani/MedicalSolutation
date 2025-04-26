export interface ContactInfoGridDto {
    Id: number;
    Email: string | null;
    PhoneNumbers: string | null;
}

export interface ContactInfoDto {
    Id: number;
    Email: string | null;
    MessageId: number;
}

export interface CreateContactInfoDto {
    Email: string | null;
    MessageId: number;
}

export interface UpdateContactInfoDto {
    Id: number;
    Email: string | null;
    MessageId: number;
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