import { BaseRequest } from "../../general/@types";

export interface FinancialTransferRequestDto extends BaseRequest {
    FromBankAccountId: number | null;
    ToBankAccountId?: number | null;
    ResponseFromDate: Date;
    ResponseToDate: Date;
    RefNumber?: string;
    RefundApiResponse_ReferenceNumber?: string;
    Succeeded?: boolean;
}

export interface FinancialTransferDto {
    Id: number;
    FromBankAccountName: string | null;
    ToBankAccountName: string | null;
    FromAccountNo: string;
    ToIban: string | null;
    RefNumber: string | null;
    Succeeded: boolean;
    StatusId: number;
    StatusName: string;
    OperatorFullName: string;
    ReviewerFullName: string;
    Amount: string;
    Description: string;
    ResponseDateTime: string;
    InsertDateTime: string;
    RefundApiResponse_Description: string | null;
    RefundApiResponse_ReferenceNumber: string | null;
}
