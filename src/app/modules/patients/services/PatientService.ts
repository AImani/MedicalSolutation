import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
import { ExceptionError, PaginateResult, Result } from "../../general/@types"
import { CreatePatientDto, PatientDto, PatientRequestDto, UpdatePatientDto } from "../@types";
import { PatientGridDto } from "../@types";

const getGetAll = async (dto: PatientRequestDto) => {
    const response = await axios.post<PaginateResult<PatientGridDto>>('/Patient/GetAll', dto).then(response => response.data);
    return response;
}

export const usePatients = (dto: PatientRequestDto): UseQueryResult<PaginateResult<PatientGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<PatientGridDto>, ExceptionError>({
        queryKey: ['Patients', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const getById = async (id?: number) => {
    const response = await axios.get<Result<PatientDto>>(`/Patient/${id}`).then(response => response.data);
    return response;
}

export const usePatient = (id?: number): UseQueryResult<Result<PatientDto>, ExceptionError> => {
    return useQuery<Result<PatientDto>, ExceptionError>({
        queryKey: ['Patient', id],
        queryFn: () => {
            return getById(id)
        },
        enabled: !!id,
        staleTime: 6 * 100000
    })
}

const updatePatient = async (command: UpdatePatientDto) => {
    const { data } = await axios.put(`Patient/${command.Id}`, { ...command });
    return data
}

export const mutUpdatePatient = () =>
    useMutation<void, ExceptionError, UpdatePatientDto>({ mutationKey: ["UpdatePatient"], mutationFn: updatePatient })


const createPatient = async (command: CreatePatientDto) => {
    const { data } = await axios.post(`Patient`, { ...command });
    return data
}

export const mutCreatePatient = () =>
    useMutation<void, ExceptionError, CreatePatientDto>({ mutationKey: ["CreatePatient"], mutationFn: createPatient })

const deletePatient = async (id: number) => {
    const { data } = await axios.delete(`Patient/${id}`);
    return data
}

export const mutDeletePatient = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deletePatient"], mutationFn: deletePatient })
