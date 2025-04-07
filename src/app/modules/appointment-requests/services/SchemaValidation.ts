import * as yup from 'yup';

export const createAppointmentRequestSchema = yup.object().shape({
    PatientName: yup.string().required('نام الزامی است').max(100, 'نام حداکثر ۱۰۰ کاراکتر'),
    LastName: yup.string().required('نام خانوادگی الزامی است').max(100, 'نام خانوادگی حداکثر ۱۰۰ کاراکتر'),
    BirthDate: yup.date().nullable().typeError('تاریخ تولد باید تاریخ باشد'),
    IntroductionChannel: yup.string().nullable().max(200, 'نحوه آشنایی حداکثر ۲۰۰ کاراکتر'),
    Occupation: yup.string().nullable().max(200, 'شغل حداکثر ۲۰۰ کاراکتر'),
    AppointmentRequestStatusId: yup.number().required('وضعیت بیمار الزامی است').typeError('وضعیت بیمار باید عدد باشد'),
    MaritalStatusId: yup.number().nullable().typeError('وضعیت تاهل باید عدد باشد'),
    EducationLevelId: yup.number().nullable().typeError('سطح تحصیلات باید عدد باشد'),
    InsuranceCompanyId: yup.number().nullable().typeError('شرکت بیمه باید عدد باشد'),
});