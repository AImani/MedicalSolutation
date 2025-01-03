export interface TransferWithIbanCommand {
    FromBankAccountId: number,
    ToBankAccountId: number,
    Amount: string,
    Description: string
}