import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { EducationLevelGridDto, EducationLevelRequestDto } from "../@types/EducationLevelDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: EducationLevelRequestDto) => {
    const response = await axios.post<PaginateResult<EducationLevelGridDto>>('/EducationLevel/GetAll', dto).then(response => response.data);
    return response;
}

export const useEducationLevels = (dto: EducationLevelRequestDto): UseQueryResult<PaginateResult<EducationLevelGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<EducationLevelGridDto>, ExceptionError>({
        queryKey: ['EducationLevels', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateEducationLevel = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`EducationLevel/${command.Id}`, { ...command });
    return data
}

export const mutUpdateEducationLevel = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateEducationLevel"], mutationFn: updateEducationLevel })


const createEducationLevel = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`EducationLevel`, { ...command });
    return data
}

export const mutCreateEducationLevel = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createEducationLevel"], mutationFn: createEducationLevel })

const deleteEducationLevel = async (id: number) => {
    const { data } = await axios.delete(`EducationLevel/${id}`);
    return data
}

export const mutDeleteEducationLevel = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteEducationLevel"], mutationFn: deleteEducationLevel })