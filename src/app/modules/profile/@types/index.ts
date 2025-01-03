import { PaginateResult } from "../../general/@types";

export interface ReportContext {
    queryReport: (request: GetDisabledSmsRequestDto) => void;
    exportReport: (request: GetDisabledSmsRequestDto) => void;
    exportProfileReport: () => void;
    exportProfileFilledReport: () => void;
    exportProfileFilledReportInRange: (fromDate: string, toDate: string) => void;
    items: GetDisabledSmsResponseDto;
    queryParams: GetDisabledSmsRequestDto;
    error: any;
}

export interface ReportResultDto {
    Cardno: string;
    Acno: string;
    Custno: string;
    FirstName: string;
    LastName: string;
    MelliCode: string;
    BirthDay: string;
    phone_No: string;
    HisDate: string;
}

export interface GetDisabledSmsRequestDto {
}

export type GetDisabledSmsResponseDto = PaginateResult<ReportResultDto[]>;