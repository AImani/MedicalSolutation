import { BaseRequest, PaginateResult, Result } from "@/app/modules/general/@types";
import { QuestionDto, QuestionRequestDto, ServiceType } from "../../@types";

export interface SurveyQuestionsDto extends BaseRequest {
    isPositive: boolean | null;
    serviceType: ServiceType | null;
}

export interface SurveyQuestionDto {
    Id: number;
    Text: string;
    IsPositive: boolean;
    ServiceType: ServiceType | null;
    IsActive: boolean;
    Order: number;
}
const enum SurveyQuestionResponseType{
    Single = 1,
    Multi = 2,
    Descriptive = 3
}
export interface AddSurveyQuestionCommand {
    id?:string;
    Text: string
    Order: number
    IsSatisfactionRate:boolean
    SurveyQuestionResponseType: SurveyQuestionResponseType
}

export interface UpdateSurveyQuestionCommand {
    Id: number
    IsActive: boolean
    Order: number
}

export type SurveyQuestionResponseDto = PaginateResult<SurveyQuestionDto>;

export interface AdminSurveyQuestionContext {
    querySurvey: (request: GetQuestionRequestDto) => void;
    queryParams:GetQuestionRequestDto;
    selectQs({id, qsid}:{id:string,qsid:string}):void,
    Question: GetQuestionRequestDto | undefined,   
};

export interface GetQuestionRequestDto extends BaseRequest {
  id?:string,
  SurveyQuestionResponseType: SurveyQuestionResponseType,
  IsSatisfactionRate: boolean,
  IsActive: boolean,
  FromInsertDateTime: string,
  ToInsertDateTime: string
}
export interface QuestionResultDto {
    Id: number;
    SurveyId:number;
    Text: string;
    Order: number;
    SurveyTypeId: number;
    IsActive: boolean;
    SurveyQuestionResponseType: SurveyQuestionResponseType;
    InsertDateTime: string;
    SurveyQuestionOptions: [];
  }