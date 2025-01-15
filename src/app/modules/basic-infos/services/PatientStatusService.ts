import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { PatientStatusGridDto, PatientStatusRequestDto } from "../@types/PatientStatusDto";
import axios from "axios";

const getGetAll = async (dto: PatientStatusRequestDto) => {
    const response = await axios.post<PaginateResult<PatientStatusGridDto>>('/PatientStatus', dto).then(response => response.data);
    return response;
}

export const usePatientStatuses = (dto: PatientStatusRequestDto): UseQueryResult<PaginateResult<PatientStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<PatientStatusGridDto>, ExceptionError>({
        queryKey: ['PatientStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}