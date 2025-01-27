import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { CityGridDto, CityRequestDto } from "../@types";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: CityRequestDto) => {
    const response = await axios.post<PaginateResult<CityGridDto>>('/City', dto).then(response => response.data);
    return response;
}

export const useCities = (dto: CityRequestDto): UseQueryResult<PaginateResult<CityGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<CityGridDto>, ExceptionError>({
        queryKey: ['Cities', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateCity = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`City/${command.Id}`, { ...command });
    return data
}

export const mutCity = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateCity"], mutationFn: updateCity })