import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { VisitReasonGridDto, VisitReasonRequestDto } from "../@types";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: VisitReasonRequestDto) => {
    const response = await axios.post<PaginateResult<VisitReasonGridDto>>('/VisitReason/GetAll', dto).then(response => response.data);
    return response;
}

export const useVisitReasons = (dto: VisitReasonRequestDto): UseQueryResult<PaginateResult<VisitReasonGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<VisitReasonGridDto>, ExceptionError>({
        queryKey: ['VisitReasons', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateVisitReason = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`VisitReason/${command.Id}`, { ...command });
    return data
}

export const mutUpdateVisitReason = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateVisitReason"], mutationFn: updateVisitReason })


const createVisitReason = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`VisitReason`, { ...command });
    return data
}

export const mutCreateVisitReason = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createVisitReason"], mutationFn: createVisitReason })

const deleteVisitReason = async (id: number) => {
    const { data } = await axios.delete(`VisitReason/${id}`);
    return data
}

export const mutDeleteVisitReason = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteVisitReason"], mutationFn: deleteVisitReason })