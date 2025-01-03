import axios, { AxiosResponse } from "axios";
import { BranchListDto, CashbackActionCommand, CashbackClaimCheckingResult, CashbackClaimDto, CashbackClaimStatisticDto, CashbackClaimStatus, GetAllCashbackClaimDto, SystemUserList } from "../@types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ExceptionError, PaginateResult, Result } from "@/app/modules/general/@types";
import { blobToExcelDownload } from "@/app/modules/general/helpers";

//#region api
const getAllCashbackClaims = async (request: GetAllCashbackClaimDto) => {
    return await axios.post('CashbackClaims/GetAll', request)
        .then((response: AxiosResponse<PaginateResult<CashbackClaimDto>>) => response.data)
}

export const downloadExcel = async (request: GetAllCashbackClaimDto) => {
    const { data } = await axios.post('CashbackClaims/ExportExcel', request, {
        responseType: 'blob',
    })
    blobToExcelDownload(data, "CashbackClaims")
}

const getAllCashbackClaimStatuses = async () => {
    return await axios.get('CashbackClaims/Statuses')
        .then((response: AxiosResponse<Result<CashbackClaimStatus[]>>) => {
            return response.data.Data ?? []
        });
}

const getAllSystemUsersList = async () => {
    return await axios.get('Users/GetSystemUsersSelectList')
        .then((response: AxiosResponse<Result<SystemUserList[]>>) => {
            return response.data.Data ?? []
        });
}

export const getAllBranches = async () => {
    return await axios.get(`Branches/GetAll`)
        .then((response: AxiosResponse<Result<BranchListDto[]>>) => {
            return response.data.Data ?? []
        });
}

const getStatistics = async (nationalCode: string, terminalNo: string, branchId: number) => {
    return await axios.get(`CashbackClaims/Statistics/${nationalCode}/${terminalNo}/${branchId}`)
        .then((response: AxiosResponse<Result<CashbackClaimStatisticDto>>) => {
            return response.data.Data
        });
}

const getAllCashbackClaimCheckingResultByType = async () => {
    return await axios.get(`CashbackClaims/CheckingResults`)
        .then((response: AxiosResponse<Result<CashbackClaimCheckingResult[]>>) => {
            return response.data.Data ?? []
        });
}

const setChecking = async (id: number) => {
    const { data } = await axios.patch(`CashbackClaims/Check/${id}`);
    return data;
}

const setAccepted = async (command: CashbackActionCommand) => {
    const { data } = await axios.patch(`CashbackClaims/Accept/${command.Id}`, { ...command });
    return data;
}

const setRejected = async (command: CashbackActionCommand) => {
    const { data } = await axios.patch(`CashbackClaims/Reject/${command.Id}`, { ...command });
    return data
}
//#endregion

//#region query, mutation
export const useGetAllCashbackClaims = (request: GetAllCashbackClaimDto) => {
    return useQuery<PaginateResult<CashbackClaimDto> | null, ExceptionError>({
        queryKey: ['AdminGetAllCashbackClaims', request], queryFn: () =>
            getAllCashbackClaims(request), staleTime: 60 * (60 * 1000)
    })
}

export const useCashbackClaimStatuses = () => useQuery<CashbackClaimStatus[], ExceptionError>({
    queryKey: ['CashbackClaimStatuses'], queryFn: () =>
        getAllCashbackClaimStatuses(), staleTime: 60 * (60 * 1000)
})

export const useGetAllSystemUsers = () => useQuery<SystemUserList[], ExceptionError>({
    queryKey: ['SystemUsersList'], queryFn: () =>
        getAllSystemUsersList(), staleTime: 60 * (60 * 1000)
})

export const useGetAllBranches = () => useQuery<BranchListDto[], ExceptionError>({
    queryKey: ['Branches'], queryFn: () =>
        getAllBranches(), staleTime: 60 * (60 * 1000)
})

export const useGetAllCashbackClaimCheckingResults = () => {
    return useQuery<CashbackClaimCheckingResult[] | null, ExceptionError>({
        queryKey: ['GetAllCashbackClaimCheckingResultByType'], queryFn: () =>
            getAllCashbackClaimCheckingResultByType(), staleTime: 60 * (60 * 1000)
    })
}

export const useGetStatistics = (nationalCode: string, terminalNo: string, branchId: number) => {
    return useQuery<CashbackClaimStatisticDto | null, ExceptionError>({
        queryKey: ['GetStatistics'], queryFn: () =>
            getStatistics(nationalCode, terminalNo, branchId), enabled: false, staleTime: 60 * (60 * 1000)
    })
}

export const mutSetChecking = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["setChecking"], mutationFn: setChecking })

export const mutSetAccepted = () =>
    useMutation<void, ExceptionError, CashbackActionCommand>({ mutationKey: ["setAccepted"], mutationFn: setAccepted })

export const mutSetRejected = () =>
    useMutation<void, ExceptionError, CashbackActionCommand>({ mutationKey: ["setRejected"], mutationFn: setRejected })
//#endregion