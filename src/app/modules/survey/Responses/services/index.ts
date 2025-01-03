import { useMutation, useQuery } from "@tanstack/react-query";
import {  GetSurveyRequestDto, SurveyAdminResDto } from "../@types";
import axios from "axios";
import { ExceptionError } from "@/app/modules/general/@types";



export const getSurvayResponses = async (request: GetSurveyRequestDto) => {
    const { data } = await axios.post('Survey/GetAllResponse', request);
    return data;
};
export const setAdminRespons = async (request: SurveyAdminResDto) => {
    const {surveyResponseId, id} = request
    const { data } = await axios.post(`Survey/OperatorResponse/${id}/${surveyResponseId}`, request);
    return data;
};
export const getSurveyResponse = async (responseId: string) => {
    const { data } = await axios.post(`Survey/Response/${responseId}`);
    return data;
};
export const usegetSurvayResponse = (request: GetSurveyRequestDto) => {
    return useQuery({ queryKey: ['getSurvayResponse', request], queryFn: () => getSurvayResponses(request)});
};
export const mutAdminRespons = () => {
  
    return useMutation<void, ExceptionError,SurveyAdminResDto>({
        mutationKey: ['SetAdminRespons'], mutationFn: (request: SurveyAdminResDto) => {
            return setAdminRespons(request);
        }
    });
};

export const useGetSurvayResponse = () => {
    return useMutation({
        mutationKey: ['GetSurveyRespons'], mutationFn: (responseId: string) => {
            return getSurveyResponse(responseId);
        }
    });
};