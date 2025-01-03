import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GetSurveyRequestDto, GetSurveyResponseDto, GetSurveyTypesDto } from "../@types";
import { ExceptionError } from "../../general/@types";
//#region api
export const getSurveyTypes = async () => {
    const {data} = await axios.get<GetSurveyTypesDto>('Survey/SurveyTypes');
    return data;
};
export const getAllSurveys = async (request: GetSurveyRequestDto) => {
    const { data } = await axios.post('Survey/GetAll', request);
    return data;
};
export const setSurvay = async (request: GetSurveyRequestDto) => {
    const { data } = await axios.post('Survey', request);
    return data;
};
export const updateSurvay = async (request: GetSurveyRequestDto) => {
    const id = request.id;
    const { data } = await axios.put(`Survey/${id}`, request);
    return data;
};
export const deleteSurvey = async (id:string) => {
    const { data } = await axios.delete(`Survey/${id}`);
    return data;
};

export const ToggleActiveSurvey = async (id:string) => {
    const { data } = await axios.patch(`Survey/ToggleActive/${id}`);
    return data;
};
//#endregion

//#region query, mutation
export const usegetSurveyTypes = () => {
    return useQuery< GetSurveyTypesDto, ExceptionError>({ queryKey: ['SurveyTypes'], queryFn: ()=> getSurveyTypes()});
};
export const usegetAllSurvay = (request: GetSurveyRequestDto) => {
    return useQuery<GetSurveyResponseDto, Error>({ queryKey: ['getAllSurvey', request], queryFn: () => getAllSurveys(request)});
};
export const mutsetSurvay = () => {
    const queryClient = useQueryClient()
    return useMutation<void, ExceptionError,GetSurveyRequestDto>({
        mutationKey: ['SetSurvey'], mutationFn: (request: GetSurveyRequestDto) => {
            return setSurvay(request);
        },onSuccess(data) {
            queryClient.setQueryData(['SetSurvey'],data)
        },
    });
};

export const mutupdateSurvey = () => {
   
    return useMutation<void, ExceptionError,GetSurveyRequestDto>({
        mutationKey: ['updateSurvey'], mutationFn: (request:GetSurveyRequestDto) => {
            return updateSurvay( request);
        }
    });
};

export const mutdeleteSurvey = () => {
    return useMutation<void, ExceptionError,string>({
        mutationKey: ['deleteSurvey'], mutationFn: (id: string) => {
            return deleteSurvey(id);
        }
    });
};
export const mutToggleActiveSurvey = () => {
    return useMutation<void, ExceptionError,string>({
        mutationKey: ['ToggleActiveSurvey'], mutationFn: (id: string) => {
            return ToggleActiveSurvey(id);
        }
    });
};