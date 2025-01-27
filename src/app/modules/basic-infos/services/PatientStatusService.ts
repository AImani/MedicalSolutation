import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { PatientStatusGridDto, PatientStatusRequestDto } from "../@types/PatientStatusDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: PatientStatusRequestDto) => {
    const response = await axios.post<PaginateResult<PatientStatusGridDto>>('/PatientStatus/GetAll', dto).then(response => response.data);
    return response;
}

export const usePatientStatuses = (dto: PatientStatusRequestDto): UseQueryResult<PaginateResult<PatientStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<PatientStatusGridDto>, ExceptionError>({
        queryKey: ['PatientStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updatePatientStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`PatientStatus/${command.Id}`, { ...command });
    return data
}

export const mutUpdatePatientStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updatePatientStatus"], mutationFn: updatePatientStatus })


const createPatientStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`PatientStatus`, { ...command });
    return data
}

export const mutCreatePatientStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createPatientStatus"], mutationFn: createPatientStatus })

const deletePatientStatus = async (id: number) => {
    const { data } = await axios.delete(`PatientStatus/${id}`);
    return data
}

export const mutDeletePatientStatus = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deletePatientStatus"], mutationFn: deletePatientStatus })