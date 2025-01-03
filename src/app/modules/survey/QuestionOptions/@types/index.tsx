import { BaseRequest } from "@/app/modules/general/@types"
import { SurveyResultDto } from "../../@types"
import { GetQuestionRequestDto } from "../../Questions/@types"

export interface AddSurveyQuestionOption {
    id?:string
    Text: string
    Order: number
    SatisfactionRate:number
}
export interface GetQuestionOptionRequestDto extends BaseRequest {
    id?:string,
    SatisfactionRate: number,
    IsActive: boolean,
    FromInsertDateTime: string,
    ToInsertDateTime: string
}
  export interface AdminQuestionOptionContext {
    querySurvey: (request: GetQuestionOptionRequestDto) => void;
    queryParams:GetQuestionOptionRequestDto;
    selectItem({id, qsid}:{id: string, qsid: string}): void;
   item?: GetQuestionRequestDto;
};
export interface QuestionOptionResultDto {
    Id: number;
    SurveyQuestionId:number;
    Text: string;
    Order: number;
    IsActive: boolean;
    SatisfactionRate: number;
    InsertDateTime: string;
    SurveyQuestionOptions: [];
}