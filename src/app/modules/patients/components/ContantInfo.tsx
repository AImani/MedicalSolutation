import { Button, DatePickerField, InputField, SelectField } from '@/_metronic/partials/controls';
import { useState } from 'react';
import { Tabs, Tab, Card, Nav, Row, Col, ListGroup } from 'react-bootstrap';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreatePatientDto } from '../@types';
import { Phones } from './Phones';

const ContantInfo: React.FC = () => {
  const { t } = useTranslation();
  const form = useFormContext<CreatePatientDto>();

  return (
    <>
      <Row>
        <Col lg={4} md={6} className='mb-2'>
          <InputField name="ContactInfo.Email" label={t('Patient.Email')} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <h3>{t('ContantInfo.Phones')}</h3>
        <Phones />
      </Row>
    </>
  );
};

export default ContantInfo;