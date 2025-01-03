import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ExceptionError, Result } from "@/app/modules/general/@types";
import { RefundWithRefNumberCommand } from "../@types";
import { ImportFromExcelResponseDto } from "../@types/BasicInfo";

const setRefundWithRefNumber = async (command: RefundWithRefNumberCommand) =>
    await axios.post<Result<string>>(`FinancialTransfers/WithRefNumber`, { ...command })
        .then(res => res.data)

export const mutRefundWithRefNumber = () =>
    useMutation<Result<string>, ExceptionError, RefundWithRefNumberCommand>({ mutationKey: ["RefundWithRefNumberCommand"], mutationFn: setRefundWithRefNumber });

//#region import excel
const importWithRefNumber = async (file: File) => {
    const formData = new FormData();
    formData.append('File', file);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    };

    const { data } = await axios.post<ImportFromExcelResponseDto>(`FinancialTransfers/Import/WithRefNumber`, formData, config);
    return data;
};

export const mutImportWithRefNumber = () =>
    useMutation<ImportFromExcelResponseDto, ExceptionError, File>({ mutationKey: ["ImportWithRefNumber"], mutationFn: importWithRefNumber })

//#endregion