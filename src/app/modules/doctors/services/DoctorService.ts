import { UseQueryResult, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult } from "../../general/@types"
import { DoctorRequestDto } from "../@types";
import { DoctorGridDto } from "../@types";

const getGetAll = async (dto: DoctorRequestDto) => {
    const response = await axios.get<PaginateResult<DoctorGridDto>>('/Doctor').then(response => response.data);
    return response;
}

export const useDoctors = (dto: DoctorRequestDto): UseQueryResult<PaginateResult<DoctorGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<DoctorGridDto>, ExceptionError>({
        queryKey: ['Doctors', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}