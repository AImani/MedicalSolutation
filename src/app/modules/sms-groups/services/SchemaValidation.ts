import * as yup from 'yup';
import { CreateGroupDto } from '../@types';
import { CreateContactInfoDto, CreatePhoneNumberDto } from '../@types/BasicInfoDto';
import { CreateAddressDto, CreateMedicalDocumentDto } from '../../basic-infos/@types';

export const createGroupSchema = yup.object().shape({
    Title: yup.string().required('عنوان الزامی است').max(100, 'عنوان حداکثر ۱۰۰ کاراکتر است'),
});