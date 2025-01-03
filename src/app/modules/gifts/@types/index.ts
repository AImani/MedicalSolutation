import { PaginateResult, Result } from "@/app/modules/general/@types";

export interface AdminGiftContext {
    queryGifts: (request: GetAllGiftRequestDto) => void
    queryParams: GetAllGiftRequestDto
    items?: PaginateResult<GiftDto> | null;
    isLoading: boolean;
    giftProviders?: GiftProviderDto[]
    showAddGiftModal: boolean,
    toggleAddGiftModal: (value: boolean) => void
    importFromExcelLoading: boolean
    importGiftFromExcel: (dto: GiftExcelRequestCommand) => void
    importGiftFromExcelErrors: string[] | undefined
    sendGiftFromApi: (dto: GiftRequestCommand) => void
    addGiftFromApiLoading: boolean
    addGiftFromApiErrors: string[] | undefined
}

export interface GiftExcelRequestCommand {
    File: File;
    GiftProviderId: number
}

export interface GiftRequestCommand {
    GiftProviderId: string,
    Amount?: string,
    VoucherCode?: string
    NationalCode: string,
    ActivateDate: string,
    ExpireDate: string
    IsApi: boolean
}

export interface GetAllGiftRequestDto {
    NationalCode?: string,
    GiftProviderId?: number,
    IsApi?: boolean
    TotalCount?: number;
    PageSize?: number;
    PageIndex?: number;
    orderBy?: string;
}

export interface GiftDto {
    GiftId: number;
    NationalCode: string;
    CardNumber: string | null;
    FullName: string | null;
    BirthDate: string | null;
    ActivateDate: string;
    ExpireDate: string | null;
    GetGiftDate: string | null;
    Used: boolean | null;
    VoucherCode: string | null;
    GiftProviderId: number;
    GiftProvider: string;
    Amount: number | null;
    IsUserSatisfied: boolean | null;
    IsApi: boolean | null;
    Comment: string | null;
    InsertDateTime: string
}

export interface ImportGiftFromExcelResponse {
    InsertedRowsCount: number
    InvalidRowsCount: number
    ExportedExcelBytes: string
}

export interface GiftProviderDto {
    Id: number,
    Name: string
}

export type GetGiftExcelResponseDto = Result<ImportGiftFromExcelResponse>;