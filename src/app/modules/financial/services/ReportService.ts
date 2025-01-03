import { UseQueryResult, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult } from "../../general/@types"
import { FinancialTransferDto, FinancialTransferRequestDto } from "../@types/ReportDto";

const getGetAll = async (dto: FinancialTransferRequestDto) => {
    const response = await axios.post<PaginateResult<FinancialTransferDto>>('/FinancialTransfers/GetAll', dto).then(response => response.data);
    return response;
}

export const useFinancialTransfers = (dto: FinancialTransferRequestDto): UseQueryResult<PaginateResult<FinancialTransferDto>, ExceptionError> => {
    return useQuery<PaginateResult<FinancialTransferDto>, ExceptionError>({
        queryKey: ['FinancialTransfers', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000,
        enabled: !!dto.ResponseFromDate
    })
}

export const exportAllFiltered = (dto: FinancialTransferRequestDto) =>
    axios.post(`FinancialTransfers/ExportExcel`, dto, { responseType: 'blob', });