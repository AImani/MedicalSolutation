import {PageTitle} from '@/_metronic/layout/core';
import {useTranslation} from 'react-i18next';
import {AdminQuestionProvider, useAdminQuestion} from '../Questions/context';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useMemo} from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { InputField, SelectField } from '@/_metronic/partials/controls';
import { SurveyQuestionResponseTypes, optionsIsSatisfactionRates } from '../../general/configs';
import { QuestionOptions } from './QuestionOptions';
import { useQueryClient } from '@tanstack/react-query';

export const QuestionOptionlist: React.FC<any> = () => {
  const {t} = useTranslation();

  return (
    <>
      <AdminQuestionProvider>
        <PageTitle breadcrumbs={[]}>{`${t('Questions')} / ${ t('Questions.QuestionsOptionlist')}`}</PageTitle>
        <QuestionOptionslist />
      </AdminQuestionProvider>
    </>
  );
};
const QuestionOptionslist: React.FC<any> = () => {
  const {t} = useTranslation();
  const adminQuestionProvider = useAdminQuestion();
  const navigate = useNavigate();
  let {id, qsid} = useParams();
  const queryClient = useQueryClient();
  const {selectQs, Question} = useMemo(
    () => ({
      selectQs: adminQuestionProvider?.selectQs,
      Question: adminQuestionProvider?.Question,
    }),
    [adminQuestionProvider]
  );
  useEffect(() => {
    selectQs && selectQs({id, qsid} as any);
    queryClient.invalidateQueries({queryKey:['GetAllQuestionOptions']})

  }, []);
  const QuestionForm = useForm();

  const { setValue} = QuestionForm;
    useEffect(() => {
    if(Question){
    Object.entries(Question ).map(([key, value]) => {
      
      setValue(key, value,{ shouldValidate: true }) 
      
     });
    }
  }, [Question,setValue]); 

  return (
    <>
    <FormProvider {...QuestionForm}>
    <Card className='mb-5'>
    <Form className='form form-label-right' >
    <Card.Body className='p-5'>
      <Row> 
        <Col lg={3}>
          <InputField name='Text' label={t('Question.Text')}  disabled/>
        </Col>
        <Col lg={3}>
          <SelectField
              name='SurveyQuestionResponseType'
              options={SurveyQuestionResponseTypes}
              label={t('Survey.SurveyQuestionResponseType')}
              isDisabled={true}
            />
        </Col>
        <Col lg={3}>
          <SelectField
            name='IsSatisfactionRate'
            options={optionsIsSatisfactionRates}
            label={t('Survey.IsSatisfactionRate')}
            isDisabled={true}
          />
        </Col>
        <Col lg={3}>
          <InputField name='Order' label={t('Question.Order')} disabled/>
        </Col>
        
      </Row>
     
      </Card.Body>
    </Form>
    </Card>
    </FormProvider>
    {Question?.SurveyQuestionResponseType !==3 && <QuestionOptions/>}
    {Question?.SurveyQuestionResponseType ==3 && <Button className='me-2 rounded' onClick={() => navigate(`/survey/edit/${id}/`)}>{t('Question.BackToQs')}</Button>}
  </>
  );
};
