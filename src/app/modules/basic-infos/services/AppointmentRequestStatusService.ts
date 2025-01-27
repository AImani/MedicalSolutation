import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { AppointmentRequestStatusGridDto, AppointmentRequestStatusRequestDto } from "../@types/AppointmentRequestStatusDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: AppointmentRequestStatusRequestDto) => {
    const response = await axios.post<PaginateResult<AppointmentRequestStatusGridDto>>('/AppointmentRequestStatus/GetAll', dto).then(response => response.data);
    return response;
}

export const useAppointmentRequestStatuses = (dto: AppointmentRequestStatusRequestDto): UseQueryResult<PaginateResult<AppointmentRequestStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<AppointmentRequestStatusGridDto>, ExceptionError>({
        queryKey: ['AppointmentRequestStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateAppointmentRequestStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`AppointmentRequestStatus/${command.Id}`, { ...command });
    return data
}

export const mutUpdateAppointmentRequestStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateAppointmentRequestStatus"], mutationFn: updateAppointmentRequestStatus })


const createAppointmentRequestStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`AppointmentRequestStatus`, { ...command });
    return data
}

export const mutCreateAppointmentRequestStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createAppointmentRequestStatus"], mutationFn: createAppointmentRequestStatus })

const deleteAppointmentRequestStatus = async (id: number) => {
    const { data } = await axios.delete(`AppointmentRequestStatus/${id}`);
    return data
}

export const mutDeleteAppointmentRequestStatus = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteAppointmentRequestStatus"], mutationFn: deleteAppointmentRequestStatus })