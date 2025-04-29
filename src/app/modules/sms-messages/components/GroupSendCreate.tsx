import { Button, Card, Form, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateMessageDto } from '../@types';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { createMessageSchema } from '../services/SchemaValidation';
import { PageTitle, useLayout } from '@/_metronic/layout/core';
import { mutCreateMessage } from '../services/MessageService';
import { Row, Col } from 'react-bootstrap';
import { DatePickerField } from '@/_metronic/partials/controls';
import { TextAreaField } from '@/_metronic/partials/controls';

export interface MultiSelectSearchOption {
  value: string | number;
  label: string;
}

export const GroupSendCreate = () => {
  const { t } = useTranslation();
  const { setActions } = useLayout();
  const [activeTab, setActiveTab] = useState('Users');
  const { mutateAsync: createAsync } = mutCreateMessage();

  const form = useForm<CreateMessageDto>({
    defaultValues: {
      SendDate: new Date(),
    },
    resolver: yupResolver<any>(createMessageSchema),
  });
  const { errors } = form.formState;
  console.log('errors > ', errors);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!!values.Address?.CityId == false) {
      values.Address = undefined;
    }
    console.log('onSubmit > ', values);
    await createAsync(values);
  });

  setActions([
    <Link className='btn btn-sm btn-secondary' to='/sms-panel/messages'>
      <i className='fas fa-arrow-right'></i> {t('Actions.Cancel')}
    </Link>,
    <Button variant='success' size='sm' onClick={onSubmit}>
      <i className='fas fa-check'></i> {t('Actions.Save')}
    </Button>,
  ]);

  const searchUsers = async (searchTerm: string): Promise<MultiSelectSearchOption[]> => {
    const allOptions = [
      { value: '1', label: 'گروه 1' },
      { value: '2', label: 'گروه 2' },
      { value: '3', label: 'گروه 3' },
      { value: '4', label: 'گروه 4' },
      { value: '5', label: 'گروه 5' },
      { value: '6', label: 'گروه 6' },
      { value: '7', label: 'گروه 7' },
      { value: '8', label: 'گروه 8' },
      { value: '9', label: 'گروه 9' },
      { value: '10', label: 'گروه 10' },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        if (!searchTerm) {
          resolve([]);
          return;
        }

        const filteredOptions = allOptions.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

        resolve(filteredOptions);
      }, 500);
    });
  };

  return (
    <FormProvider {...form}>
      <PageTitle>{t('Actions.GroupSend')}</PageTitle>
      <Form onSubmit={onSubmit}>
        <Card>
          <Card.Body className='p-5 pb-0 mb-2'>
            <Row>
              <Col>
                <Row>
                  <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>

                  </Col>
                </Row>
                <Row>
                  <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>
                    <TextAreaField name='message' label={t('Fields.Message')} rows={5} />
                  </Col>
                </Row>
                <Row>
                  <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>
                    <DatePickerField name='SendDate' label={t('SMSPanel.Send.Date')} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </FormProvider>
  );
};
