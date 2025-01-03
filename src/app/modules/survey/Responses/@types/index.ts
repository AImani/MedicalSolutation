import {BaseRequest} from '@/app/modules/general/@types';

export interface GetSurveyRequestDto extends BaseRequest {
  IsApproved: boolean | null;
  SurveyTypeId: number | null;
  ToModifiedDateTime: string | null;
  FromModifiedDateTime: string | null;
  SurveyId: number | null;
}
export interface AdminSurveyContext {
  querySurvey?: (request: GetSurveyRequestDto) => void;
  queryParams?: GetSurveyRequestDto;
  response: any;
  selectItem(id: string | undefined): void;
  selectResponse(id: string): void;
  item?: QuestionResult[];
  Qsoption: any;
  selectQsOption(id: string): void;
}
export interface QuestionResult {
  Id: number;
  SurveyId: number;
  Text: string;
  Order: number;
  IsActive: boolean;
  SurveyQuestionResponseType: number;
  InsertDateTime: string;
  SurveyQuestionOptions: [];
}
export interface SurveyResultDto {
  Id: number;
  SurveyId: string;
  InsertDateTime: string;
  ModifiedDateTime: string;
  UserFullName: string;
  UserId: number;
  MerchantName?: string;
  RefName: string;
  OperatorResponse: string;
  IsApproved: boolean;
  SurveyType: string;
  SurveyQuestionResponses: {SurveyQuestionId: number}[];
}
export interface SurveyAdminResDto {
  surveyResponseId: number;
  id: number;
  IsApproved: boolean;
  OperatorResponse: string;
}
export interface SurveyQuestion {
  Id: number;
  Text: string;
  IsSatisfactionRate: boolean;
  SurveyQuestionOptions: SurveyQuestionOption[];
}

export interface SurveyQuestionOption {
  Id: number;
  Text: string;
  SatisfactionRate?: number;
}

export interface SurveyQuestionResponse {
  SurveyQuestionId: number;
  SurveyQuestionOptionIds: number[];
  Comment?: string;
}

export interface ResponseData {
  SurveyQuestions: SurveyQuestion[];
  SurveyResponses: {
    SurveyQuestionResponses: SurveyQuestionResponse[];
  }[];
}