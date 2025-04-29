import { SelectField, Button, InputField } from '@/_metronic/partials/controls';
import { Row, Col, Card, ListGroup, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreateGroupDto } from '../@types';
import { useState, useEffect, useRef } from 'react';



const User: React.FC = ({ patients }) => {
  console.log('patients', patients);

  const { t } = useTranslation();
  const form = useFormContext<CreateGroupDto>();


  return (
    <Row>
      <Col lg={6} md={12} className='mb-10'>
        <Card>
          <Card.Header className='p-3 d-flex justify-content-between align-items-center'>
            <h4 className='card-title m-0'>{t('Patients.Plural')}</h4>
            {/* implement here */}
          </Card.Header>
          <Card.Body className='p-0'>
            <SelectField name="Patients.PatientId" options={patients?.map(x => ({
              label: <div>
                <p>{x.FirstName} {x.LastName}</p>
                <p>{x.cellPhoneNo}</p>
              </div>,
              value: x.Id
            }))}
              isMulti />

            {/* implement here */}
          </Card.Body>
        </Card>
      </Col>

      <Col lg={6} md={12}>
        <Card>
          <Card.Header className='p-3 d-flex justify-content-between align-items-center'>
            <h4 className='card-title m-0'>{t('Patients.Selected')}</h4>
            {/* implement here */}
          </Card.Header>
          <Card.Body className='p-0'>
            {/* implement here */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default User;
