import { Result } from "../../general/@types";

export interface BankAccountSelectListDto {
    Id: number;
    Title: string;
    AccountNo: string | null;
    Iban: string | null;
    Type: BankAccountTypeDto;
}

export enum BankAccountTypeDto {
    Behin = 1,
    Partners = 2
}

export interface StatusDto {
    Id: number;
    Name: string;
}

export interface ImportFromExcelResponse {
    InsertedRowsCount: number;
    InvalidRowsCount: number;
    ExportedExcelBytes: string | null;
}

export type ImportFromExcelResponseDto = Result<ImportFromExcelResponse>

export enum FinancialTransferRequestStatuses {
    Rejected = 0,
    InitialRequest = 1,
    WaitingForApprove = 2,
    WaitingForPayment = 3,
    SuccessfulPayment = 4,
    FailedPayment = 5,
    Pending = 11,
    Failed = 12,
    Succeeded = 13
}

export const NumberToFinancialStatusMapper: Record<string, FinancialTransferRequestStatuses> = {
    '0': FinancialTransferRequestStatuses.Rejected,
    '1': FinancialTransferRequestStatuses.InitialRequest,
    '2': FinancialTransferRequestStatuses.WaitingForApprove,
    '3': FinancialTransferRequestStatuses.WaitingForPayment,
    '4': FinancialTransferRequestStatuses.SuccessfulPayment,
    '5': FinancialTransferRequestStatuses.FailedPayment,
    '11': FinancialTransferRequestStatuses.Pending,
    '12': FinancialTransferRequestStatuses.Failed,
    '13': FinancialTransferRequestStatuses.Succeeded
};

export const FinancialToNumberStatusMapper: Record<FinancialTransferRequestStatuses, string> = {
    '0': "رد شده",
    '1': "ثبت اولیه",
    '2': "در انتظار تایید",
    '3': "درانتظار پرداخت",
    '4': "پرداخت موفق",
    '5': "پرداخت ناموفق",
    "11": "در حال ارسال",
    "12": "ارسال ناموفق",
    "13": "ارسال موفق"
};