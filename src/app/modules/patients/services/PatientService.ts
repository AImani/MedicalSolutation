import { UseQueryResult, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult } from "../../general/@types"
import { PatientRequestDto } from "../@types";
import { PatientGridDto } from "../@types";

const getGetAll = async (dto: PatientRequestDto) => {
    const response = await axios.post<PaginateResult<PatientGridDto>>('/Patient', dto).then(response => response.data);
    return response;
}

export const usePatients = (dto: PatientRequestDto): UseQueryResult<PaginateResult<PatientGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<PatientGridDto>, ExceptionError>({
        queryKey: ['Patients', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}