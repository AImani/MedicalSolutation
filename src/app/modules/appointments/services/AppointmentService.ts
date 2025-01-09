import { UseQueryResult, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult } from "../../general/@types"
import { AppointmentReqDto } from "../@types";
import { AppointmentGridDto } from "../@types";

const getGetAll = async (dto: AppointmentReqDto) => {
    const response = await axios.post<PaginateResult<AppointmentGridDto>>('/Appointment', dto).then(response => response.data);
    return response;
}

export const useAppointments = (dto: AppointmentReqDto): UseQueryResult<PaginateResult<AppointmentGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<AppointmentGridDto>, ExceptionError>({
        queryKey: ['Appointments', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}