import { BaseRequest } from "../../general/@types";

export interface ImageUsageTypeRequestDto extends BaseRequest {
    Title: string | null;
}

export interface ImageUsageTypeGridDto {
    Id: number;
    Title: string;
}

export interface ImageUsageTypeDto {
    Id: number;
    Title: string;
}

export interface CreateImageUsageTypeDto {
    Title: string;
}

export interface UpdateImageUsageTypeDto {
    Id: number;
    Title: string;
}