export interface RefundWithRefNumberCommand {
    FromBankAccountId: number,
    RefNumber: string,
    Amount: string,
    Description: string
}