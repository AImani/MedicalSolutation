import { PaginateResult } from "src/app/modules/general/@types";

export interface AdminCashbackClaimContext {
    queryCashbackClaims: (request: GetAllCashbackClaimDto) => void
    getExcel: (request: GetAllCashbackClaimDto) => void
    queryParams: GetAllCashbackClaimDto
    items?: PaginateResult<CashbackClaimDto> | null;
    isLoading: boolean;
    statuses?: CashbackClaimStatus[];
    systemUsers?: SystemUserList[];
    branchList?: BranchListDto[];
    cashbackClaimCheckingResults?: CashbackClaimCheckingResult[] | null;
    showActionModal: boolean
    toggleActionModal: (value: boolean) => void
    detailedCashbackClaim: CashbackClaimDto | null
    setCheckingLoading: boolean
    setAcceptedLoading: boolean,
    setRejectedLoading: boolean,
    isDownloading: boolean,
    showActionModalWithoutSetChecking: (value: CashbackClaimDto) => void,
    setChecking: (value: CashbackClaimDto) => void,
    setAccepted: (command: CashbackActionCommand) => void,
    setRejected: (command: CashbackActionCommand) => void,
    statistics?: CashbackClaimStatisticDto | null,
}


export interface GetAllCashbackClaimDto {
    NationalCode: string;
    StatusId: number | null;
    ReferenceNo: number | null;
    FromDate: string | null;
    ToDate: string | null;
    OperatorId: number | null;
    BranchId: number | null;
    TerminalNo: string | null;
    TotalCount?: number;
    PageSize?: number;
    PageIndex?: number;
    orderBy?: string;
}



// export interface CashbackClaimDto {
//     Id: number;
//     StatusId: number;
//     Status: string
//     CustomerNationalCode: string;
//     CustomerPhoneNumber: string;
//     TerminalNo: string;
//     OperatorResponse: string;
//     CardNo: number;
//     TransactionAmount: number;
//     TransactionDate: number;
//     BranchName: string;
//     BranchId: number;
//     TransactionReferenceNo: number;
//     CustomerFullName: string
//     InsertDateTime: string
//     ModifiedDateTime: string
//     OperatorFullName?: string
//     File?: string | null,
//     UserComment: string,
//     CashbackClaimCheckingResultName: string | null
//     CashbackClaimCheckingResultId: number | null
// }

export interface CashbackClaimDto {
    Id: number;
    StatusId: number;
    Status: string;
    CustomerNationalCode: string;
    CustomerPhoneNumber: string;
    TerminalNo: string;
    CardNo: number;
    TransactionAmount: number;
    TransactionDate: number;
    BranchName: string;
    BranchId: number;
    TransactionReferenceNo: number;
    CustomerFullName: string | null;
    OperatorFullName: string | null;
    OperatorResponse: string | null;
    UserComment: string;
    File: string | null;
    CashbackClaimCheckingResultId: number | null;
    CashbackClaimCheckingResultName: string | null;
    InsertDateTime: string;
    ModifiedDateTime: string | null;
}

export interface BranchListDto {
    Id: number,
    Name: string
}

export interface CashbackClaimStatus {
    Id: number,
    Name: string
}

export interface CashbackClaimCheckingResult {
    Id: number,
    Name: string,
    Type: CashbackClaimActionType
}

export interface SystemUserList {
    UserId: number,
    FullName: string
}

export interface CashbackActionCommand {
    Comment: string
    Id: number,
    Type: CashbackClaimActionType | null,
    CashbackClaimCheckingResultId: number | null;
}

export enum CashbackClaimActionType {
    Accept = 1,
    Reject = 2
}

export interface CashbackClaimStatisticPerBranchDto {
    BranchId: number
    CheckingCount: number;
    AcceptedCount: number;
    RejectedCount: number;
    InitialSubmitCount: number;
    Total: number
}

export interface CashbackClaimStatisticPerTerminalDto {
    TerminalNo: string
    CheckingCount: number;
    AcceptedCount: number;
    RejectedCount: number;
    InitialSubmitCount: number;
    Total: number
}

export interface CashbackClaimStatisticPerUserDto {
    NationalCode: string
    CheckingCount: number;
    AcceptedCount: number;
    RejectedCount: number;
    InitialSubmitCount: number;
    Total: number
}

export interface CashbackClaimStatisticDto {
    PerBranch: CashbackClaimStatisticPerBranchDto,
    PerTerminal: CashbackClaimStatisticPerTerminalDto,
    PerUser: CashbackClaimStatisticPerUserDto
}

