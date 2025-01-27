import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { PhoneNumberTypeGridDto, PhoneNumberTypeRequestDto } from "../@types/PhoneNumberTypeDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: PhoneNumberTypeRequestDto) => {
    const response = await axios.post<PaginateResult<PhoneNumberTypeGridDto>>('/PhoneNumberType/GetAll', dto).then(response => response.data);
    return response;
}

export const usePhoneNumberTypes = (dto: PhoneNumberTypeRequestDto): UseQueryResult<PaginateResult<PhoneNumberTypeGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<PhoneNumberTypeGridDto>, ExceptionError>({
        queryKey: ['PhoneNumberTypes', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updatePhoneNumberType = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`PhoneNumberType/${command.Id}`, { ...command });
    return data
}

export const mutUpdatePhoneNumberType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updatePhoneNumberType"], mutationFn: updatePhoneNumberType })


const createPhoneNumberType = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`PhoneNumberType`, { ...command });
    return data
}

export const mutCreatePhoneNumberType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createPhoneNumberType"], mutationFn: createPhoneNumberType })

const deletePhoneNumberType = async (id: number) => {
    const { data } = await axios.delete(`PhoneNumberType/${id}`);
    return data
}

export const mutDeletePhoneNumberType = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deletePhoneNumberType"], mutationFn: deletePhoneNumberType })