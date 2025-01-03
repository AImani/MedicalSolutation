import {PageTitle} from '@/_metronic/layout/core';
import {InputField, SelectField, TextAreaField} from '@/_metronic/partials/controls';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {  optionsSatisfactionRate} from '../../general/configs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { mutAddQuestionOption, usegetAllQuestionOption } from './service';
import { AdminQuestioOptionProvider, useAdminQuestionOption } from './context';

export const AddQuestionOptions: React.FC<any> = () => {
 
  const {t} = useTranslation();

  return (
    <>
    <AdminQuestioOptionProvider>
      <PageTitle breadcrumbs={[]}>{`${t('Survey')} / ${t('Questions.AddQuestionsOption')}`}</PageTitle>
      <AddQuestionOption />
      </AdminQuestioOptionProvider>
    </>
  );
};
 const AddQuestionOption: React.FC<any> = () => {
  const {t} = useTranslation();
  const {id, qsid} = useParams();
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const provider = useAdminQuestionOption();
  const { selectItem, item} = useMemo(
    () => ({
      selectItem: provider?.selectItem,
      item: provider?.item,
     
    }),
    [provider]
  );
  useEffect(() => {
    if (id && qsid){
      selectItem && selectItem({id,qsid});
    }
  }, []);
const { data: questionsOptions} = usegetAllQuestionOption({
  id: qsid,
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

const lastOrder = getLastOrderNumber(questionsOptions);
  const {mutate:setQuestionOption , isPending: isAdding, isSuccess: isAdded,error: addError } = mutAddQuestionOption();
  
  const validationSchema = yup.object({
    Text: yup.string().required(t('Messages.Required', {0: t('Question.TextOption')})),
    SatisfactionRate: yup.number().nullable(),
  });
 
  const QuestionForm = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {handleSubmit: handleSubmitQuestion } = QuestionForm;

  const onSubmitQuestion = handleSubmitQuestion((values: any) => {
   const request= {
    id:qsid,
    Order:lastOrder + 1,
    ...values,
   }
   setQuestionOption(request);
   queryClient.invalidateQueries({queryKey:['GetAllQuestionOptions']})
  //  navigate(-1)
  });
  

  useEffect(() => {
   isAdded && toast.success(t('Messages.Success'));
   isAdded && queryClient.invalidateQueries({queryKey:['GetAllQuestionOptions']})
   addError?.Errors && toast.error(addError?.Errors.join('\n'));
   QuestionForm.reset({
    Text: '',
    SatisfactionRate: null, 
  });
  }, [isAdded, addError]);
 

  return (
    <>
      <FormProvider {...QuestionForm}>
        <Card className='mb-5'>
        <Form className='form form-label-right' onSubmit={onSubmitQuestion}>
        <Card.Body className='p-5'>
          <Row> 
            <Col lg={3}>
              <TextAreaField name='Text' label={t('Question.TextOption')} />
            </Col>
            {item?.IsSatisfactionRate && <Col lg={3}>
              <SelectField
               key={`SatisfactionRate-${isAdded}`}
                name='SatisfactionRate'
                options={optionsSatisfactionRate}
                label={t('Survey.IsSatisfactionRate')}
              />
            </Col>}
            {/* <Col lg={3}>
              <InputField name='Order' label={t('Question.Order')} />
            </Col> */}
            <Col lg={'auto'} className='pe-0 pt-5 mt-2'>
              <Button variant='success' disabled={isAdding} type='submit' >
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
