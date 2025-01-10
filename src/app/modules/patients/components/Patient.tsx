import { Button, DatePickerField, InputField, SelectField } from '@/_metronic/partials/controls';
import { useState } from 'react';
import { Tabs, Tab, Card, Nav, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Patient: React.FC = () => {
    const { t } = useTranslation();

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
                <SelectField name="PatientStatusId" label={t('Patient.PatientStatusName')} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <SelectField name="EducationlevelId" label={t('Patient.EducationLevelName')} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <SelectField name="MaritalStatusId" label={t('Patient.MaritalStatusName')} />
            </Col>
        </Row>
    );
};

export default Patient;