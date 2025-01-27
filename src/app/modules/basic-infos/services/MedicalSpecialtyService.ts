import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { MedicalSpecialtyGridDto, MedicalSpecialtyRequestDto } from "../@types/MedicalSpecialtyDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: MedicalSpecialtyRequestDto) => {
    const response = await axios.post<PaginateResult<MedicalSpecialtyGridDto>>('/MedicalSpecialty/GetAll', dto).then(response => response.data);
    return response;
}

export const useMedicalSpecialties = (dto: MedicalSpecialtyRequestDto): UseQueryResult<PaginateResult<MedicalSpecialtyGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<MedicalSpecialtyGridDto>, ExceptionError>({
        queryKey: ['MedicalSpecialties', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateMedicalSpecialty = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`MedicalSpecialty/${command.Id}`, { ...command });
    return data
}

export const mutUpdateMedicalSpecialty = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateMedicalSpecialty"], mutationFn: updateMedicalSpecialty })


const createMedicalSpecialty = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`MedicalSpecialty`, { ...command });
    return data
}

export const mutCreateMedicalSpecialty = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createMedicalSpecialty"], mutationFn: createMedicalSpecialty })

const deleteMedicalSpecialty = async (id: number) => {
    const { data } = await axios.delete(`MedicalSpecialty/${id}`);
    return data
}

export const mutDeleteMedicalSpecialty = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteMedicalSpecialty"], mutationFn: deleteMedicalSpecialty })