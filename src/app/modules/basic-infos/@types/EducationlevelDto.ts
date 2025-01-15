import { BaseRequest } from "../../general/@types";

export interface EducationlevelRequestDto extends BaseRequest {
    Title: string | null;
}

export interface EducationlevelGridDto {
    Id: number;
    Title: string;
}

export interface EducationlevelDto {
    Id: number;
    Title: string;
}

export interface CreateEducationlevelDto {
    Title: string;
}

export interface UpdateEducationlevelDto {
    Id: number;
    Title: string;
}