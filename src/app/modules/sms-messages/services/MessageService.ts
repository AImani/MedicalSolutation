import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult, Result } from "../../general/@types"
import { CreateMessageDto, MessageDto, MessageRequestDto, UpdateMessageDto } from "../@types";
import { MessageGridDto } from "../@types";

const getGetAll = async (dto: MessageRequestDto) => {
    const response = await axios.post<PaginateResult<MessageGridDto>>('/Message/GetAll', dto).then(response => response.data);
    return response;
}

export const useMessages = (dto: MessageRequestDto): UseQueryResult<PaginateResult<MessageGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<MessageGridDto>, ExceptionError>({
        queryKey: ['Messages', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const getById = async (id?: number) => {
    const response = await axios.get<Result<MessageDto>>(`/Message/${id}`).then(response => response.data);
    return response;
}

export const useMessage = (id?: number): UseQueryResult<Result<MessageDto>, ExceptionError> => {
    return useQuery<Result<MessageDto>, ExceptionError>({
        queryKey: ['Message', id],
        queryFn: () => {
            return getById(id)
        },
        enabled: !!id,
        staleTime: 6 * 100000
    })
}

const updateMessage = async (command: UpdateMessageDto) => {
    const { data } = await axios.put(`Message/${command.Id}`, { ...command });
    return data
}

export const mutUpdateMessage = () =>
    useMutation<void, ExceptionError, UpdateMessageDto>({ mutationKey: ["UpdateMessage"], mutationFn: updateMessage })


const createMessage = async (command: CreateMessageDto) => {
    const { data } = await axios.post(`Message`, { ...command });
    return data
}

export const mutCreateMessage = () =>
    useMutation<void, ExceptionError, CreateMessageDto>({ mutationKey: ["CreateMessage"], mutationFn: createMessage })

const deleteMessage = async (id: number) => {
    const { data } = await axios.delete(`Message/${id}`);
    return data
}

export const mutDeleteMessage = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteMessage"], mutationFn: deleteMessage })
