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

export const CreateMessageValidation = Yup.object().shape({
    Recipient: Yup.string().required('بیمار الزامیست'),
    Message: Yup.string().required('پیام الزامیست'),
    SentDate: Yup.date().nullable(),
});
