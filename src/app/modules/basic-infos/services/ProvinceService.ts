import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { ProvinceGridDto, ProvinceRequestDto } from "../@types";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: ProvinceRequestDto) => {
    const response = await axios.post<PaginateResult<ProvinceGridDto>>('/Province', dto).then(response => response.data);
    return response;
}

export const useProvinces = (dto: ProvinceRequestDto): UseQueryResult<PaginateResult<ProvinceGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<ProvinceGridDto>, ExceptionError>({
        queryKey: ['Provinces', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateProvince = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`Province/${command.Id}`, { ...command });
    return data
}

export const mutProvince = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateProvince"], mutationFn: updateProvince })