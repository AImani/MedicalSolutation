import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { GroupStatusGridDto, GroupStatusRequestDto } from "../@types/GroupStatusDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: GroupStatusRequestDto) => {
    const response = await axios.post<PaginateResult<GroupStatusGridDto>>('/GroupStatus/GetAll', dto).then(response => response.data);
    return response;
}

export const useGroupStatuses = (dto: GroupStatusRequestDto): UseQueryResult<PaginateResult<GroupStatusGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<GroupStatusGridDto>, ExceptionError>({
        queryKey: ['GroupStatuses', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateGroupStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`GroupStatus/${command.Id}`, { ...command });
    return data
}

export const mutUpdateGroupStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateGroupStatus"], mutationFn: updateGroupStatus })


const createGroupStatus = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`GroupStatus`, { ...command });
    return data
}

export const mutCreateGroupStatus = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createGroupStatus"], mutationFn: createGroupStatus })

const deleteGroupStatus = async (id: number) => {
    const { data } = await axios.delete(`GroupStatus/${id}`);
    return data
}

export const mutDeleteGroupStatus = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteGroupStatus"], mutationFn: deleteGroupStatus })
