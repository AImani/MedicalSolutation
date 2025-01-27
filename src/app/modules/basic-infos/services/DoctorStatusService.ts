import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { DoctorStatusGridDto, DoctorStatusRequestDto } from "../@types";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: DoctorStatusRequestDto) => {
    const response = await axios.post<PaginateResult<DoctorStatusGridDto>>('/DoctorStatus/GetAll', dto).then(response => response.data);
    return response;
}

export const useDoctorStatuses = (dto: DoctorStatusRequestDto): UseQueryResult<PaginateResult<DoctorStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<DoctorStatusGridDto>, ExceptionError>({
        queryKey: ['DoctorStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateDoctorStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`DoctorStatus/${command.Id}`, { ...command });
    return data
}

export const mutUpdateDoctorStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateDoctorStatus"], mutationFn: updateDoctorStatus })


const createDoctorStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`DoctorStatus`, { ...command });
    return data
}

export const mutCreateDoctorStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createDoctorStatus"], mutationFn: createDoctorStatus })

const deleteDoctorStatus = async (id: number) => {
    const { data } = await axios.delete(`DoctorStatus/${id}`);
    return data
}

export const mutDeleteDoctorStatus = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteDoctorStatus"], mutationFn: deleteDoctorStatus })