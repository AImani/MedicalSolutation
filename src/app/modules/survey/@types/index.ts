import {BaseRequest, PaginateResult, Result} from '@/app/modules/general/@types';
import { Dispatch, SetStateAction } from 'react';

export interface AdminSurveyContext {
  querySurvey: (request: GetSurveyRequestDto) => void;
  queryParams: GetSurveyRequestDto;
  selectItem(id: number ): void;
  item?: SurveyResultDto;
  setItem:Dispatch<SetStateAction<SurveyResultDto | undefined >> ;
  questions?: SurveyQuestion[];
}

export interface SurveyResultDto {
  Id: number;
  Title: string;
  Description: string;
  SurveyTypeId: number;
  SurveyType: string;
  ActivationDateTime: string;
  ExpirationDateTime: string;
  IsActive: boolean;
  IsResponseEditable: boolean;
  OperatorUserFullName: string;
  UserFullName: string;
  InsertDateTime: string;
  SurveyQuestions: {SurveyQuestionId: number}[];
  SurveyResponses: [];
  AdminComment: string;
}
export interface SetSurvey {
  Title: string;
  ActivationDateTime: string;
  ExpirationDateTime: string;
  SurveyTypeId: string;
  IsResponseEditable: boolean;
  Description: string;
}

export interface SetApprovalRequestDto {
  SurveyId: number;
  IsApproved?: boolean;
}
export interface SetCommentRequestDto {
  SurveyId: number;
  Comment: string;
}
// export interface GetSurveyRequestDto {
//   IsApproved?: boolean;
//   TotalCount?: number;
//   PageSize?: number;
//   PageIndex?: number;
//   // UserId?:number;
//   // MerchantId?:number;
//   //ServiceType?:number;
//   orderBy?: string;
// }

// export interface GetSurveyRequestDto extends BaseRequest {
//   IsApproved: boolean | null;
//   UserId: number | null;
//   MerchantId: number | null;
//   ServiceType: number | null;
//   MerchantName: string | null;
//   FromCreateDate: string | null;
//   ToCreateDate: string | null;
//   UserFullName: string | null;
//   NationalCode: string | null;
//   ServiceSatisfaction: number | null;
// }
export interface GetSurveyRequestDto extends BaseRequest {
  id?:string;
  SurveyTypeId?: number;
  SurveyId?: number;
  FromActivationDateTime?: string;
  ToActivationDateTime?: string;
  FromExpirationDateTime?: string;
  ToExpirationDateTime?: string;
  IsActive?: boolean;
  Title?: string;
}

export enum ServiceType {
  VIP = 0,
  MERCHANT = 1,
}

export interface SurveyDto {
  Id: number;
  MerchantName: string;
  Image: string;
  IsRegistered: boolean;
  ServiceType: ServiceType;
}
export interface MerchantDto {
  MerchantName: string;
}
export type MerchantResponseDto = Result<MerchantDto>;

export interface MerchantsForSurveyDto {
  MerchantId: number;
  ComplexId: number;
  MerchantName: string;
  TransactionDate: string;
  TransactionReferenceNo: string;
  HasSurvey: boolean;
  ServiceType: ServiceType;
}
export interface SurveyRequestDto extends BaseRequest {
  hasSurvey: boolean | null;
}

export interface QuestionRequestDto extends BaseRequest {
  IsPositive: boolean | null;
  ServiceType: ServiceType | null;
}

export interface QuestionDto {
  Id: number;
  TextMaxLength: number;
  Text: string;
  IsPositive: boolean;
  ServiceType: ServiceType | null;
  IsActive: boolean;
  Order: number;
}

export type SurveyResponseDto = PaginateResult<MerchantsForSurveyDto>;
export type QuestionResponseDto = Result<QuestionDto[]>;

export interface SurveyContext {
  filter: SurveyRequestDto;
  setFilter: Function;
  data?: {merchant: MerchantsForSurveyDto[]; date: string}[];
  loadMore?(): void;
  isLoading: boolean;
}

export interface MerchantSurveySaveDto {
  MerchantId: number;
  MerchantName: string;
  TransactionDate: string;
  ServiceSatisfaction: number;
  Responses: number[];
  Comment: string;
  ServiceType: ServiceType;
}

export interface VipSurveySaveDto {
  MerchantId: number;
  MerchantName: string;
  TransactionDate: string;
  ServiceSatisfaction: number;
  Responses: number[];
  Comment: string;
  ServiceType: ServiceType;
}

export type GetSurveyResponseDto = PaginateResult<SurveyResultDto[]>;

export interface SurveyQuestion {
  Id: number;
  Text: string;
  IsPositive: boolean;
  ServiceType: ServiceType | null;
  IsActive: boolean;
  Order: number;
}
export type GetSurveyTypesDto = Result<SurveyTypesDto[]>;

export interface SurveyTypesDto {
  Id: number;
  Name: string;
}
