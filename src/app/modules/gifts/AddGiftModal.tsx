import { useTranslation } from 'react-i18next';
import { useAdminGift } from './context';
import { Button, Card, Col, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import {
  DatePickerField,
  FileInputField,
  InputField,
  SelectField,
} from '@/_metronic/partials/controls';
import { GiftRequestCommand, GiftExcelRequestCommand } from './@types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { downloadReportExcelFile, downloadSampleExcelFile } from './service';
import toast from 'react-hot-toast';
import Loader from '@/_metronic/partials/layout/loader';

export const AddGiftModal = ({ ...props }: any) => {
  const { t } = useTranslation();
  const adminGiftProvider = useAdminGift()!;

  const { showAddGiftModal, toggleAddGiftModal } = useMemo(() => {
    return {
      showAddGiftModal: adminGiftProvider?.showAddGiftModal,
      toggleAddGiftModal: adminGiftProvider?.toggleAddGiftModal,
    };
  }, [adminGiftProvider]);

  return (
    <Modal show={showAddGiftModal} onHide={() => toggleAddGiftModal(false)} backdrop='static'>
      <Modal.Header closeButton>{t('Reports.Gift.Management')}</Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey='first'>
          <Tab title={t('Gifts.ImportExcel')} eventKey='first'>
            <GiftFromExcelForm />
          </Tab>
          <Tab title={t('Gifts.FromForm')} eventKey='second'>
            <GiftForm />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

const GiftFromExcelForm: React.FC<any> = () => {
  const { t } = useTranslation();

  const requestSchema = Yup.object({
    File: Yup.mixed().test(
      'required',
      t('Messages.Required', { 0: t('Gifts.ExcelFile') }),
      (file) => !(!!file == false || (!!file && (file as any).length == 0))
    ),
  });
  const methods = useForm<GiftExcelRequestCommand>({
    resolver: yupResolver<any>(requestSchema),
  });

  const provider = useAdminGift()!;
  const { isLoading, importGiftFromExcel, errors } = useMemo(() => {
    return {
      isLoading: provider?.importFromExcelLoading,
      importGiftFromExcel: provider?.importGiftFromExcel,
      errors: provider?.importGiftFromExcelErrors,
    };
  }, [provider]);

  const { handleSubmit } = methods;
  const onSubmit = async (values: any) => {
    importGiftFromExcel(values as GiftExcelRequestCommand);
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <Form className='form form-label-right' onSubmit={handleSubmit(onSubmit)}>
          <Card.Body className='px-0 py-1 mt-4'>
            <Row>
              <Col lg={12}>
                <label>{t('Gifts.ExcelFile')}</label>
                <FileInputField name='File' types={['xlsx']} title={t('Actions.Select')} />
              </Col>
            </Row>

            <Row className='mt-5'>
              <div className='d-flex justify-content-start'>
                <Button type='submit' variant='success' disabled={isLoading}>
                  <Loader loading={isLoading} />
                  <i className='fas fa-upload'></i> {t('Reports.Gift.Upload')}
                </Button>
                <Button
                  className='mx-2'
                  variant='primary'
                  onClick={async () => {
                    try {
                      await downloadReportExcelFile();
                    } catch (er: any) {
                      er.Errors.forEach((e: string) => {
                        toast.error(e);
                      });
                    }
                  }}
                >
                  <i className='fas fa-download'></i>
                  {t('Reports.Gift.Download')}
                </Button>

                <Button
                  className='mx-2'
                  variant='secondary'
                  onClick={async () => {
                    try {
                      await downloadSampleExcelFile();
                    } catch (er: any) {
                      er.Errors.forEach((e: string) => {
                        toast.error(e);
                      });
                    }
                  }}
                >
                  <i className='fas fa-download'></i>
                  {t('Reports.Gift.DownloadSampleFile')}
                </Button>
              </div>
            </Row>
            {errors && errors.length > 0 && (
              <Row>
                {errors.map((error) => <p className='mt-2 fw-bold text-danger'>{error}</p>)}
              </Row>
            )}
          </Card.Body>
        </Form>
      </FormProvider>
    </Card>
  );
};

const GiftForm: React.FC<any> = () => {
  const { t } = useTranslation();
  const validationSchemaAmount = Yup.object({
    Amount: Yup.string()
      .required(t('Messages.Required', { 0: t('Gifts.Amount') }))
      .matches(/^[\d,]+$/, t('Messages.Invalid', { 0: t('Gifts.Amount') })),
    VoucherCode: Yup.string().when(['IsApi', 'GiftProviderId'],
      ([isvip, providerId], schema) => {
        if (isvip || providerId == '7')
          return schema.optional();
        else
          return schema.required(t('Messages.Required', { 0: t('Gifts.VoucherCode') }))
      }
    ),
    NationalCode: Yup.string()
      .required(t('Messages.Required', { 0: t('Gifts.NationalCode') }))
      .matches(/^\d{10}$/, t('Messages.Invalid', { 0: t('Gifts.NationalCode') })),
    GiftProviderId: Yup.string().required(t('Messages.Required', { 0: t('Gifts.GiftProvider') })),
    ActivateDate: Yup.string().required(t('Messages.Required', { 0: t('Gifts.ActivateDate') })),
    ExpireDate: Yup.string().required(t('Messages.Required', { 0: t('Gifts.ExpireDate') })),
    IsApi: Yup.boolean().required(t('Messages.Required', { 0: t('Gifts.Type') })),
  });

  const methods = useForm<GiftRequestCommand>({
    resolver: yupResolver<any>(validationSchemaAmount),
    defaultValues: {
      IsApi: false
    }
  });

  const pointProvider = useAdminGift()!;
  const { giftProviders, sendGiftFromApi, isLoading, errors } = useMemo(() => {
    return {
      giftProviders: pointProvider.giftProviders,
      sendGiftFromApi: pointProvider.sendGiftFromApi,
      isLoading: pointProvider.addGiftFromApiLoading,
      errors: pointProvider.addGiftFromApiErrors,
    };
  }, [pointProvider]);

  const { handleSubmit, control } = methods;
  const onSubmit = async (values: any) => {
    sendGiftFromApi(values as GiftRequestCommand);
  };
  const giftProviderId = useWatch({ control, name: 'GiftProviderId' })
  const isApi = useWatch({ control, name: 'IsApi' })

  return (
    <FormProvider {...methods}>
      <Form className='form form-label-right' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={12} className='my-3'>
            <label>{t('Gifts.GiftProvider')}</label>
            <SelectField
              // @ts-ignore
              options={(giftProviders || [])?.map((o) => {
                return { value: o.Id, label: o.Name };
              })}
              name='GiftProviderId'
            />
          </Col>
          <Col className='mb-3' lg={12}>
            <div
              className={`form-control w-100 ${!!methods?.formState?.errors?.IsApi ? 'is-invalid' : ''
                }`}
            >
              <label className='label-control'>{t('Gifts.Type')}</label>
              <div className='form-check form-check-inline'>
                <Form.Check
                  inline
                  label={t('Gifts.Api')}
                  {...methods.register('IsApi')}
                  onChange={(e: any) => {
                    methods.setValue('IsApi', true);
                  }}
                  value={'true'}
                  checked={isApi}
                  disabled={giftProviderId == '7'}
                  type='radio'
                  name='IsApi'
                />
                <Form.Check
                  inline
                  label={t('Gifts.Voucher')}
                  {...methods.register('IsApi')}
                  onChange={(e: any) => {
                    methods.setValue('IsApi', false);
                  }}
                  value={'false'}
                  checked={!isApi}
                  type='radio'
                  name='IsApi'
                />
              </div>
            </div>
            {!!methods.formState?.errors?.IsApi && (
              <div className='invalid-feedback'>{methods.formState?.errors?.IsApi?.message}</div>
            )}
          </Col>
          <Col lg={12} className='mb-3'>
            <label>{t('Gifts.NationalCode')}</label>
            <InputField name='NationalCode' />
          </Col>
          <Col lg={12} className='mb-3'>
            <label>{t('Gifts.Amount')}</label>
            <InputField name='Amount' formatnumber={true} />
          </Col>
          {(!isApi && giftProviderId != '7') && (
            <Col lg={12} className='mb-3'>
              <label>{t('Gifts.VoucherCode')}</label>
              <InputField name='VoucherCode' />
            </Col>
          )}
          <Col lg={12} className='mb-3'>
            <DatePickerField name='ActivateDate' label={t('Gifts.ActivateDate')} />
          </Col>
          <Col lg={12} className='mb-3'>
            <DatePickerField name='ExpireDate' label={t('Gifts.ExpireDate')} />
          </Col>
        </Row>
        <Row>
          <div className='d-flex justify-content-end'>
            <Button type='submit' variant='success' disabled={isLoading}>
              <Loader loading={isLoading} />
              {t('Actions.Submit')}
            </Button>
          </div>
        </Row>
        {errors && errors.length > 0 && (
          <Row className='mt-3'>
            {errors.map((error) => (
              <p className='text-danger'>{error}</p>
            ))}
          </Row>
        )}
      </Form>
    </FormProvider>
  );
};
