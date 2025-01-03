import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ExceptionError, Result } from "@/app/modules/general/@types";
import { TransferWithIbanCommand } from "../@types";

const setFinancialTransfer = async (command: TransferWithIbanCommand) =>
    await axios.post<Result<string>>(`FinancialTransfers/WithIban`, { ...command })
        .then(res => res.data)

export const mutFinancialTransfer = () =>
    useMutation<Result<string>, ExceptionError, TransferWithIbanCommand>({ mutationKey: ["TransferWithIbanCommand"], mutationFn: setFinancialTransfer })
