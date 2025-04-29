import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult, Result } from "../../general/@types"
import { CreateGroupDto, GroupDto, GroupRequestDto, UpdateGroupDto } from "../@types";
import { GroupGridDto } from "../@types";

const getGetAll = async (dto: GroupRequestDto) => {
    const response = await axios.post<PaginateResult<GroupGridDto>>('/SmsGroup/GetAll', dto).then(response => response.data);
    return response;
}

export const useGroups = (dto: GroupRequestDto): UseQueryResult<PaginateResult<GroupGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<GroupGridDto>, ExceptionError>({
        queryKey: ['Groups', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const getById = async (id?: number) => {
    const response = await axios.get<Result<GroupDto>>(`/SmsGroup/${id}`).then(response => response.data);
    return response;
}

export const useGroup = (id?: number): UseQueryResult<Result<GroupDto>, ExceptionError> => {
    return useQuery<Result<GroupDto>, ExceptionError>({
        queryKey: ['SmsGroup', id],
        queryFn: () => {
            return getById(id)
        },
        enabled: !!id,
        staleTime: 6 * 100000
    })
}

const updateGroup = async (command: UpdateGroupDto) => {
    const { data } = await axios.put(`SmsGroup/${command.Id}`, { ...command });
    return data
}

export const mutUpdateGroup = () =>
    useMutation<void, ExceptionError, UpdateGroupDto>({ mutationKey: ["UpdateSmsGroup"], mutationFn: updateGroup })


const createGroup = async (command: CreateGroupDto) => {
    console.log('command', command)
    const { data } = await axios.post(`SmsGroup`, { ...command });
    return data
}

export const mutCreateGroup = () =>
    // useMutation<void, ExceptionError, CreateGroupDto>({ mutationKey: ["CreateSmsGroup"], mutationFn: createGroup })
    useMutation<void, ExceptionError, CreateGroupDto>({ mutationKey: ["CreateSmsGroup"], mutationFn: () => { console.log("function called") } })

const deleteGroup = async (id: number) => {
    const { data } = await axios.delete(`SmsGroup/${id}`);
    return data
}

export const mutDeleteGroup = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["DeleteSmsGroup"], mutationFn: deleteGroup })
