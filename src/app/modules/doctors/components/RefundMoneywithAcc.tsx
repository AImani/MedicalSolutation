import {useEffect, useState} from 'react';
import {Card, Col, Form, Modal, Row} from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {InputField, SelectField, TextAreaField} from '@/_metronic/partials/controls';
import {useBankAccounts} from '../services/BasicInfoService';
import {BankAccountTypeDto} from '../@types/BasicInfo';
import {yupResolver} from '@hookform/resolvers/yup';
import {ToWords} from 'to-words';
import {components} from 'react-select';
import toast from 'react-hot-toast';
import {RefundWithAccNumberCommand} from '../@types';
import {useTranslation} from 'react-i18next';
import {PageTitle} from '@/_metronic/layout/core';
import {KTIcon} from '@/_metronic/helpers';
import {GetAcountNumber, mutRefundWithAccNumber} from '../services/RefundAccService';

export const RefundMoneyWithAcc = () => {
  const {t} = useTranslation();
  const [confirm, setConfirm] = useState(false);
  const {data: bankAccounts} = useBankAccounts();
  const towards = new ToWords({
    localeCode: 'fa-IR',
    converterOptions: {
      currency: true,
      ignoreDecimal: true,
      ignoreZeroCurrency: true,
      doNotAddOnly: false,
    },
  });

  const validationSchema = yup.object({
    FromBankAccountId: yup
      .number()
      .required(t('Messages.Required', {0: t('Financial.RefundMoney.FromBankAccount')})),
     ToBankAccountNo: yup
      .string()
      .typeError(t('Financial.RefundMoney.NotANumber'))
      .required(t('Messages.Required', {0: t('Financial.RefundMoney.AccNumber')}))
      .test(
        'length',
        t('Financial.RefundMoney.AccNumberMinlenght'),
        (val) => val.toString().length > 11
      ),
    Amount: yup
      .string()
      .required(t('Messages.Required', {0: t('Financial.RefundMoney.Amount')}))
      .test(
        `check-number`,
        t('Messages.Format', {0: t('Financial.RefundMoney.Amount')}),
        function (value) {
          const {path, createError} = this;
          return (
            (value ? towards.isValidNumber(value.replaceAll(',', '')) : true) ||
            createError({
              path,
              message: t('Messages.Format', {0: t('Financial.RefundMoney.Amount')}),
            })
          );
        }
      ),
    Description: yup
      .string()
      .required(t('Messages.Required', {0: t('Financial.RefundMoney.Description')}))
      .max(500, t('Messages.MaxLength', {0: t('Financial.RefundMoney.Description'), 1: 500})),
  });
  const methods = useForm<RefundWithAccNumberCommand>({
    reValidateMode: 'onBlur',
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });
  const AccnoLength = methods.watch('ToBankAccountNo')?.toString().length>11
  const Accno = methods.watch('ToBankAccountNo');
  const {isLoading:Accloading ,data} = GetAcountNumber(Accno);

  const {mutate, isSuccess, isPending, isError, error} = mutRefundWithAccNumber();
  const onSubmit = methods.handleSubmit((values: RefundWithAccNumberCommand) => {
   mutate({ ...values, Amount: values.Amount.replaceAll(',', '') })
  });

  useEffect(() => {
    if (isError) toast.error(error?.Errors?.join('') || t('Messages.CartableRequestUnsuccessful', {0: t('Financial.Reuqest')}));
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      methods.reset({});
      setConfirm(false);
      toast.success(t('Messages.CartableRequestSuccessful', {0: t('Financial.Reuqest')}));
    }
  }, [isSuccess]);

  const [amountWords, setAmountWords] = useState('');
  useEffect(() => {
    setAmountWords(
      towards.isValidNumber(methods.getValues('Amount').replaceAll(',', ''))
        ? towards.convert(
            +methods
              .getValues('Amount')
              .replaceAll(',', '')
              .substring(0, methods.getValues('Amount').replaceAll(',', '').length - 1)
          )
        : ''
    );
  }, [methods.watch('Amount')]);

  const validation = () =>
    methods.trigger(['FromBankAccountId', 'ToBankAccountNo', 'Amount', 'Description']).then((res) => {
      if (res) setConfirm(true);
    });

  const CustomOption = ({children, ...props}: any) => (
    <components.Option {...props}>
      {props.isSelected ? (
        <p>{props.label}</p>
      ) : (
        <div>
          <h4>{props.data.extra.Title}</h4>
          <h6>{props.data.extra.AccountNo || props.data.extra.Iban}</h6>
        </div>
      )}
    </components.Option>
  );

  const getAccountValue = (accountId: number) =>
    bankAccounts?.Data?.find((x) => x.Id == accountId)?.Iban ||
    bankAccounts?.Data?.find((x) => x.Id == accountId)?.AccountNo;

  const getAccountShow = (accountId: number) =>
    bankAccounts?.Data?.find((x) => x.Id == accountId)?.Title;

  return (
    <>
      <PageTitle>{t('Financial.RefundMoney.WithAccNo')}</PageTitle>
      <FormProvider {...methods}>
        <Form className='form form-label-right' onSubmit={onSubmit}>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={4}>
                  <label>{t('Financial.RefundMoney.FromBankAccount')}</label>
                  <SelectField
                    name='FromBankAccountId'
                    components={{Option: CustomOption}}
                    options={(bankAccounts?.Data || [])
                      .filter((x) => x.Type === BankAccountTypeDto.Behin)
                      .map((x) => ({label: x.Title, value: x.Id, extra: x}))}
                  />
                </Col>
                <Col lg={4}>
                  <label>{t('Financial.RefundMoney.AccNumber')}</label>
                  <InputField name='ToBankAccountNo' />
                 {AccnoLength && (data && data?.Data ? (
                    <div>
                      {t('Financial.RefundMoney.AccHolder', {
                        0: data?.Data?.FirstName,
                        1: data?.Data?.LastName,
                      })}
                    </div>
                  ) : (
                    !Accloading &&<span>{t('Financial.RefundMoney.InvalidAcc')}</span>
                  ))}
                </Col>
                <Col lg={4}>
                  <label>{t('Financial.RefundMoney.Amount')}</label>
                  <InputField name='Amount' formatnumber />
                  <div>{amountWords}</div>
                </Col>
              </Row>
              <Row className='mt-3'>
                <Col>
                  <label>{t('Financial.RefundMoney.Description')}</label>
                  <TextAreaField name='Description' />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className='p-5'>
              <Row>
                <Col>
                  <button
                    className='btn btn-danger'
                    type='button'
                    onClick={async () => await validation()}
                  >
                    <KTIcon iconName='dollar' iconType='solid' className='fs-2 me-2' />
                    {t('Financial.RefundMoney.WithAccNo')}
                  </button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <Modal show={confirm} centered onHide={() => setConfirm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{t('Messages.AreYouSure')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {t('Financial.RefundMoney.Amount')}{' '}
              <b>
                {methods.getValues('Amount')} {t('Text.Rials')}
              </b>{' '}
              {t('Text.Equal')} <b>{amountWords}</b> <br />
              {t('Financial.RefundMoney.FromBankAccount')}{' '}
              <b> {getAccountValue(+methods.getValues('FromBankAccountId'))} </b>{' '}
              {t('Text.BelongsTo')}
              <b> {getAccountShow(+methods.getValues('FromBankAccountId'))}</b>&nbsp;
              <br />
              {t('Messages.AccordingToTheAccNumber')} <b> {methods.getValues('ToBankAccountNo')} </b>
              <br/>
              
              {t('Financial.RefundMoney.Modal')}
              <b> { data?.Data?.FirstName}  { data?.Data?.LastName}
              </b>
              <br />
              {t('Text.BeDeposited')}.
            </Modal.Body>
            <Modal.Footer>
              <button
                className='btn btn-danger'
                onClick={onSubmit}
                type='submit'
                disabled={isPending}
              >
                {!isPending ? (
                  t('Financial.RefundMoney')
                ) : (
                  <>
                    <span role='status'>{t('Actions.Submitting')}</span>
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      aria-hidden='true'
                    ></span>
                  </>
                )}
              </button>
            </Modal.Footer>
          </Modal>
        </Form>
      </FormProvider>
    </>
  );
};
