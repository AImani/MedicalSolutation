import { Row, Col, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
    DatePickerField,
    InputField,
    SelectField
} from '@/_metronic/partials/controls';
import {
    useEducationlevels,
    useMaritalStatuses,
    useDoctorStatuses,
    useMedicalSpecialties
} from '../../basic-infos/services';
import { ProfileImage } from '../../general/components/ProfileImage';

const Doctor: React.FC = () => {
    const { t } = useTranslation();
    const { data: doctorStatuses } = useDoctorStatuses({} as any);
    const { data: medicalSpecialties } = useMedicalSpecialties({} as any);

    return (
        <Row>
            <Col xs="auto">
                <ProfileImage fieldName='Image' label={t('Text.ImageOf', { 0: t('Doctor.Singular') })} />
            </Col>
            <Col>
                <Row>
                    <Col lg={4} md={6} className='mb-2'>
                        <InputField name="FirstName" label={t('Fields.FirstName')} />
                    </Col>
                    <Col lg={4} md={6} className='mb-2'>
                        <InputField name="LastName" label={t('Fields.LastName')} />
                    </Col>
                    <Col lg={4} md={6} className='mb-2'>
                        <DatePickerField name="DateOfBirth" label={t('Fields.BirthDate')} />
                    </Col>
                    <Col lg={4} md={6} className='mb-1'>
                        <InputField name="PhoneNumber" label={t('Fields.PhoneNo')} />
                    </Col>
                    <Col lg={4} md={6} className='mb-1'>
                        <InputField name="Email" label={t('Fields.Email')} />
                    </Col>
                    <Col lg={4} md={6} className='mb-1'>
                        <InputField name="MedicalLicenseNumber" label={t('Fields.MedicalLicenseNumber')} />
                    </Col>
                    <Col lg={4} md={6} className='mb-1'>
                        <SelectField
                            name="MedicalSpecialtyId"
                            label={t('Fields.MedicalSpecialtyName')}
                            options={medicalSpecialties?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
                    </Col>
                    <Col lg={4} md={6} className='mb-1'>
                        <SelectField
                            name="DoctorStatusId"
                            label={t('Fields.DoctorStatusName')}
                            options={doctorStatuses?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Doctor;