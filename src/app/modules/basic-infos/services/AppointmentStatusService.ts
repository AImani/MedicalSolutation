import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { AppointmentStatusGridDto, AppointmentStatusRequestDto } from "../@types";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: AppointmentStatusRequestDto) => {
    const response = await axios.post<PaginateResult<AppointmentStatusGridDto>>('/AppointmentStatus/GetAll', dto).then(response => response.data);
    return response;
}

export const useAppointmentStatuses = (dto: AppointmentStatusRequestDto): UseQueryResult<PaginateResult<AppointmentStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<AppointmentStatusGridDto>, ExceptionError>({
        queryKey: ['AppointmentStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateAppointmentStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`AppointmentStatus/${command.Id}`, { ...command });
    return data
}

export const mutUpdateAppointmentStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateAppointmentStatus"], mutationFn: updateAppointmentStatus })


const createAppointmentStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`AppointmentStatus`, { ...command });
    return data
}

export const mutCreateAppointmentStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createAppointmentStatus"], mutationFn: createAppointmentStatus })

const deleteAppointmentStatus = async (id: number) => {
    const { data } = await axios.delete(`AppointmentStatus/${id}`);
    return data
}

export const mutDeleteAppointmentStatus = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteAppointmentStatus"], mutationFn: deleteAppointmentStatus })