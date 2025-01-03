import {useTranslation} from 'react-i18next';
import {getStatusColor, useAdminCashbackClaim} from './context';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {useEffect, useMemo, useState} from 'react';
import {numberWithCommas} from '@/app/modules/general/helpers';
import moment from 'jalali-moment';
import {FormProvider, useForm} from 'react-hook-form';
import {CashbackActionCommand, CashbackClaimActionType} from './@types';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {SelectField, TextAreaField} from '@/_metronic/partials/controls';
import {Statistics} from './Statistics';
import Loader from '@/_metronic/partials/layout/loader';

export const ActionModal = ({...props}: any) => {
  const {t} = useTranslation();
  const provider = useAdminCashbackClaim()!;

  const requestSchema = Yup.object({
    OperatorResponse: Yup.string().required(
      t('Messages.Required', {0: t('CashbackClaim.OperatorResponse')})
    ),
    Type: Yup.string().required(
      t('Messages.Required', {0: t('CashbackClaim.CashbackClaimActionType')})
    ),
    CashbackClaimCheckingResultId: Yup.number().required(
      t('Messages.Required', {0: t('CashbackClaim.CashbackClaimCheckingResult')})
    ),
  });

  const methods = useForm<CashbackActionCommand>({
    resolver: yupResolver<any>(requestSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const [actionType, setActionType] = useState<CashbackClaimActionType | null>();

  const {
    showActionModal,
    toggleActionModal,
    detailedCashbackClaim,
    cashbackClaimCheckingResults,
    isAcceptLoading,
    isRejectLoading,
    setAccepted,
    setRejected,
    statistics,
  } = useMemo(() => {
    return {
      showActionModal: provider?.showActionModal,
      toggleActionModal: provider?.toggleActionModal,
      detailedCashbackClaim: provider?.detailedCashbackClaim!,
      cashbackClaimCheckingResults: provider?.cashbackClaimCheckingResults,
      isAcceptLoading: provider?.setAcceptedLoading,
      isRejectLoading: provider?.setRejectedLoading,
      setAccepted: provider?.setAccepted,
      setRejected: provider?.setRejected,
      statistics: provider?.statistics,
    };
  }, [provider]);

  useEffect(() => {
    methods.reset({Comment: '', Type: null, CashbackClaimCheckingResultId: undefined});
    setActionType(null);
  }, [showActionModal]);

  const {handleSubmit} = methods;
  const onSubmit = async (values: any) => {
    const dto = values as CashbackActionCommand;
    dto.Id = detailedCashbackClaim.Id;
    if (Number(dto.Type) === CashbackClaimActionType.Accept) {
      setAccepted(dto);
    } else {
      setRejected(dto);
    }
  };

  const cashbackClaimCheckingResultsOptions = (cashbackClaimCheckingResults || []).map((o: any) => {
    return {value: o.Id, label: o.Name, Type: o.Type};
  });
  cashbackClaimCheckingResultsOptions.unshift({value: null, label: 'انتخاب کنید', Type: 1});
  cashbackClaimCheckingResultsOptions.unshift({value: null, label: 'انتخاب کنید', Type: 2});

  return (
    <Modal
      show={showActionModal}
      onHide={() => toggleActionModal(false)}
      backdrop='static'
      centered
      size='xl'
    >
      <Modal.Header className='h3' closeButton>
        {t('CashbackClaim.Details')}
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.CardNo')}:
              <span className='fw-bolder mx-3'>{detailedCashbackClaim?.CardNo}</span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.NationalCode')}:
              <span className='fw-bolder mx-3'>{detailedCashbackClaim?.CustomerNationalCode}</span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.PhoneNumber')}:
              <span className='fw-bolder mx-3'>{detailedCashbackClaim?.CustomerPhoneNumber}</span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.Date')}:
              <span className='fw-bolder mx-3'>
                {!!detailedCashbackClaim?.TransactionDate
                  ? moment
                      .from(detailedCashbackClaim?.TransactionDate.toString(), 'fa', 'YYYYMMDD')
                      .format('jYYYY/jMM/jDD')
                  : ''}
              </span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.Status')}:
              <span
                className={
                  'fw-bolder badge rounded-pill mx-3 ' +
                  getStatusColor(detailedCashbackClaim?.StatusId)
                }
              >
                {detailedCashbackClaim?.Status}
              </span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.BranchName')}:
              <span className='fw-bolder mx-3'>{detailedCashbackClaim?.BranchName}</span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.Amount')}:
              <span className='fw-bolder mx-3'>
                {numberWithCommas(detailedCashbackClaim?.TransactionAmount.toString())}
              </span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.TerminalNo')}:
              <span className='fw-bolder mx-3'>{detailedCashbackClaim?.TerminalNo}</span>
            </p>
          </Col>
          <Col lg={6}>
            <p>
              {t('CashbackClaim.ReferenceNo')}:
              <span className='fw-bolder mx-3'>
                {detailedCashbackClaim?.TransactionReferenceNo}
              </span>
            </p>
          </Col>
          {detailedCashbackClaim?.File && (
            <Col lg={6}>
              <p>
                {t('CashbackClaim.ReceiptFile')}:
                <span className='fw-bolder mx-3'>
                  <a href={detailedCashbackClaim?.File} target='_blank'>
                    مشاهده
                  </a>
                </span>
              </p>
            </Col>
          )}
          <Col lg={12}>
            <p>
              {t('CashbackClaim.UserComment')}:
              <div className='fw-bolder mx-2 mt-2 w-100'>{detailedCashbackClaim?.UserComment}</div>
            </p>
          </Col>
          {detailedCashbackClaim?.StatusId > 2 && (
            <>
              <Col lg={12}>
                <p>
                  {t('CashbackClaim.CashbackClaimCheckingResult')}:
                  <span className='fw-bolder mx-2 mt-2 w-100'>
                    {detailedCashbackClaim?.CashbackClaimCheckingResultName}
                  </span>
                </p>
              </Col>
              <Col lg={12}>
                <p>
                  {t('CashbackClaim.OperatorResponse')}:
                  <div className='fw-bolder mx-2 mt-2 w-100'>
                    {detailedCashbackClaim?.OperatorResponse}
                  </div>
                </p>
              </Col>
            </>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-start'>
        <Statistics
          title={t('CashbackClaim.StatisticsPerBranch')}
          statistics={statistics?.PerBranch}
        />
        <Statistics
          title={t('CashbackClaim.StatisticsPerTerminal')}
          statistics={statistics?.PerTerminal}
        />
        <Statistics title={t('CashbackClaim.StatisticsPerUser')} statistics={statistics?.PerUser} />
        {detailedCashbackClaim?.StatusId === 2 && (
          <Row className='w-100 mt-2'>
            <FormProvider {...methods}>
              <Form className='form form-label-right' onSubmit={handleSubmit(onSubmit)}>
                <Row className='w-100 mb-5'>
                  <Col className='mt-md-6' lg={6}>
                    <div
                      className={`form-control w-100 ${
                        !!methods?.formState?.errors?.Type ? 'is-invalid' : ''
                      }`}
                    >
                      <label className='label-control'>
                        {t('CashbackClaim.CashbackClaimActionType')}
                      </label>
                      <div className='form-check form-check-inline'>
                        <Form.Check
                          inline
                          label={t('CashbackClaim.Accept')}
                          value={CashbackClaimActionType.Accept}
                          {...methods.register('Type')}
                          onChange={(e) => {
                            methods.setValue('CashbackClaimCheckingResultId', null);
                            setActionType(CashbackClaimActionType.Accept);
                          }}
                          type='radio'
                          id={`Type${CashbackClaimActionType.Accept}`}
                        />
                        <Form.Check
                          inline
                          label={t('CashbackClaim.Reject')}
                          value={CashbackClaimActionType.Reject}
                          {...methods.register('Type')}
                          onChange={(e) => {
                            methods.setValue('CashbackClaimCheckingResultId', null);
                            setActionType(CashbackClaimActionType.Reject);
                          }}
                          type='radio'
                          id={`Type${CashbackClaimActionType.Reject}`}
                        />
                      </div>
                    </div>
                    {!!methods.formState?.errors?.Type && (
                      <div className='invalid-feedback'>
                        {methods.formState?.errors?.Type?.message}
                      </div>
                    )}
                  </Col>
                  <Col lg={6}>
                    <label>{t('CashbackClaim.CashbackClaimCheckingResult')}</label>
                    <SelectField
                      // @ts-ignore
                      options={cashbackClaimCheckingResultsOptions.filter(
                        (o) => o.Type === Number(actionType)
                      )}
                      name='CashbackClaimCheckingResultId'
                    />
                  </Col>
                  <Col className='mt-3' lg={12}>
                    <TextAreaField
                      name='OperatorResponse'
                      label={t('CashbackClaim.OperatorResponse')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='text-left'>
                      {actionType === CashbackClaimActionType.Accept && (
                        <Button
                          type='submit'
                          className='me-2'
                          variant='primary'
                          disabled={isAcceptLoading}
                        >
                          <Loader loading={isAcceptLoading} />
                          {t('CashbackClaim.Accept')}
                        </Button>
                      )}
                      {actionType === CashbackClaimActionType.Reject && (
                        <Button type='submit' variant='danger' disabled={isRejectLoading}>
                          <Loader loading={isRejectLoading} />
                          {t('CashbackClaim.Reject')}
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </FormProvider>
          </Row>
        )}
      </Modal.Footer>
    </Modal>
  );
};
