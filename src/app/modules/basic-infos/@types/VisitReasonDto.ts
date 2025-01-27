import { BaseRequest } from "../../general/@types";

export interface VisitReasonRequestDto extends BaseRequest {
    Title: string | null;
}

export interface VisitReasonGridDto {
    Id: number;
    Title: string;
}

export interface VisitReasonDto {
    Id: number;
    Title: string;
}

export interface CreateVisitReasonDto {
    Title: string;
}

export interface UpdateVisitReasonDto {
    Id: number;
    Title: string;
}