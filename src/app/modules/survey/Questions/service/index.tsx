import axios, { AxiosResponse } from "axios"
import { AddSurveyQuestionCommand, GetQuestionRequestDto } from "../@types"
import { ExceptionError } from "@/app/modules/general/@types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { request } from "http"

//#region api

export const getAllQuestions = async ( request:GetQuestionRequestDto)=>{
    const id =  request.id
    const {data} = await axios.post(`Survey/GetAllQuestions/${id}`, request);
    return data;
    // return await axios
    //     .post(`Survey/GetAllQuestions/2`, requestDto)
    //     .then((response: AxiosResponse<void>) => response.data)
}
const addQuestion = async ( requestDto: AddSurveyQuestionCommand): Promise<void> => {
    const Surveyid= requestDto.id
    const {data} =  await axios.post(`Survey/Questions/Add/${Surveyid}`, requestDto)
    return data;
}

export const toggleActiveQuestion = async (surveyQuestionId:string) => {
    const { data } = await axios.patch(`Survey/Questions/ToggleActive/${surveyQuestionId}`);
    return data;
};
export const deleteQuestion = async (surveyQuestionId:string) => {
    const { data } = await axios.delete(`Survey/Questions/Delete/${surveyQuestionId}`);
    return data;
};
//#endregion

//#region query, mutation
export const useGetAllQuestions = (request:GetQuestionRequestDto) => {
   return useQuery<GetQuestionRequestDto, Error>({queryKey: ["GetAllQuestions",request], queryFn:()=> getAllQuestions(request) });
}
export const mutAddQuestion = () =>{
    const queryClient = useQueryClient()
   return useMutation<void, ExceptionError,AddSurveyQuestionCommand>({ mutationKey: ["AddQuestion"], mutationFn:( requestDto)=>{ return addQuestion(requestDto)},
   onSuccess(data) {
    queryClient.setQueryData(['AddQuestion'],data);
    queryClient.invalidateQueries({queryKey:['GetAllQuestions']});
    
}, })
}

export const mutToggleActiveQuestion = () => {
    return useMutation<void, ExceptionError,string>({
        mutationKey: ['ToggleActiveQuestion'], mutationFn: (id: string) => {
            return toggleActiveQuestion(id);
        }
    });
};

export const mutdeleteQuestion = () => {
    return useMutation<void, ExceptionError,string>({
        mutationKey: ['deleteQuestion'], mutationFn: (id: string) => {
            return deleteQuestion(id);
        }
    });
};
export const getAllSurveys = async (request: GetQuestionRequestDto) => {
    const id=  request.id
    const {data} = await axios.post(`Survey/GetAllQuestions/${id}`, request);
    return data;
};
export const usegetAllSurvay = (request: GetQuestionRequestDto) => {
    return useQuery<GetQuestionRequestDto, Error>({ queryKey: ['GetAllQuestions', request], queryFn: () => getAllSurveys(request)});
};