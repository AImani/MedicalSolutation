export interface AddressGridDto {
    Id: number;
    FullAddress: string;
    CityName: string;
    PostalCode: string;
}

export interface AddressDto {
    Id: number;
    FullAddress: string;
    CityId: number;
    CityName: string;
    PostalCode: string;
    ApartmentNo: string;
    UnitNo: string;
}

export interface CreateAddressDto {
    FullAddress: string;
    CityId: number;
    PostalCode: string;
    ApartmentNo: string;
    UnitNo: string;
}

export interface UpdateAddressDto {
    Id: number;
    FullAddress: string;
    CityId: number;
    PostalCode: string;
    ApartmentNo: string;
    UnitNo: string;
}