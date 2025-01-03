import {PageTitle} from '@/_metronic/layout/core';
import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';
import {
  ListViewProvider,
  QueryRequestConsumer,
  QueryRequestProvider,
  QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import {Button, Card, Col, Form, InputGroup, Modal, Row} from 'react-bootstrap';
import {DatePickerField, SelectField} from '@/_metronic/partials/controls';
import {optionsIsActive, optionsServiceSatisfaction} from '../../general/configs';
import {KTIcon} from '@/_metronic/helpers';
import {QuestionOptionTable} from './QuestionOptionTable';
import {usegetAllQuestionOption} from './service';
import {GetQuestionOptionRequestDto} from './@types';
import {AdminQuestioOptionProvider, useAdminQuestionOption} from './context';
import {useQueryClient} from '@tanstack/react-query';
import {AddQuestionOptions} from './AddQuestionOption';

export const QuestionOptions: React.FC<any> = () => {
  const {t} = useTranslation();
 
  return (
    <>
      <AdminQuestioOptionProvider>
        <div className='d-flex'>
        <PageTitle breadcrumbs={[]}>{`${t('Survey')} / ${t(
          'Questions.QuestionsOptionlist'
        )}`} 
        </PageTitle>
        </div>
        <QuestionOptionBody />
      </AdminQuestioOptionProvider>
    </>
  );
};

export const QuestionOptionBody: React.FC<any> = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const adminQuestionProvider = useAdminQuestionOption();
  const {id,qsid} = useParams();
  const queryClient = useQueryClient();
  const search = useMemo(() => adminQuestionProvider?.querySurvey, [adminQuestionProvider]);
  const [show, setShow] = useState(false);
  const methods = useForm<GetQuestionOptionRequestDto>({
    defaultValues: {
      id: qsid,
      PageIndex: 0,
      PageSize: 10,
    } as any,
  });

  const {handleSubmit} = methods;
  const onSubmit = handleSubmit((values) => search && search(values));

  useEffect(() => {
    onSubmit();
    queryClient.invalidateQueries({queryKey: ['GetAllQuestionOptions']});
  }, []);

  return (
    <>
    
      <QueryRequestProvider
        reCallState={onSubmit}
        preState={{
          id: qsid,
          PageIndex: 0,
          PageSize: 10,
          OrderBy: ['InsertDate desc'],
          TotalCount: 0,
          ...methods.getValues(),
        }}
        queryFn={usegetAllQuestionOption}
        queryKey='GetAllQuestionOptions'
      >
        <QueryResponseProvider queryFn={usegetAllQuestionOption} queryKey='GetAllQuestionOptions'>
          <ListViewProvider>
            <QueryRequestConsumer>
              {({updateState, state}: any) => (
                <FormProvider {...methods}>
                  <Card className='mb-5'>
                    <Form className='form form-label-right' onSubmit={onSubmit}>
                      <Card.Body className='p-5'>
                        <Row className='w-100 my-3 mx-0 me-auto'>
                          <Col lg={3}>
                            <DatePickerField
                              name='FromInsertDateTime'
                              label={t('Survey.FromInsertDateTimeOption')}
                            />
                          </Col>
                          <Col lg={3}>
                            <DatePickerField
                              name='ToInsertDateTime'
                              label={t('Survey.ToInsertDateTimeOption')}
                            />
                          </Col>

                          <Col lg={3}>
                            <SelectField
                              name='SatisfactionRate'
                              options={optionsServiceSatisfaction}
                              label={t('Survey.SatisfactionRateNumber')}
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
                            <InputGroup size='sm'>
                              <Button
                                type='button'
                                variant='primary'
                                className='me-2 rounded'
                                onClick={() =>
                                  !!updateState &&
                                  updateState({...state, ...methods.getValues(), PageIndex: 0})
                                }
                              >
                                <KTIcon iconName='magnifier' iconType='solid' className='fs-2' />
                                {t('Actions.Search')}
                              </Button>
                              <Button
                                className='me-2 rounded'
                                type='button'
                                variant='success'
                                // onClick={()=>navigate(`add-option`)}
                                onClick={() => setShow(true)}
                              >
                                <KTIcon iconName='plus' iconType='solid' className='fs-2' />
                                {t('Question.AddOptionsToqs')}
                              </Button>
                              <Button className='me-2 rounded' onClick={() => navigate(`/survey/edit/${id}/`)}>{t('Question.BackToQs')}</Button>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Form>
                  </Card>
                  <QuestionOptionTable />
                </FormProvider>
              )}
            </QueryRequestConsumer>
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
      <Modal size='xl' show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddQuestionOptions />
        </Modal.Body>
      </Modal>
    </>
  );
};
