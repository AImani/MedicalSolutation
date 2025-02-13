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
    usePatientStatuses
} from '../../basic-infos/services';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { url } from 'inspector';
import { ProfileImage } from '../../general/components/ProfileImage';

const Patient: React.FC = () => {
    const { t } = useTranslation();
    const { data: patientStatuses } = usePatientStatuses({} as any);
    const { data: educationleveles } = useEducationlevels({} as any);
    const { data: maritalStatuses } = useMaritalStatuses({} as any);

    return (
        <Row>
            <Col md={4} xl="auto">
                <div className='row'>
                    <Col xs="auto">
                        <ProfileImage fieldName='Image' label={t('Text.ImageOf', { 0: t('Patient.Singular') })} />
                    </Col>
                    <Col className='d-md-none'>
                        <Row>
                            <Col xs={12} className='mb-2'>
                                <InputField name="FirstName" label={t('Fields.FirstName')} />
                            </Col>
                            <Col xs={12} className='mb-2'>
                                <InputField name="LastName" label={t('Fields.LastName')} />
                            </Col>
                        </Row>
                    </Col>
                </div>
            </Col>
            <Col>
                <Row>
                    <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>
                        <InputField name="FirstName" label={t('Fields.FirstName')} />
                    </Col>
                    <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>
                        <InputField name="LastName" label={t('Fields.LastName')} />
                    </Col>
                    <Col xl={4} lg={6} md={6} className='mb-2'>
                        <DatePickerField name="BirthDate" label={t('Fields.BirthDate')} />
                    </Col>
                    <Col xl={4} lg={6} md={6} className='mb-1'>
                        <InputField name="Occupation" label={t('Fields.Occupation')} />
                    </Col>
                    <Col xl={4} lg={6} md={6} className='mb-1'>
                        <InputField name="IntroductionChannel" label={t('Fields.IntroductionChannel')} />
                    </Col>
                    <Col xl={4} lg={6} md={6} className='mb-1'>
                        <SelectField
                            name="EducationlevelId"
                            label={t('Fields.EducationLevelName')}
                            options={educationleveles?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
                    </Col>
                    <Col xl={4} lg={6} md={6} className='mb-1'>
                        <SelectField
                            name="MaritalStatusId"
                            label={t('Fields.MaritalStatusName')}
                            options={maritalStatuses?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
                    </Col>
                    <Col xl={4} lg={6} md={6} className='mb-1'>
                        <SelectField
                            name="PatientStatusId"
                            label={t('Fields.StatusNameOf', { 0: t('Patient.Singular') })}
                            options={patientStatuses?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Patient;