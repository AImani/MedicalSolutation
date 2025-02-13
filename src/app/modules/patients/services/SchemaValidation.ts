import * as yup from 'yup';
import { CreatePatientDto } from '../@types';
import { CreateContactInfoDto, CreatePhoneNumberDto } from '../@types/BasicInfoDto';
import { CreateAddressDto, CreateMedicalDocumentDto } from '../../basic-infos/@types';

const addressSchema = yup.object<CreateAddressDto>().shape({
    FullAddress: yup.string().required('آدرس الزامی است').max(500, 'آدرس حداکثر ۵۰۰ کاراکتر'),
    ProvinceId: yup.number().required('استان الزامی است').typeError('استان باید عدد باشد'),
    CityId: yup.number().required('شهر الزامی است').typeError('شهر باید عدد باشد'),
    PostalCode: yup.string().nullable().matches(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
    ApartmentNo: yup.string().nullable().max(4, 'شماره آپارتمان حداکثر 4 کاراکتر'),
    UnitNo: yup.string().nullable().max(3, 'شماره واحد حداکثر 3 کاراکتر'),
});

const phoneNumberSchema = yup.object<CreatePhoneNumberDto>().shape({
    PhoneNo: yup.string().required('شماره تلفن الزامی است').matches(/^(\+98|0)?9\d{9}$/, 'شماره تلفن معتبر نیست'),
    PhoneTypeId: yup.number().required('نوع شماره تلفن الزامی است').typeError('نوع شماره تلفن باید عدد باشد'),
});

const contactInfoSchema = yup.object<CreateContactInfoDto>().shape({
    Email: yup.string().nullable().email('ایمیل معتبر نیست').max(256, 'ایمیل حداکثر ۲۵۶ کاراکتر'),
    PhoneNumbers: yup.array().of(phoneNumberSchema).required('حداقل یک شماره تلفن الزامی است'),
});

export const createMedicalDocumentSchema = yup.object<CreateMedicalDocumentDto>().shape({
    Title: yup.string().required('عنوان مدرک الزامی است').max(200, 'عنوان حداکثر ۲۰۰ کاراکتر'),
    DocumentTypeId: yup.number().required('نوع مدرک الزامی است').typeError('نوع مدرک باید عدد باشد'),
    DocumentDate: yup.string().required('تاریخ مدرک الزامی است').matches(/^\d{4}-\d{2}-\d{2}$/, 'تاریخ مدرک باید به فرمت YYYY-MM-DD باشد'),
    File: yup.mixed().nullable(), // برای آپلود فایل.  اگر فایل الزامی است، .required() اضافه کنید.
    PatientId: yup.number().required('شناسه بیمار الزامی است').typeError('شناسه بیمار باید عدد باشد'),
});


export const createPatientSchema = yup.object().shape({
    FirstName: yup.string().required('نام الزامی است').max(100, 'نام حداکثر ۱۰۰ کاراکتر'),
    LastName: yup.string().required('نام خانوادگی الزامی است').max(100, 'نام خانوادگی حداکثر ۱۰۰ کاراکتر'),
    BirthDate: yup.date().nullable().typeError('تاریخ تولد باید تاریخ باشد'),
    IntroductionChannel: yup.string().nullable().max(200, 'نحوه آشنایی حداکثر ۲۰۰ کاراکتر'),
    Occupation: yup.string().nullable().max(200, 'شغل حداکثر ۲۰۰ کاراکتر'),
    PatientStatusId: yup.number().required('وضعیت بیمار الزامی است').typeError('وضعیت بیمار باید عدد باشد'),
    MaritalStatusId: yup.number().nullable().typeError('وضعیت تاهل باید عدد باشد'),
    EducationLevelId: yup.number().nullable().typeError('سطح تحصیلات باید عدد باشد'),
    InsuranceCompanyId: yup.number().nullable().typeError('شرکت بیمه باید عدد باشد'),

    ContactInfo: contactInfoSchema.required('اطلاعات تماس الزامی است'),
    // Address: addressSchema.required('آدرس الزامی است'),
    // MedicalDocuments: yup.array().of(createMedicalDocumentSchema).required('حداقل یک مدرک پزشکی الزامی است'),
});