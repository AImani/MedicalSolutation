import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult, Result } from "../../general/@types"
import { CreateInsuranceCompanyDto, InsuranceCompanyDto, InsuranceCompanyRequestDto, UpdateInsuranceCompanyDto } from "../@types";
import { InsuranceCompanyGridDto } from "../@types";

const getGetAll = async (dto: InsuranceCompanyRequestDto) => {
    const response = await axios.post<PaginateResult<InsuranceCompanyGridDto>>('/InsuranceCompany/GetAll', dto).then(response => response.data);
    return response;
}

export const useInsuranceCompanies = (dto: InsuranceCompanyRequestDto): UseQueryResult<PaginateResult<InsuranceCompanyGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<InsuranceCompanyGridDto>, ExceptionError>({
        queryKey: ['InsuranceCompanys', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const getById = async (id?: string) => {
    const response = await axios.get<Result<InsuranceCompanyDto>>(`/InsuranceCompany/${id}`).then(response => response.data);
    return response;
}

export const useInsuranceCompany = (id?: string): UseQueryResult<Result<InsuranceCompanyDto>, ExceptionError> => {
    return useQuery<Result<InsuranceCompanyDto>, ExceptionError>({
        queryKey: ['InsuranceCompany', id],
        queryFn: () => {
            return getById(id)
        },
        enabled: !!id,
        staleTime: 6 * 100000
    })
}

const updateInsuranceCompany = async (command: UpdateInsuranceCompanyDto) => {
    const { data } = await axios.put(`InsuranceCompany/${command.Id}`, { ...command });
    return data
}

export const mutUpdateInsuranceCompany = () =>
    useMutation<void, ExceptionError, UpdateInsuranceCompanyDto>({ mutationKey: ["UpdateInsuranceCompany"], mutationFn: updateInsuranceCompany })


const createInsuranceCompany = async (command: CreateInsuranceCompanyDto) => {
    const { data } = await axios.post(`InsuranceCompany`, { ...command });
    return data
}

export const mutCreateInsuranceCompany = () =>
    useMutation<void, ExceptionError, CreateInsuranceCompanyDto>({ mutationKey: ["CreateInsuranceCompany"], mutationFn: createInsuranceCompany })

const deleteInsuranceCompany = async (id: number) => {
    const { data } = await axios.delete(`InsuranceCompany/${id}`);
    return data
}

export const mutDeleteInsuranceCompany = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteInsuranceCompany"], mutationFn: deleteInsuranceCompany })
