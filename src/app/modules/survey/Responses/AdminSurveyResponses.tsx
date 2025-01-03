import {useEffect, useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Card, Col, Form, InputGroup, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {SurveyResponseTable} from './SurveyTable';
import {DatePickerField, InputField, SelectField} from '@/_metronic/partials/controls';
import {KTIcon} from '@/_metronic/helpers';
import {PageTitle} from '@/_metronic/layout/core';
import {
  ListViewProvider,
  QueryRequestConsumer,
  QueryRequestProvider,
  QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { usegetSurveyTypes } from '../services';
import { usegetSurvayResponse } from './services';
import { GetSurveyRequestDto } from './@types';
import { optionsIsApproved } from '../../general/configs';
import { AdminSurveyProvider, useAdminSurvey } from './context';

export const AdminSurveyResponses = ({...props}: any) => {
  const {t} = useTranslation();

  return (
    <AdminSurveyProvider>
      <PageTitle breadcrumbs={[]}>{`${t('Survey')} / ${t('Survey.Surveys')}`}</PageTitle>
      <Body />
    </AdminSurveyProvider>
  );
};

const Body = () => {
  const {t} = useTranslation();
  const adminSurveyProvider = useAdminSurvey()!;
  const search = useMemo(() => adminSurveyProvider.querySurvey, [adminSurveyProvider]);
  const {data: SurveyTypes} = usegetSurveyTypes();
  const methods = useForm<GetSurveyRequestDto>({
    defaultValues: {
      PageIndex: 0,
      PageSize: 10,
     
    } as any,
  });

  const {handleSubmit} = methods;
  const onSubmit = handleSubmit((values) => search && search(values));

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <>
      <QueryRequestProvider
        reCallState={onSubmit}
        preState={{
          PageSize: 10,
          PageIndex: 0,
          OrderBy: ['InsertDate desc'],
          TotalCount: 0,
          ...methods.getValues(),
        }}
        queryFn={usegetSurvayResponse}
        queryKey='getSurvayResponse'
      >
        <QueryResponseProvider queryFn={usegetSurvayResponse} queryKey='getSurvayResponse'>
          <ListViewProvider>
            <QueryRequestConsumer>
            {({updateState, state}: any) => (
              <FormProvider {...methods}>
                <Card className='mb-5'>
                  <Form className='form form-label-right' onSubmit={onSubmit}>
                    <Card.Body className='p-5'>
                      <Row className='w-100 my-3 mx-0 me-auto'>
                        <Col lg={3} className='mb-2'>
                        <SelectField
                            name='SurveyTypeId'
                            options={SurveyTypes?.Data?.map((it) => ({label: it.Name, value: it.Id}))}
                            label={t('Survey.SurveyTypeId')}
                            />
                        </Col>
                        
                        <Col lg={3}>
                          <DatePickerField
                            name='FromModifiedDateTime'
                            label={t('Survey.FromCreateDate')}
                          />
                        </Col>
                        <Col lg={3}>
                          <DatePickerField name='ToModifiedDateTime' label={t('Survey.ToCreateDate')} />
                        </Col>
                        
                        <Col lg={3}>
                          <SelectField
                            name='IsApproved'
                            options={optionsIsApproved}
                            label={t('Survey.IsApproved')}
                          />
                        </Col>
                        <Col lg={'auto'} className='pe-0 pt-5 mt-2'>
                          <InputGroup size='sm'>
                            <Button type='button' variant='primary' onClick={()=> !!updateState && updateState({...state, ...methods.getValues(), PageIndex: 0})}>
                              <KTIcon iconName='magnifier' iconType='solid' className='fs-2' />{' '}
                              {t('Actions.Search')}
                            </Button>
                          </InputGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Form>
                </Card>
                <SurveyResponseTable />
              </FormProvider>
            )}
            </QueryRequestConsumer>
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </>
  );
};
