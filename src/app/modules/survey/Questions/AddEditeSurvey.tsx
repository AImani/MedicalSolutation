import {PageTitle} from '@/_metronic/layout/core';
import {DatePickerField, InputField, SelectField, TextAreaField} from '@/_metronic/partials/controls';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {mutsetSurvay, mutupdateSurvey, usegetSurveyTypes} from '../services';
import {optionsIsResponseEditable} from '../../general/configs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminSurveyProvider, useAdminSurvey } from '../context';
import {  EntoEnIso } from '@/_metronic/helpers';
import { Questions } from './Questionslist';

export const AddEditeSurvey: React.FC<any> = () => {
 
  const {t} = useTranslation();

  return (
   
    <AdminSurveyProvider>
      <PageTitle>{`${t('Survey')} /  ${t('Survey.Add')} `}</PageTitle>
      <SurveyBody />
    </AdminSurveyProvider>
    
  );
};
// this component is responsible for add and editing survey
export const SurveyBody: React.FC<any> = () => {
  const {t} = useTranslation();
  let {id} = useParams();
  const provider = useAdminSurvey();
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const { selectItem, item} = useMemo(
    () => ({
      selectItem: provider?.selectItem,
      item: provider?.item,
     
    }),
    [provider]
  );

  useEffect(() => {
    if (id){
      selectItem && selectItem(+id);
    }
  }, []);

  const {data: SurveyTypes} = usegetSurveyTypes();
  const {mutate:setsurvey , isPending: isAdding, isSuccess: isAdded,error: addError }=mutsetSurvay();
 
  const { data: surveyData, isLoading, isError } = useQuery({
    queryKey: ['SetSurvey'],
    queryFn: () => queryClient.getQueryData(['SetSurvey'])
  });
  const {mutate: updateSurvey,  isPending: isUpdating, isSuccess: isUpdated, error: updateError} = mutupdateSurvey();

  const validationSchema = yup.object({
    // IsResponseEditable: yup.boolean().required(t('Messages.Required', {0: t('Survey.IsResponseEditable')})),
    Title: yup.string().required(t('Messages.Required', {0: t('Survey.Title')})),
    SurveyTypeId: yup.string().required(t('Messages.Required', {0: t('Survey.SurveyTypeId')})),
    ActivationDateTime: yup.string().required(t('Messages.Required', {0: t('Survey.ActivationDateTime')})),
    ExpirationDateTime: yup.string().required(t('Messages.Required', {0: t('Survey.ExpirationDateTime')})),
    Description:yup.string().nullable(),
  });
 
  const SurveyForm = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {handleSubmit: handleSubmitSurvey , setValue} = SurveyForm;

  const onSubmitSurvey = handleSubmitSurvey((values: any) => {
    const request= {
      ...values,
      IsResponseEditable:false,
      id:id,
      ActivationDateTime: EntoEnIso(values.ActivationDateTime),
      ExpirationDateTime:EntoEnIso(values.ExpirationDateTime)
    }
    if (id) {
      updateSurvey(request)
    }
    else {
    setsurvey(request);
    queryClient.invalidateQueries({queryKey:['getAllSurvey']})
  }
});
  
  
  useEffect(() => {
    if(item){
    Object.entries(item ).map(([key, value]) => {
      //@ts-ignore
      setValue(key, value,{ shouldValidate: true }) 
      
     });
    }
  }, [item,setValue]); 

  useEffect(() => {
   isAdded && toast.success(t('Messages.Success'));
   //@ts-ignore
   isAdded && navigate(`/survey/edit/${surveyData?.Data}`)
   addError?.Errors && toast.error(addError?.Errors.join('\n'));
  }, [isAdded, addError]);

  useEffect(() => {
    isUpdated && toast.success(t('Messages.Success'));
    updateError?.Errors && toast.error(addError?.Errors.join('\n') as string);
  }, [isUpdated,updateError]);

  return (
    <>
      <FormProvider {...SurveyForm}>
        <Card className='mb-5'>
        <Form className='form form-label-right' onSubmit={onSubmitSurvey}>
        <Card.Body className='p-5'>
          <Row> 
            <Col lg={3}>
              <InputField name='Title' label={t('Survey.Title')} />
            </Col>
            <Col lg={3}>
            <SelectField
                name='SurveyTypeId'
                options={SurveyTypes?.Data?.map((it) => ({label: it.Name, value: it.Id}))}
                label={t('Survey.SurveyTypeId')}
              />
            </Col>
            <Col lg={3}>
              <DatePickerField
                name='ActivationDateTime'
                label={t('Survey.ActivationDateTime')}
              />
            </Col>
            <Col lg={3}>
            <DatePickerField name='ExpirationDateTime' label={t('Survey.ExpirationDateTime')} />
            </Col>
          </Row>
         
          <Row className='mt-5'>
          {/* <Col lg={3}>
              <SelectField
                name='IsResponseEditable'
                options={optionsIsResponseEditable}
                label={t('Survey.IsResponseEditable')}
              />
            </Col> */}
            <Col lg={3}>
              <TextAreaField name='Description' label={t('Survey.Description')} />
            </Col>
            <Col lg={'auto'} className='pe-0 pt-5 mt-2'>

          <Button variant='success' disabled={isAdding || isUpdating} type='submit' >
              { id ? t('Actions.Edit') : t('Actions.Save')}
          </Button>
            </Col>
          </Row>
          </Card.Body>
        </Form>
        </Card>
      </FormProvider>
      {id && <Questions title={item?.Title}/>}
    </>
  );
};
