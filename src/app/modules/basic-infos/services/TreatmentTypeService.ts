import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { TreatmentTypeGridDto, TreatmentTypeRequestDto } from "../@types";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: TreatmentTypeRequestDto) => {
    const response = await axios.post<PaginateResult<TreatmentTypeGridDto>>('/TreatmentType/GetAll', dto).then(response => response.data);
    return response;
}

export const useTreatmentTypees = (dto: TreatmentTypeRequestDto): UseQueryResult<PaginateResult<TreatmentTypeGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<TreatmentTypeGridDto>, ExceptionError>({
        queryKey: ['TreatmentTypes', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateTreatmentType = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`TreatmentType/${command.Id}`, { ...command });
    return data
}

export const mutUpdateTreatmentType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateTreatmentType"], mutationFn: updateTreatmentType })


const createTreatmentType = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`TreatmentType`, { ...command });
    return data
}

export const mutCreateTreatmentType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createTreatmentType"], mutationFn: createTreatmentType })

const deleteTreatmentType = async (id: number) => {
    const { data } = await axios.delete(`TreatmentType/${id}`);
    return data
}

export const mutDeleteTreatmentType = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteTreatmentType"], mutationFn: deleteTreatmentType })