import axios from "axios";
import { ExceptionError, Result } from "@/app/modules/general/@types";
import { BankAccountSelectListDto, StatusDto } from "../@types/BasicInfo";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { blobToExcelDownload } from "../../general/helpers";

const getBankAccounts = async () => {
    const { data } = await axios.get<Result<BankAccountSelectListDto[]>>('/BankAccounts/SelectList');
    return data;
}

export const useBankAccounts = (): UseQueryResult<Result<BankAccountSelectListDto[]>, ExceptionError> => {
    return useQuery<Result<BankAccountSelectListDto[]>, ExceptionError>({
        queryKey: ['BankAccounts'],
        queryFn: () => getBankAccounts(),
        staleTime: 60 * (60 * 1000)
    })
}

const getStatuses = async () => {
    const { data } = await axios.get<Result<StatusDto[]>>('/FinancialTransfers/Statuses');
    return data;
}

export const useStatuses = (): UseQueryResult<Result<StatusDto[]>, ExceptionError> => {
    return useQuery<Result<StatusDto[]>, ExceptionError>({
        queryKey: ['FinancialTransferStatuses'],
        queryFn: () => getStatuses(),
        staleTime: 60 * (60 * 1000)
    })
}

export const downloadRefNumberSampleExcelFile = async () => {
    const { data } = await axios.get('FinancialTransfers/DownloadExcelTemplate/RefNumber', {
        responseType: 'blob',
    });
    blobToExcelDownload(data, "ImportRefNumberSample");
};