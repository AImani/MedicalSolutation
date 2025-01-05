import { useEffect, useState } from 'react';
import { Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField, SelectField, TextAreaField } from '@/_metronic/partials/controls';
import { useBankAccounts } from '../services/BasicInfoService';
import { BankAccountTypeDto } from '../@types/BasicInfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToWords } from 'to-words';
import { components } from 'react-select';
import { mutFinancialTransfer } from '../services/TransferService';
import toast from 'react-hot-toast';
import { TransferWithIbanCommand } from '../@types';
import '@/_metronic/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/_metronic/layout/core';
import { KTIcon } from '@/_metronic/helpers';

export const TransferMoney = () => {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useState(false);
  const { data: bankAccounts } = useBankAccounts();
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
      .required(t('Messages.Required', { 0: t('Financial.TransferMoney.FromBankAccount') })),
    ToBankAccountId: yup
      .number()
      .required(t('Messages.Required', { 0: t('Financial.TransferMoney.ToBankAccount') })),
    Amount: yup.string().required(t('Messages.Required', { 0: t('Financial.TransferMoney.Amount') }))
      .test(`check-number`, t('Messages.Format', { 0: t('Financial.TransferMoney.Amount') }), function (value) {
        const { path, createError } = this;

        return (
          (value ? towards.isValidNumber(value.replaceAll(',', '')) : true) ||
          createError({ path, message: t('Messages.Format', { 0: t('Financial.TransferMoney.Amount') }) })
        );
      }),
    Description: yup
      .string()
      .required(t('Messages.Required', { 0: t('Financial.TransferMoney.Description') }))
      .max(500, t('Messages.MaxLength', { 0: t('Financial.TransferMoney.Description'), 1: 500 })),
  });
  const methods = useForm<TransferWithIbanCommand>({
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const { mutate, isSuccess, isPending, isError, error } = mutFinancialTransfer();
  const onSubmit = methods.handleSubmit((values: TransferWithIbanCommand) => mutate({ ...values, Amount: values.Amount.replaceAll(',', '') }));

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
      towards.isValidNumber(methods.getValues('Amount').replaceAll(',', '')) ?
        towards.convert(
          +methods
            .getValues('Amount')
            .replaceAll(',', '')
            .substring(0, methods.getValues('Amount').replaceAll(',', '').length - 1)
        )
        : ''
    );
  }, [methods.watch('Amount')]);

  const validation = () =>
    methods
      .trigger(['FromBankAccountId', 'ToBankAccountId', 'Amount', 'Description'])
      .then((res) => {
        if (res) setConfirm(true);
      });

  const CustomOption = ({ children, ...props }: any) => (
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
      <PageTitle breadcrumbs={[]}>{t('Financial.TransferMoney')}</PageTitle>
      <FormProvider {...methods}>
        <Form className='form form-label-right' onSubmit={onSubmit}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}>
                  <label>{t('Financial.TransferMoney.FromBankAccount')}</label>
                  <SelectField
                    name='FromBankAccountId'
                    components={{ Option: CustomOption }}
                    options={(bankAccounts?.Data || [])
                      .filter((x) => x.Type === BankAccountTypeDto.Behin)
                      .map((x) => ({ label: x.Title, value: x.Id, extra: x }))}
                  />
                </Col>
                <Col xs={4}>
                  <label>{t('Financial.TransferMoney.ToBankAccount')}</label>
                  <SelectField
                    name='ToBankAccountId'
                    components={{ Option: CustomOption }}
                    options={(bankAccounts?.Data || [])
                      .filter((x) => x.Type === BankAccountTypeDto.Partners)
                      .map((x) => ({ label: x.Title, value: x.Id, extra: x }))}
                  />
                </Col>
                <Col xs={4}>
                  <label>{t('Financial.TransferMoney.Amount')}</label>
                  <InputField name='Amount' formatnumber />
                  <div>{amountWords}</div>
                </Col>
              </Row>
              <Row className='mt-3'>
                <Col>
                  <label>{t('Financial.TransferMoney.Description')}</label>
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
                    {t('Financial.TransferMoney')}
                  </button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <Modal show={confirm} centered onHide={() => setConfirm(false)}>
            <Modal.Header closeButton>{t('Messages.AreYouSure')}</Modal.Header>
            <Modal.Body>
              {t('Financial.TransferMoney.Amount')} <b>{methods.getValues('Amount')} {t('Text.Rials')}</b> {t('Text.Equal')} <b>{amountWords}</b> <br />
              {t('Financial.TransferMoney.FromBankAccount')} <b> {getAccountValue(+methods.getValues('FromBankAccountId'))} </b> {t('Text.BelongsTo')}
              <b> {getAccountShow(+methods.getValues('FromBankAccountId'))}</b>&nbsp;
              <br />
              {t('Financial.TransferMoney.ToBankAccount')} <b> {getAccountValue(+methods.getValues('ToBankAccountId'))} </b> {t('Text.BelongsTo')}
              <b> {getAccountShow(+methods.getValues('ToBankAccountId'))}</b>&nbsp;
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
                  t('Financial.TransferMoney')
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
