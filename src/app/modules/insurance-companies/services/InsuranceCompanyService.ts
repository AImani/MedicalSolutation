import { UseQueryResult, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult } from "../../general/@types"
import { InsuranceCompanyRequestDto } from "../@types";
import { InsuranceCompanyGridDto } from "../@types";

const getGetAll = async (dto: InsuranceCompanyRequestDto) => {
    const response = await axios.post<PaginateResult<InsuranceCompanyGridDto>>('/InsuranceCompany', dto).then(response => response.data);
    return response;
}

export const useInsuranceCompanies = (dto: InsuranceCompanyRequestDto): UseQueryResult<PaginateResult<InsuranceCompanyGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<InsuranceCompanyGridDto>, ExceptionError>({
        queryKey: ['InsuranceCompaniess', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}