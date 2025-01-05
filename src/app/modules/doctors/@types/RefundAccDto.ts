export interface RefundWithAccNumberCommand {
    FromBankAccountId: number,
    ToBankAccountNo: string,
    Amount: string,
    Description: string
}
export interface AccNumberResponse{
    Acno_Id: string;
    FirstName:string;
    LastName:string;
}