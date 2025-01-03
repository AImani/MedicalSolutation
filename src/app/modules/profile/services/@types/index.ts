import { Result } from "src/app/modules/general/@types";

export interface DisabledSms {
    Cardno: string;
    Acno: string;
    Custno: string;
    FirstName: string;
    LastName: string;
    MelliCode: string;
    BirthDay: string;
    phone_No: string;
}

export type GetAllDisabledSms = Result<DisabledSms[]>;