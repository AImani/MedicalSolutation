import { useEffect, useState } from 'react';
import { Alert, Card, Col, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField, SelectField, TextAreaField } from '@/_metronic/partials/controls';
import { downloadRefNumberSampleExcelFile, useBankAccounts } from '../services/BasicInfoService';
import { BankAccountTypeDto } from '../@types/BasicInfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToWords } from 'to-words';
import { components } from 'react-select';
import { mutImportWithRefNumber, mutRefundWithRefNumber } from '../services/RefundService';
import toast from 'react-hot-toast';
import { RefundWithRefNumberCommand } from '../@types';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@/_metronic/layout/core';
import { KTIcon } from '@/_metronic/helpers';
import { useDropzone } from 'react-dropzone';
import { base64ToExcelDownload } from '../../general/helpers';
import usePermission from '../../auth/permissions/hook';
import { RoutePermission } from '../../auth/permissions/RoutePermission';
import { ComponentPermission } from '../../auth/permissions';

export const RefundMoney = () => {
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
      .required(t('Messages.Required', { 0: t('Financial.RefundMoney.FromBankAccount') })),
    RefNumber: yup
      .string()
      .required(t('Messages.Required', { 0: t('Financial.RefundMoney.RefNumber') })),
    Amount: yup.string().required(t('Messages.Required', { 0: t('Financial.RefundMoney.Amount') }))
      .test(`check-number`, t('Messages.Format', { 0: t('Financial.RefundMoney.Amount') }), function (value) {
        const { path, createError } = this;

        return (
          (value ? towards.isValidNumber(value.replaceAll(',', '')) : true) ||
          createError({ path, message: t('Messages.Format', { 0: t('Financial.RefundMoney.Amount') }) })
        );
      }),
    Description: yup
      .string()
      .required(t('Messages.Required', { 0: t('Financial.RefundMoney.Description') }))
      .max(500, t('Messages.MaxLength', { 0: t('Financial.RefundMoney.Description'), 1: 500 })),
  });
  const methods = useForm<RefundWithRefNumberCommand>({
    reValidateMode: 'onBlur',
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const { mutate, isSuccess, isPending, isError, error } = mutRefundWithRefNumber();
  const onSubmit = methods.handleSubmit((values: RefundWithRefNumberCommand) => mutate({ ...values, Amount: values.Amount.replaceAll(',', '') }));

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
    methods.trigger(['FromBankAccountId', 'RefNumber', 'Amount', 'Description']).then((res) => {
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

  const [files, setFiles] = useState<File[]>([]);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: { 'application/vnd.ms-excel': ['.xls', '.xlsx'] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) || []
        )
      );
    },
  });

  const { mutateAsync, data: importResult, isPending: isSending, isError: hasError, isSuccess: isDone } = mutImportWithRefNumber();
  const importFromExcel = async () => {
    if (files.length == 0)
      toast.error(t('Messages.NoFileSelected'));
    else
      await mutateAsync(files[0]);
  }

  useEffect(() => {
    if (isDone) {
      if (importResult.Data?.InvalidRowsCount! > 0) {
        base64ToExcelDownload(importResult.Data?.ExportedExcelBytes, 'InvalidRows');
        toast.error(
          t('Financial.InvalidRowRecordsAreAvailableInExcelFile', {
            0: importResult.Data?.InvalidRowsCount,
          }),
          {
            duration: 8000,
          }
        );
      }
      if (importResult.Data?.InsertedRowsCount! > 0)
        toast.success(t('Messages.SuccessfullImport', { 0: importResult.Data?.InsertedRowsCount, 1: t('Financial.Reuqest') }));
    }
  }, [isDone]);

  return (
    <>
      <PageTitle>{t('Financial.RefundMoney')}</PageTitle>
      <FormProvider {...methods}>
        <Tabs>
          <Tab eventKey='form' title='از طریق فرم'>
            <Form className='form form-label-right' onSubmit={onSubmit}>
              <Card>
                <ComponentPermission list={[{ ctrl: 'FinancialTransfers', action: 'WithRefNumber' }]}>
                  <Card.Body>
                    <Row>
                      <Col lg={4}>
                        <label>{t('Financial.RefundMoney.FromBankAccount')}</label>
                        <SelectField
                          name='FromBankAccountId'
                          components={{ Option: CustomOption }}
                          options={(bankAccounts?.Data || [])
                            .filter((x) => x.Type === BankAccountTypeDto.Behin)
                            .map((x) => ({ label: x.Title, value: x.Id, extra: x }))}
                        />
                      </Col>
                      <Col lg={4}>
                        <label>{t('Financial.RefundMoney.RefNumber')}</label>
                        <InputField name='RefNumber' />
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
                          {t('Financial.RefundMoney')}
                        </button>
                      </Col>
                    </Row>
                  </Card.Footer>
                  <Modal show={confirm} centered onHide={() => setConfirm(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {t('Messages.AreYouSure')}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {t('Financial.RefundMoney.Amount')} <b>{methods.getValues('Amount')} {t('Text.Rials')}</b> {t('Text.Equal')} <b>{amountWords}</b> <br />
                      {t('Financial.RefundMoney.FromBankAccount')} <b> {getAccountValue(+methods.getValues('FromBankAccountId'))} </b> {t('Text.BelongsTo')}
                      <b> {getAccountShow(+methods.getValues('FromBankAccountId'))}</b>&nbsp;
                      <br />
                      {t('Messages.AccordingToTheTrackingNumber')} <b> {methods.getValues('RefNumber')} </b>
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
                </ComponentPermission>
              </Card>
            </Form>
          </Tab>
          <Tab eventKey='excel' title='از طریق اکسل'>
            <Card>
              <ComponentPermission list={[{ ctrl: 'FinancialTransfers', action: 'ImportWithRefNumber' }]}>
                <Card.Body>
                  <Alert variant='info'>برای ثبت گروهی استرداد وجه لطفا فایل نمونه را دانلود کرده و طبق فایل اطلاعات را وارد نمایید</Alert>
                  <Row>
                    <Col lg={12}>
                      <section className="container-fluid">
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          {files.length ? (
                            <>
                              {files.map((x: File) =>
                                <Row>
                                  <Col className='p-7 rtl text-start'>
                                    <b>نام فایل: </b>{x.name} <br />
                                    <b>حجم فایل: </b>{Math.round(x.size / 1024)} کیلوبایت <br />
                                  </Col>
                                </Row>
                              )}
                            </>
                          ) : (
                            <Row>
                              <Col className='p-5'>
                                <p>فایل مربوطه را بگیرید و در این محل رها کنید و یا با کلیک روی این بخش فایل را انتخاب نمایید</p>
                                <em>(فقط فایل اکسل با پسوند xls و xlsx)</em>
                              </Col>
                            </Row>
                          )}
                        </div>
                      </section>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className='p-5'>
                  <Row>
                    <Col>
                      <button
                        className='btn btn-danger'
                        type='button'
                        onClick={async () => await importFromExcel()}
                        disabled={isSending}
                      >
                        <KTIcon iconName='dollar' iconType='solid' className='fs-2 me-2' />
                        {t('Financial.RefundMoneyWithExcel')}
                      </button>
                      <button
                        className='btn btn-info ms-3'
                        type='button'
                        onClick={async () => await downloadRefNumberSampleExcelFile()}
                        disabled={isSending}
                      >
                        <KTIcon iconName='file' iconType='solid' className='fs-2 me-2' />
                        {t('Financial.DownloadSampleFile')}
                      </button>
                    </Col>
                  </Row>
                </Card.Footer>
              </ComponentPermission>
            </Card>
          </Tab>
        </Tabs>
      </FormProvider>
    </>
  );
};

