import {PageTitle} from '@/_metronic/layout/core';
import {InputField, SelectField, TextAreaField} from '@/_metronic/partials/controls';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import { SurveyQuestionResponseTypes, optionsIsSatisfactionRates} from '../../general/configs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import {  useQuery, useQueryClient } from '@tanstack/react-query';
import { mutAddQuestion, useGetAllQuestions } from '../Questions/service';
import {useLocation} from 'react-router-dom';
import { AdminQuestionProvider, useAdminQuestion } from './context';

export const AddQuestion: React.FC<any> = () => {
  const location = useLocation();
  const {t} = useTranslation();

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`${t('Questions.Questionslist')}  / ${t('Actions.AddQuestion')}`}</PageTitle>
      <AddQuestions />
    </>
  );
};
// this component is responsible for adding  questions
 const AddQuestions: React.FC<any> = () => {
  const {t} = useTranslation();
  const {id} = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { data: questions} = useGetAllQuestions({
    id: id,
    PageIndex: 0,
    PageSize: 100 
  } as any);

  const getLastOrderNumber = (questionsData:any) => {
    if (questionsData?.Data?.Result?.length === 0) {
      return 0; 
    }
  
    const lastOrderNumber = questionsData?.Data?.Result[questionsData.Data.Result.length - 1].Order;
    return lastOrderNumber;
  };
  
  const lastOrder = getLastOrderNumber(questions);
  const {mutate:setQuestion , isPending: isAdding, isSuccess: isAdded,error: addError } = mutAddQuestion();

  const { data: QuestionData, isLoading } = useQuery({
    queryKey: ['AddQuestion'],
    queryFn: () => queryClient.getQueryData(['AddQuestion'])
  });

  const validationSchema = yup.object({
    Text: yup.string().required(t('Messages.Required', {0: t('Question.Text')})),
    IsSatisfactionRate: yup.boolean().required(t('Messages.Required', {0: t('Survey.IsSatisfactionRate')})),
    SurveyQuestionResponseType: yup.number().required(t('Messages.Required', {0: t('Survey.SurveyQuestionResponseType')})),
  });
 
  const QuestionForm = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {handleSubmit: handleSubmitQuestion } = QuestionForm;

  const onSubmitQuestion = handleSubmitQuestion((values: any) => {
   const request= {
    id:id,
    Order:lastOrder + 1,
    ...values,
   }
    setQuestion(request);

  });
  
  //@ts-ignore
  isAdded && navigate(`/survey/${id}/question-option-list/${QuestionData?.Data}`)
  useEffect(() => {
   isAdded && toast.success(t('Messages.Success'));
   queryClient.invalidateQueries({ queryKey:['AddQuestion']});
   addError?.Errors && toast.error(addError?.Errors.join('\n'));
  }, [isAdded, addError]);

  return (
    <>
      <FormProvider {...QuestionForm}>
        <Card className='mb-5'>
        <Form className='form form-label-right' onSubmit={onSubmitQuestion}>
        <Card.Body className='p-5'>
          <Row> 
            <Col lg={3}>
              <TextAreaField name='Text' label={t('Question.Text')} />
            </Col>
            <Col lg={3}>
              <SelectField
                  name='SurveyQuestionResponseType'
                  options={SurveyQuestionResponseTypes}
                  label={t('Survey.SurveyQuestionResponseType')}
                />
            </Col>
            <Col lg={3}>
              <SelectField
                name='IsSatisfactionRate'
                options={optionsIsSatisfactionRates}
                label={t('Survey.IsSatisfactionRate')}
              />
            </Col>
            {/* <Col lg={3}>
              <InputField name='Order' label={t('Question.Order')} />
            </Col> */}
            <Col lg={'auto'} className='pe-0 pt-5 mt-2'>
              <Button variant='success' disabled={isAdding || isLoading } type='submit' >
                  {t('Actions.Save')}
              </Button>
              </Col>
          </Row>
         
          </Card.Body>
        </Form>
        </Card>
      </FormProvider>
      
    </>
  );
};
