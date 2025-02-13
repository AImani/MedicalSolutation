export interface MedicalDocumentGridDto {
    Id: number;
    Title: string;
    DocumentType: string;
    DocumentDate: string;
    FileSize: number;
}

export interface MedicalDocumentDto {
    Id: number;
    Title: string;
    DocumentTypeId: number;
    DocumentDate: string;
    FilePath: string;
    FileSize: number;
    PatientId: number;
    DocumentType: string;
}

export interface CreateMedicalDocumentDto {
    Title: string;
    DocumentTypeId: number;
    DocumentDate: string;
    File: File | null;
    PatientId: number;
}

export interface UpdateMedicalDocumentDto {
    Id: number;
    Title: string;
    DocumentTypeId: number;
    DocumentDate: string;
    File: File | null;
    PatientId: number;
}


export interface DocumentTypeDto {
    Id: number;
    Title: string;
}