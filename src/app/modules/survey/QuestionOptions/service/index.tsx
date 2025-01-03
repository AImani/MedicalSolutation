import axios from "axios"
import { AddSurveyQuestionOption, GetQuestionOptionRequestDto } from "../@types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ExceptionError } from "@/app/modules/general/@types"

const addQuestionOption = async ( request: AddSurveyQuestionOption) => {
    const id = request.id
    const {data} =  await axios.post(`Survey/Questions/Options/Add/${id}`, request)
    return data
}

export const toggleActiveQuestionOption = async (surveyQuestionOptionId:string) => {
    const { data } = await axios.patch(`Survey/Questions/Options/ToggleActive/${surveyQuestionOptionId}`);
    return data;
};
export const getAllQuestionOption = async (request: GetQuestionOptionRequestDto) => {
    const id=  request.id
    const {data} = await axios.post(`Survey/GetAllQuestionOptions/${id}`, request);
    return data;
};

export const usegetAllQuestionOption = (request: GetQuestionOptionRequestDto) => {
    return useQuery<GetQuestionOptionRequestDto, Error>({ queryKey: ['GetAllQuestionOptions', request], queryFn: () => getAllQuestionOption(request)});
};

export const mutAddQuestionOption = () =>
    useMutation<void, ExceptionError,AddSurveyQuestionOption>({ mutationKey: ["AddQuestionOption"],
 mutationFn:(request: AddSurveyQuestionOption)=> addQuestionOption(request) });

export const mutToggleActiveOption = () => {
    return useMutation<void, ExceptionError,string>({
        mutationKey: ['ToggleActiveOption'], mutationFn: (id: string) => {
            return toggleActiveQuestionOption(id);
        }
    });
};