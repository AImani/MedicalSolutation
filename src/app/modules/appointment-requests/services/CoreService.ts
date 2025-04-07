import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult, Result } from "../../general/@types"
import { AppointmentRequestDto, AppointmentRequestRequestDto, ApproveAppointmentRequestDto, CreateAppointmentRequestDto, UpdateAppointmentRequestDto } from "../@types";
import { AppointmentRequestGridDto } from "../@types";
import { CreateAppointmentDto } from "../../appointments/@types";

const getGetAll = async (dto: AppointmentRequestRequestDto) => {
    const response = await axios.post<PaginateResult<AppointmentRequestGridDto>>('/AppointmentRequest/GetAll', dto).then(response => response.data);
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

const getById = async (id?: number) => {
    const response = await axios.get<Result<AppointmentRequestDto>>(`/AppointmentRequest/${id}`).then(response => response.data);
    return response;
}

export const useAppointmentRequest = (id?: number): UseQueryResult<Result<AppointmentRequestDto>, ExceptionError> => {
    return useQuery<Result<AppointmentRequestDto>, ExceptionError>({
        queryKey: ['AppointmentRequest', id],
        queryFn: () => {
            return getById(id)
        },
        enabled: !!id,
        staleTime: 6 * 100000
    })
}

const updateAppointmentRequest = async (command: UpdateAppointmentRequestDto) => {
    const { data } = await axios.put(`AppointmentRequest/${command.Id}`, { ...command });
    return data
}

export const mutUpdateAppointmentRequest = () =>
    useMutation<void, ExceptionError, UpdateAppointmentRequestDto>({ mutationKey: ["UpdateAppointmentRequest"], mutationFn: updateAppointmentRequest })


const createAppointmentRequest = async (command: CreateAppointmentRequestDto) => {
    const { data } = await axios.post(`AppointmentRequest`, { ...command });
    return data
}

export const mutCreateAppointmentRequest = () =>
    useMutation<void, ExceptionError, CreateAppointmentRequestDto>({ mutationKey: ["CreateAppointmentRequest"], mutationFn: createAppointmentRequest })

const deleteAppointmentRequest = async (id: number) => {
    const { data } = await axios.delete(`AppointmentRequest/${id}`);
    return data
}

export const mutDeleteAppointmentRequest = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteAppointmentRequest"], mutationFn: deleteAppointmentRequest })

const approve = async (command: ApproveAppointmentRequestDto) => {
    const { data } = await axios.patch(`AppointmentRequest/Approve/${command.Id}`, { ...command.Appointment });
    return data
}

export const mutApprove = () =>
    useMutation<void, ExceptionError, ApproveAppointmentRequestDto>({ mutationKey: ["ApproveAppointmentRequest"], mutationFn: approve })


const reject = async (command: number) => {
    const { data } = await axios.patch(`AppointmentRequest/Approve/${command}`);
    return data
}

export const mutReject = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["RejectAppointmentRequest"], mutationFn: reject })

const cancel = async (command: number) => {
    const { data } = await axios.patch(`AppointmentRequest/Approve/${command}`);
    return data
}

export const mutCancel = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["CancelAppointmentRequest"], mutationFn: cancel })