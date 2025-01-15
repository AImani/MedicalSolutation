export interface AddressGridDto {
    Id: number;
    StreetAddress: string;
    CityName: string;
    PostalCode: string;
}

export interface AddressDto {
    Id: number;
    StreetAddress: string;
    CityId: number;
    CityName: string;
    PostalCode: string;
    ApartmentNumber: string;
    AdditionalInfo: string;
}

export interface CreateAddressDto {
    StreetAddress: string;
    CityId: number;
    PostalCode: string;
    ApartmentNumber: string;
    AdditionalInfo: string;
}

export interface UpdateAddressDto {
    Id: number;
    StreetAddress: string;
    CityId: number;
    PostalCode: string;
    ApartmentNumber: string;
    AdditionalInfo: string;
}