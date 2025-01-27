import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { EducationlevelGridDto, EducationlevelRequestDto } from "../@types/EducationlevelDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: EducationlevelRequestDto) => {
    const response = await axios.post<PaginateResult<EducationlevelGridDto>>('/Educationlevel/GetAll', dto).then(response => response.data);
    return response;
}

export const useEducationlevels = (dto: EducationlevelRequestDto): UseQueryResult<PaginateResult<EducationlevelGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<EducationlevelGridDto>, ExceptionError>({
        queryKey: ['Educationlevels', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateEducationlevel = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`Educationlevel/${command.Id}`, { ...command });
    return data
}

export const mutUpdateEducationlevel = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateEducationlevel"], mutationFn: updateEducationlevel })


const createEducationlevel = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`Educationlevel`, { ...command });
    return data
}

export const mutCreateEducationlevel = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createEducationlevel"], mutationFn: createEducationlevel })

const deleteEducationlevel = async (id: number) => {
    const { data } = await axios.delete(`Educationlevel/${id}`);
    return data
}

export const mutDeleteEducationlevel = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteEducationlevel"], mutationFn: deleteEducationlevel })