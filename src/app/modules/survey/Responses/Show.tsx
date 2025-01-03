import {useRef, useEffect, useMemo, useState} from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {useAdminSurvey} from './context';
import {KTIcon, KTSVG} from '@/_metronic/helpers';
import {useQueryClient} from '@tanstack/react-query';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {TextAreaField} from '@/_metronic/partials/controls';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';
import {
  AdminSurveyContext,
  SurveyQuestion,
  SurveyQuestionOption,
  SurveyQuestionResponse,
} from './@types';
import {mutAdminRespons} from './services';
import toast from 'react-hot-toast';
import {RatingWrapper} from '../../general/components/CustomeRating';

export const Show = (props: any) => {
  const {t} = useTranslation();
  const schema = yup.object({
    // OperatorResponse: yup.string().when('IsApproved', {
    //   is: (val: boolean) => val != true,
    //   then: (schema) => schema.required(t('Messages.Required', {0: t('Survey.OperatorResponse')})),
    //   otherwise: (schema) => schema.optional(),
    // }),
  });
  const [Textresponse, setResponse] = useState(props?.mode?.response);

  const handleResponseChange = (event:any) => {
    setResponse(event);
  };
  const input = useRef<HTMLInputElement>(null);
  const provider: AdminSurveyContext | null = useAdminSurvey();
  const queryClient = useQueryClient();
  const {item, response, Qsoption, selectQsOption, selectResponse, selectItem} = useMemo(() => {
    return {
      item: provider?.item,
      response: provider?.response,
      Qsoption: provider?.Qsoption,
      selectQsOption: provider?.selectQsOption,
      selectResponse: provider?.selectResponse,
      selectItem: provider?.selectItem,
    };
  }, [provider]);

  const {mutate, isPending, isSuccess, error, isError} = mutAdminRespons();
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      !!selectItem && selectItem(undefined);
      queryClient.invalidateQueries({queryKey: ['getSurvayResponse']});
      toast.success(t('Messages.Success'));
    }
  }, [isSuccess]);
  
  const form = useForm<any>({
    // defaultValues: item,
    resolver: yupResolver(schema),
  });
  const {handleSubmit, reset, setValue} = form;

  const onSubmit = handleSubmit((values: any) => {
    mutate({
      surveyResponseId: props?.mode?.Id,
      id: response.Id,
      ...values,
    });
  });

  useEffect(() => {
    isSuccess && toast.success(t('Messages.Success'));
    queryClient.invalidateQueries({queryKey: ['getSurvayResponse']});
    //@ts-ignore
    isError?.Errors && toast.error(isError?.Errors.join('\n'));
  }, [isError, isSuccess]);

  return (
    <FormProvider {...form}>
      <Form className='form form-label-right' onSubmit={onSubmit}>
        <Row>
          <Col xs={12}>
            <>
              {!!response &&
                response.SurveyQuestions.map((question: SurveyQuestion, index: number) => {
                  const questionResponse = response.SurveyResponses[0].SurveyQuestionResponses.find(
                    (qr: SurveyQuestionResponse) => qr.SurveyQuestionId === question.Id
                  );
                  const maxSatisfactionRate = question.SurveyQuestionOptions.reduce(
                    (max: number, option: SurveyQuestionOption) =>
                      Math.max(max, option.SatisfactionRate || 0),
                    0
                  );
                  return (
                    <div key={question.Id}>
                      <h3 className='d-flex justify-content-between'>
                        {question.Text}
                        {question.IsSatisfactionRate && (
                          <RatingWrapper className='ms-3'>
                            {[...Array(maxSatisfactionRate)].map((_, i) => (
                              <KTIcon
                                key={`filled-${i}`}
                                iconName='star'
                                iconType='solid'
                                className='fs-3 text-gold'
                              />
                            ))}
                            {[...Array(5 - maxSatisfactionRate)].map((_, i) => (
                              <KTIcon
                                key={`empty-${i}`}
                                iconName='star'
                                iconType='solid'
                                className='fs-3 text-gray'
                              />
                            ))}
                          </RatingWrapper>
                        )}
                      </h3>
                      {question.SurveyQuestionOptions.map((option: any) => (
                        <div key={option.Id}>
                          <input
                            className='p-2'
                            type='checkbox'
                            checked={questionResponse?.SurveyQuestionOptionIds?.includes(option.Id)}
                            readOnly
                          />
                          <label className='text-black p-1'>{option.Text}</label>
                        </div>
                      ))}
                      {questionResponse && questionResponse.Comment && (
                        <p className='text-black p-1'>{` ${questionResponse.Comment}`}</p>
                      )}
                    </div>
                  );
                })}
            </>
          </Col>
          {props.mode.response ? (
            <Col>
              <br></br>
              <hr />
              <h3>
                پاسخ مدیر:{' '}
                {props.mode.IsApproved ? (
                  <span className='badge rounded-pill bg-success'>تایید شده</span>
                ) : (
                  <span className='badge rounded-pill bg-warning'>تایید نشده</span>
                )}
              </h3>

              <TextAreaField
                title='پاسخ مدیر'
                name='OperatorResponse'
                className='form-control w-100 rounded-3 p-6 h-100px pt-10'
                value={Textresponse}
                onChange={handleResponseChange} 
              />
              <Col xs={12} className='mt-5'>

              <button
                type='button'
                className='btn btn-sm me-2 btn-success'
                disabled={isPending}
                onClick={() => {
                  setValue('IsApproved', true);
                  onSubmit();
                }}
              >
                <KTIcon iconName='check' className='fs-2 me-2' />
                تایید
              </button>
              <button
                type='button'
                className='btn btn-sm me-2 btn-danger'
                disabled={isPending}
                onClick={() => {
                  setValue('IsApproved', false);
                  onSubmit();
                }}
              >
                <KTIcon iconName='cross' iconType='solid' className='fs-2 me-2' />
                رد
              </button>
              </Col>
            </Col>
          ) : (
            <>
              <Col xs={12}>
                <div className='form-floating'>
                  <TextAreaField
                    title='پاسخ مدیر'
                    name='OperatorResponse'
                    className='form-control w-100 rounded-3 p-6 h-100px pt-10'
                    placeholder='پاسخ مدیر'
                  />
                  <label htmlFor='Comment' className='text-gray fs-5'>
                    <KTSVG path='/media/icons/edit.svg' svgClassName='h-20px w-20px' /> پاسخ مدیر...
                  </label>
                </div>
              </Col>
              <Col xs={12} className='mt-5'>
                <button
                  type='button'
                  className='btn btn-sm me-2 btn-success'
                  disabled={isPending}
                  onClick={() => {
                    setValue('IsApproved', true);
                    onSubmit();
                  }}
                >
                  <KTIcon iconName='check' className='fs-2 me-2' />
                  تایید
                </button>
                <button
                  type='button'
                  className='btn btn-sm me-2 btn-danger'
                  disabled={isPending}
                  onClick={() => {
                    setValue('IsApproved', false);
                    onSubmit();
                  }}
                >
                  <KTIcon iconName='cross' iconType='solid' className='fs-2 me-2' />
                  رد
                </button>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </FormProvider>
  );
};
