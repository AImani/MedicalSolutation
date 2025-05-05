import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult, Result } from "../../general/@types"
import { SmsGroupDto, SmsGroupRequestDto, CreateSmsGroupDto, UpdateSmsGroupDto } from "../@types";
import { SmsGroupGridDto } from "../@types";

const getGetAll = async (dto: SmsGroupRequestDto) => {
    const response = await axios.post<PaginateResult<SmsGroupGridDto>>('/SmsGroup/GetAll', dto).then(response => response.data);
    return response;
}

export const useSmsGroups = (dto: SmsGroupRequestDto): UseQueryResult<PaginateResult<SmsGroupGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<SmsGroupGridDto>, ExceptionError>({
        queryKey: ['SmsGroups', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const getById = async (id?: number) => {
    const response = await axios.get<Result<SmsGroupDto>>(`/SmsGroup/${id}`).then(response => response.data);
    return response;
}

export const useSmsGroup = (id?: number): UseQueryResult<Result<SmsGroupDto>, ExceptionError> => {
    return useQuery<Result<SmsGroupDto>, ExceptionError>({
        queryKey: ['SmsGroup', id],
        queryFn: () => {
            return getById(id)
        },
        enabled: !!id,
        staleTime: 6 * 100000
    })
}

const updateSmsGroup = async (command: UpdateSmsGroupDto) => {
    const { data } = await axios.put(`SmsGroup/${command.Id}`, { ...command });
    return data
}

export const mutUpdateSmsGroup = () =>
    useMutation<void, ExceptionError, UpdateSmsGroupDto>({ mutationKey: ["UpdateSmsGroup"], mutationFn: updateSmsGroup })


const createSmsGroup = async (command: CreateSmsGroupDto) => {
    const { data } = await axios.post(`SmsGroup`, { ...command });
    return data
}

export const mutCreateSmsGroup = () =>
    useMutation<void, ExceptionError, CreateSmsGroupDto>({ mutationKey: ["CreateSmsGroup"], mutationFn: createSmsGroup })

const deleteSmsGroup = async (id: number) => {
    const { data } = await axios.delete(`SmsGroup/${id}`);
    return data
}

export const mutDeleteSmsGroup = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteSmsGroup"], mutationFn: deleteSmsGroup })

