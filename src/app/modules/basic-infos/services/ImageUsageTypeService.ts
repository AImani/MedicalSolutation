import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { ImageUsageTypeGridDto, ImageUsageTypeRequestDto } from "../@types";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: ImageUsageTypeRequestDto) => {
    const response = await axios.post<PaginateResult<ImageUsageTypeGridDto>>('/ImageUsageType/GetAll', dto).then(response => response.data);
    return response;
}

export const useImageUsageTypes = (dto: ImageUsageTypeRequestDto): UseQueryResult<PaginateResult<ImageUsageTypeGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<ImageUsageTypeGridDto>, ExceptionError>({
        queryKey: ['ImageUsageTypes', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateImageUsageType = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`ImageUsageType/${command.Id}`, { ...command });
    return data
}

export const mutUpdateImageUsageType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateImageUsageType"], mutationFn: updateImageUsageType })


const createImageUsageType = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`ImageUsageType`, { ...command });
    return data
}

export const mutCreateImageUsageType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createImageUsageType"], mutationFn: createImageUsageType })

const deleteImageUsageType = async (id: number) => {
    const { data } = await axios.delete(`ImageUsageType/${id}`);
    return data
}

export const mutDeleteImageUsageType = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteImageUsageType"], mutationFn: deleteImageUsageType })