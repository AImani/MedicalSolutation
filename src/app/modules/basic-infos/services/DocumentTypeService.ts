import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "../../general/@types";
import { DocumentTypeGridDto, DocumentTypeRequestDto } from "../@types/DocumentTypeDto";
import axios from "axios";
import { BasicInfoDto } from "../@types";

const getGetAll = async (dto: DocumentTypeRequestDto) => {
    const response = await axios.post<PaginateResult<DocumentTypeGridDto>>('/DocumentType/GetAll', dto).then(response => response.data);
    return response;
}

export const useDocumentTypes = (dto: DocumentTypeRequestDto): UseQueryResult<PaginateResult<DocumentTypeGridDto>, ExceptionError> => {
    return useQuery<PaginateResult<DocumentTypeGridDto>, ExceptionError>({
        queryKey: ['DocumentTypes', dto],
        queryFn: () => {
            return getGetAll(dto)
        },
        staleTime: 6 * 100000
    })
}

const updateDocumentType = async (command: BasicInfoDto) => {
    const { data } = await axios.put(`DocumentType/${command.Id}`, { ...command });
    return data
}

export const mutUpdateDocumentType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["updateDocumentType"], mutationFn: updateDocumentType })


const createDocumentType = async (command: BasicInfoDto) => {
    const { data } = await axios.post(`DocumentType`, { ...command });
    return data
}

export const mutCreateDocumentType = () =>
    useMutation<void, ExceptionError, BasicInfoDto>({ mutationKey: ["createDocumentType"], mutationFn: createDocumentType })

const deleteDocumentType = async (id: number) => {
    const { data } = await axios.delete(`DocumentType/${id}`);
    return data
}

export const mutDeleteDocumentType = () =>
    useMutation<void, ExceptionError, number>({ mutationKey: ["deleteDocumentType"], mutationFn: deleteDocumentType })