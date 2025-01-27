import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { AppointmentPurposeGridDto, AppointmentPurposeRequestDto } from "../@types/AppointmentPurposeDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: AppointmentPurposeRequestDto) => {
    const response = await axios.post<PaginateResult<AppointmentPurposeGridDto>>('/AppointmentPurpose/GetAll', dto).then(response => response.data);
    return response;
}

export const useAppointmentPurposes = (dto: AppointmentPurposeRequestDto): UseQueryResult<PaginateResult<AppointmentPurposeGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<AppointmentPurposeGridDto>, ExceptionError>({
        queryKey: ['AppointmentPurposes', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateAppointmentPurpose = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`AppointmentPurpose/${command.Id}`, { ...command });
    return data
}

export const mutUpdateAppointmentPurpose = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateAppointmentPurpose"], mutationFn: updateAppointmentPurpose })


const createAppointmentPurpose = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`AppointmentPurpose`, { ...command });
    return data
}

export const mutCreateAppointmentPurpose = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createAppointmentPurpose"], mutationFn: createAppointmentPurpose })

const deleteAppointmentPurpose = async (id: number) => {
    const { data } = await axios.delete(`AppointmentPurpose/${id}`);
    return data
}

export const mutDeleteAppointmentPurpose = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteAppointmentPurpose"], mutationFn: deleteAppointmentPurpose })