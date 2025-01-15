import { BaseRequest } from "../../general/@types";

export interface DocumentTypeRequestDto extends BaseRequest {
    Title: string | null;
}

export interface DocumentTypeGridDto {
    Id: number;
    Title: string;
}

export interface DocumentTypeDto {
    Id: number;
    Title: string;
}

export interface CreateDocumentTypeDto {
    Title: string;
}

export interface UpdateDocumentTypeDto {
    Id: number;
    Title: string;
}