import * as Yup from 'yup';
import { CreateAddressDto } from './AddressDto'; // Adjust the import path as necessary
import { ContactInfoDto } from './BasicInfoDto'; // Adjust the import path as necessary
import { CreateMedicalDocumentDto } from './MedicalDocumentDto'; // Adjust the import path as necessary

const CreateAddressValidation = Yup.object().shape({
    // Define validation rules for CreateAddressDto fields
});

const ContactInfoValidation = Yup.object().shape({
    // Define validation rules for ContactInfoDto fields
});

const CreateMedicalDocumentValidation = Yup.object().shape({
    // Define validation rules for CreateMedicalDocumentDto fields
});

export const CreatePatientValidation = Yup.object().shape({
    FirstName: Yup.string().required('First name is required'),
    LastName: Yup.string().required('Last name is required'),
    BirthDate: Yup.date().nullable(),
    IntroductionChannel: Yup.string().nullable(),
    Occupation: Yup.string().nullable(),
    PatientStatusId: Yup.number().nullable(),
    MaritalStatusId: Yup.number().nullable(),
    EducationLevelId: Yup.number().nullable(),
    InsuranceCompanyId: Yup.number().nullable(),
    Address: CreateAddressValidation,
    ContactInfo: ContactInfoValidation,
    MedicalDocuments: Yup.array().of(CreateMedicalDocumentValidation).nullable(),
});
