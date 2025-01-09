import { UseQueryResult, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult } from "../../general/@types"
import { AppointmentRequestRequestDto } from "../@types";
import { AppointmentRequestGridDto } from "../@types";

const getGetAll = async (dto: AppointmentRequestRequestDto) => {
    const response = await axios.post<PaginateResult<AppointmentRequestGridDto>>('/AppointmentRequest', dto).then(response => response.data);
    return response;
}

export const useAppointmentRequests = (dto: AppointmentRequestRequestDto): UseQueryResult<PaginateResult<AppointmentRequestGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<AppointmentRequestGridDto>, ExceptionError>({
        queryKey: ['AppointmentRequests', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}