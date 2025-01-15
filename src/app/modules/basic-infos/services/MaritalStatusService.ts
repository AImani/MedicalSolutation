import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { MaritalStatusGridDto, MaritalStatusRequestDto } from "../@types/MaritalStatusDto";
import axios from "axios";

const getGetAll = async (dto: MaritalStatusRequestDto) => {
    const response = await axios.post<PaginateResult<MaritalStatusGridDto>>('/MaritalStatus', dto).then(response => response.data);
    return response;
}

export const useMaritalStatuses = (dto: MaritalStatusRequestDto): UseQueryResult<PaginateResult<MaritalStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<MaritalStatusGridDto>, ExceptionError>({
        queryKey: ['MaritalStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}