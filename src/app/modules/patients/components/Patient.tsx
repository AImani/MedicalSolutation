import { Button, DatePickerField, InputField, SelectField } from '@/_metronic/partials/controls';
import { useState } from 'react';
import { Tabs, Tab, Card, Nav, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { usePatientStatuses } from '../../basic-infos/services/PatientStatusService';
import { useEducationleveles, useMaritalStatuses } from '../../basic-infos/services';

const Patient: React.FC = () => {
    const { t } = useTranslation();
    const { data: patientStatuses } = usePatientStatuses({} as any);
    const { data: educationleveles } = useEducationleveles({} as any);
    const { data: maritalStatuses } = useMaritalStatuses({} as any);

    return (
        <Row>
            <Col lg={4} md={6} className='mb-2'>
                <InputField name="FirstName" label={t('Patient.FirstName')} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <InputField name="LastName" label={t('Patient.LastName')} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <DatePickerField name="BirthDate" label={t('Patient.BirthDate')} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <InputField name="Occupation" label={t('Patient.Occupation')} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <InputField name="IntroductionChannel" label={t('Patient.IntroductionChannel')} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <SelectField name="PatientStatusId" label={t('Patient.PatientStatusName')} options={patientStatuses?.Data.Result.map(x => ({label: x.Title, value: x.Id}))}/>
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <SelectField name="EducationlevelId" label={t('Patient.EducationLevelName')} options={educationleveles?.Data.Result.map(x => ({label: x.Title, value: x.Id}))}/>
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <SelectField name="MaritalStatusId" label={t('Patient.MaritalStatusName')} options={maritalStatuses?.Data.Result.map(x => ({label: x.Title, value: x.Id}))}/>
            </Col>
        </Row>
    );
};

export default Patient;