import { PageTitle } from "@/_metronic/layout/core";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AdminQuestionProvider, useAdminQuestion } from "./context";
import { FormProvider, useForm } from "react-hook-form";
import { GetQuestionRequestDto } from "./@types";
import {
  ListViewProvider,
  QueryRequestConsumer,
  QueryRequestProvider,
  QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { useGetAllQuestions, usegetAllSurvay } from "./service";
import {Button, Card, Col, Form, InputGroup, Row} from 'react-bootstrap';
import { DatePickerField, SelectField } from "@/_metronic/partials/controls";
import { SurveyQuestionResponseType, optionsIsActive, optionsIsSatisfactionRate } from "../../general/configs";
import { KTIcon } from "@/_metronic/helpers";
import { QuestionTable } from "./QuestionTable";

export const Questions: React.FC<any> = ({...props}) => {
    const { t } = useTranslation();
  
    return (
      <>
        <AdminQuestionProvider>
          <PageTitle breadcrumbs={[]}>{`${t('Survey')} ${props.title !== undefined ? `/${props.title}` : ""} /${t('Questions.Questionslist')}`}</PageTitle>
          <QuestionBody {...props}/>
        </AdminQuestionProvider>
      </>
    );
  };

  export const QuestionBody: React.FC<any> = ({...props}) => {
    const {t} = useTranslation();
    const adminQuestionProvider = useAdminQuestion();
    const {id} = useParams();
    const navigate = useNavigate();
    const search = useMemo(() => adminQuestionProvider?.querySurvey, [adminQuestionProvider]);
    const methods = useForm<GetQuestionRequestDto>({
      defaultValues: {
         id:id,
        PageIndex: 0,
        PageSize: 10
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
          id:id,
          PageIndex: 0,
          PageSize: 10,
          OrderBy: ['InsertDate desc'],
          TotalCount: 0,
          ...methods.getValues(),
        }}
        queryFn={usegetAllSurvay}
        queryKey='GetAllQuestions'
      >
        <QueryResponseProvider queryFn={usegetAllSurvay} queryKey='GetAllQuestions'>
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
                              label={t('Question.FromInsertDateTimeQuestion')}
                            />
                          </Col>
                          <Col lg={3}>
                            <DatePickerField name='ToInsertDateTime' label={t('Question.ToInsertDateTimeQuestion')} />
                          </Col>
                          <Col lg={3}>
                          <SelectField
                              name='SurveyQuestionResponseType'
                              options={SurveyQuestionResponseType}
                              label={t('Survey.SurveyQuestionResponseType')}
                            />
                          </Col>
                          <Col lg={3}>
                          <SelectField
                              name='IsSatisfactionRate'
                              options={optionsIsSatisfactionRate}
                              label={t('Survey.IsSatisfactionRate')}
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
                                  onClick={()=>navigate(`add-question`,{state:{name:props?.title}})}
                                >
                                  <KTIcon iconName='plus' iconType='solid' className='fs-2' />
                                  {t('Actions.AddQuestion')}
                                </Button>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Form>
                  </Card>
                  <QuestionTable />
                </FormProvider>
              )}
              </QueryRequestConsumer>
            </ListViewProvider>
          </QueryResponseProvider>
        </QueryRequestProvider>
      </>
    );
  };
  