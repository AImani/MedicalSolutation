import { BaseRequest } from "../../general/@types";

export interface EducationLevelRequestDto extends BaseRequest {
    Title: string | null;
}

export interface EducationLevelGridDto {
    Id: number;
    Title: string;
}

export interface EducationLevelDto {
    Id: number;
    Title: string;
}

export interface CreateEducationLevelDto {
    Title: string;
}

export interface UpdateEducationLevelDto {
    Id: number;
    Title: string;
}