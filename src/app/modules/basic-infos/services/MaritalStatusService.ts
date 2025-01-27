import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { MaritalStatusGridDto, MaritalStatusRequestDto } from "../@types/MaritalStatusDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: MaritalStatusRequestDto) => {
    const response = await axios.post<PaginateResult<MaritalStatusGridDto>>('/MaritalStatus/GetAll', dto).then(response => response.data);
    return response;
}

export const useMaritalStatuses = (dto: MaritalStatusRequestDto): UseQueryResult<PaginateResult<MaritalStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<MaritalStatusGridDto>, ExceptionError>({
        queryKey: ['MaritalStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateMaritalStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`MaritalStatus/${command.Id}`, { ...command });
    return data
}

export const mutUpdateMaritalStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateMaritalStatus"], mutationFn: updateMaritalStatus })


const createMaritalStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`MaritalStatus`, { ...command });
    return data
}

export const mutCreateMaritalStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createMaritalStatus"], mutationFn: createMaritalStatus })

const deleteMaritalStatus = async (id: number) => {
    const { data } = await axios.delete(`MaritalStatus/${id}`);
    return data
}

export const mutDeleteMaritalStatus = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteMaritalStatus"], mutationFn: deleteMaritalStatus })