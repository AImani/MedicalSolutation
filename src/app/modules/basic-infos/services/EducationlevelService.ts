import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { EducationlevelGridDto, EducationlevelRequestDto } from "../@types/EducationlevelDto";
import axios from "axios";

const getGetAll = async (dto: EducationlevelRequestDto) => {
    const response = await axios.post<PaginateResult<EducationlevelGridDto>>('/Educationlevel', dto).then(response => response.data);
    return response;
}

export const useEducationleveles = (dto: EducationlevelRequestDto): UseQueryResult<PaginateResult<EducationlevelGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<EducationlevelGridDto>, ExceptionError>({
        queryKey: ['Educationleveles', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}