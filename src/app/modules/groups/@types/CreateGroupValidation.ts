import * as Yup from 'yup';
const CreateAddressValidation = Yup.object().shape({
    // Define validation rules for CreateAddressDto fields
});

const ContactInfoValidation = Yup.object().shape({
    // Define validation rules for ContactInfoDto fields
});

const CreateMedicalDocumentValidation = Yup.object().shape({
    // Define validation rules for CreateMedicalDocumentDto fields
});

export const CreateGroupValidation = Yup.object().shape({
    FirstName: Yup.string().required('First name is required'),
    LastName: Yup.string().required('Last name is required'),
    BirthDate: Yup.date().nullable(),
    IntroductionChannel: Yup.string().nullable(),
    Occupation: Yup.string().nullable(),
    GroupStatusId: Yup.number().nullable(),
    MaritalStatusId: Yup.number().nullable(),
    EducationLevelId: Yup.number().nullable(),
    InsuranceCompanyId: Yup.number().nullable(),
    Address: CreateAddressValidation,
    ContactInfo: ContactInfoValidation,
    MedicalDocuments: Yup.array().of(CreateMedicalDocumentValidation).nullable(),
});
