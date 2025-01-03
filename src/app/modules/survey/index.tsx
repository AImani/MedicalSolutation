import {useEffect, useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Card, Col, Form, InputGroup, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AdminSurveyProvider, useAdminSurvey} from './context';
import {SurveyTable} from './SurveyTable';
import {DatePickerField, InputField, SelectField} from '@/_metronic/partials/controls';
import {GetSurveyRequestDto} from './@types';
import {optionsIsActive} from '../general/configs';
import {KTIcon} from '@/_metronic/helpers';
import {PageTitle} from '@/_metronic/layout/core';
import {
  ListViewProvider,
  QueryRequestConsumer,
  QueryRequestProvider,
  QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import {usegetAllSurvay, usegetSurveyTypes} from './services';
import { useNavigate } from 'react-router-dom';

export const AdminSurvey = ({...props}: any) => {
  const {t} = useTranslation();

  return (
    <AdminSurveyProvider>
      <PageTitle breadcrumbs={[]}>{`${t('Survey')}`}</PageTitle>
      <Body />
    </AdminSurveyProvider>
  );
};

const Body = () => {
  const {t} = useTranslation();
  const adminSurveyProvider = useAdminSurvey();
  const navigate = useNavigate();
  const search = useMemo(() => adminSurveyProvider?.querySurvey, [adminSurveyProvider]);
  const{data: SurveyTypes} = usegetSurveyTypes();
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
        queryFn={usegetAllSurvay}
        queryKey='getAllSurvey'
      >
        <QueryResponseProvider queryFn={usegetAllSurvay} queryKey='getAllSurvey'>
          <ListViewProvider>
            <QueryRequestConsumer>
            {({updateState, state}: any) => (
              <FormProvider {...methods}>
                <Card className='mb-5'>
                  <Form className='form form-label-right' onSubmit={onSubmit}>
                    <Card.Body className='p-5'>
                      <Row className='w-100 my-3 mx-0 me-auto'>
                        <Col lg={3} className='mb-2'>
                          <InputField name='Title' label={t('Survey.Title')} />
                        </Col>
                        
                        <Col lg={3}>
                          <DatePickerField
                            name='FromActivationDateTime'
                            label={t('Survey.FromActivationDateTime')}
                          />
                        </Col>
                        <Col lg={3}>
                          <DatePickerField name='ToActivationDateTime' label={t('Survey.ToActivationDateTime')} />
                        </Col>
                        <Col lg={3}>
                          <DatePickerField
                            name='FromExpirationDateTime'
                            label={t('Survey.FromExpirationDateTime')}
                          />
                        </Col>
                        <Col lg={3}>
                          <DatePickerField name='ToExpirationDateTime' label={t('Survey.ToExpirationDateTime')} />
                        </Col>
                        <Col lg={3}>
                          <SelectField
                            name='SurveyTypeId'
                            options={SurveyTypes?.Data?.map((it) => ({label: it.Name, value: it.Id}))}
                            label={t('Survey.SurveyTypeId')}
                          />
                        </Col>
                        <Col lg={3}>
                          <SelectField
                            name='IsActive'
                            options={optionsIsActive}
                            label={t('Survey.IsActive')}
                          />
                        </Col>
                        <Col lg={'auto'} className='pe-0 pt-5 mt-2'>
                          <InputGroup size='sm' >
                            <Button type='button' variant='primary' className='me-2 rounded' onClick={()=> !!updateState && updateState({...state, ...methods.getValues(), PageIndex: 0})}>
                              <KTIcon iconName='magnifier' iconType='solid' className='fs-2' />
                              {t('Actions.Search')}
                            </Button>
                            <Button
                                className='me-2 rounded'
                                type='button'
                                variant='success'
                                onClick={()=>navigate('/survey/add')}
                              >
                                <KTIcon iconName='plus' iconType='solid' className='fs-2' />
                                {t('Actions.Add')}
                              </Button>
                          </InputGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Form>
                </Card>
                <SurveyTable />
              </FormProvider>
            )}
            </QueryRequestConsumer>
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </>
  );
};
