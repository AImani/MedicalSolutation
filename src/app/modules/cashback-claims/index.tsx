import { useTranslation } from 'react-i18next';
import { AdminCashbackClaimProvider, useAdminCashbackClaim } from './context';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { DatePickerField, InputField, SelectField } from '@/_metronic/partials/controls';
import { useEffect, useMemo } from 'react';
import { CashbackClaimTable } from './CashbackClaimTable';
import Loader from '@/_metronic/partials/layout/loader';
import { KTIcon } from '@/_metronic/helpers';
import { PageTitle } from '@/_metronic/layout/core';
import { useGetAllCashbackClaims } from './service';
import { ListViewProvider, QueryRequestConsumer, QueryRequestProvider, QueryResponseProvider } from '@/_metronic/partials/controls/Table';

export const AdminCashbackClaim = ({ ...props }: any) => {
  const { t } = useTranslation();

  return (
    <AdminCashbackClaimProvider>
      <PageTitle>{`${t('CashbackClaims')} / ${t('CashbackClaim.CashbackClaims')}`}</PageTitle>
      <Body />
    </AdminCashbackClaimProvider>
  );
};

const Body = () => {
  const { t } = useTranslation();
  const provider = useAdminCashbackClaim()!;
  const methods = useForm();

  const { search, statuses, systemUsers, branchList, getExcel, isDownloading } = useMemo(() => {
    return {
      search: provider.queryCashbackClaims,
      statuses: provider.statuses!,
      systemUsers: provider.systemUsers!,
      branchList: provider.branchList,
      isDownloading: provider.isDownloading,
      getExcel: provider.getExcel!,
    };
  }, [provider]);

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((values: any) => {
    search({
      PageIndex: 0,
      PageSize: 10,
      NationalCode: methods.getValues('NationalCode'),
      StatusId: methods.getValues('StatusId'),
      FromDate: methods.getValues('FromDate'),
      ToDate: methods.getValues('ToDate'),
      TerminalNo: methods.getValues('TerminalNo'),
      OperatorId:
        Number(methods.getValues('OperatorId')) === 0
          ? null
          : Number(methods.getValues('OperatorId')),
      ReferenceNo:
        Number(methods.getValues('ReferenceNo')) === 0
          ? null
          : Number(methods.getValues('ReferenceNo')),
      BranchId:
        Number(methods.getValues('BranchId')) === 0 ? null : Number(methods.getValues('BranchId')),
    });
  });

  const options = (statuses || []).map((o: any) => {
    return { value: o.Id, label: o.Name };
  });
  options.unshift({ value: null, label: 'همه' });

  const systemUsersoptions = (systemUsers || []).map((o: any) => {
    return { value: o.UserId, label: o.FullName };
  });
  systemUsersoptions.unshift({ value: null, label: 'همه' });

  const branchListOptions = (branchList || []).map((o: any) => {
    return { value: o.Id, label: o.Name };
  });
  branchListOptions.unshift({ value: null, label: 'همه' });

  return (
    <QueryRequestProvider
      reCallState={search}
      preState={{
        PageSize: 10,
        PageIndex: 0,
        OrderBy: ['InsertDateTime desc'],
        TotalCount: 0,
        ...methods.getValues(),
      }}
      queryFn={useGetAllCashbackClaims}
      queryKey='AdminGetAllCashbackClaims'
    >
      <QueryResponseProvider queryFn={useGetAllCashbackClaims} queryKey='getSurvay'>
        <ListViewProvider>
          <QueryRequestConsumer>
            {({ updateState, state }: any) => (
              <FormProvider {...methods}>
                <Form className='form form-label-right' onSubmit={onSubmit}>
                  <Card className='mb-5'>
                    <Card.Body className='p-5'>
                      <Row className='w-100 my-3 mx-0 me-auto'>
                        <Col lg={4}>
                          <label>{t('CashbackClaim.Status')}</label>
                          <SelectField
                            // @ts-ignore
                            options={options}
                            name='StatusId'
                            id='StatusId'
                          />
                        </Col>
                        <Col lg={4}>
                          <label>{t('CashbackClaim.SystemUserFullName')}</label>
                          <SelectField
                            // @ts-ignore
                            options={systemUsersoptions}
                            name='OperatorId'
                            id='OperatorId'
                          />
                        </Col>
                        <Col lg={4}>
                          <InputField name='NationalCode' label={t('CashbackClaim.NationalCode')} />
                        </Col>
                        <Col lg={4}>
                          <InputField name='ReferenceNo' label={t('CashbackClaim.ReferenceNo')} />
                        </Col>
                        <Col lg={4}>
                          <InputField name='TerminalNo' label={t('CashbackClaim.TerminalNo')} />
                        </Col>
                        <Col lg={4}>
                          <SelectField
                            name='BranchId'
                            label={t('Merchant.Entity')}
                            options={branchListOptions}
                          />
                        </Col>
                        <Col lg={4}>
                          <DatePickerField name='FromDate' label={t('CashbackClaim.FromDate')} />
                        </Col>
                        <Col lg={4}>
                          <DatePickerField name='ToDate' label={t('CashbackClaim.ToDate')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={'auto'} className='pe-0 pt-5 mt-2'>
                          <Button className='me-2' type='button' variant='primary' onClick={() =>
                            !!updateState && updateState({
                              ...state,
                              ...methods.getValues(),
                              OperatorId:
                                Number(methods.getValues('OperatorId')) === 0
                                  ? null
                                  : Number(methods.getValues('OperatorId')),
                              ReferenceNo:
                                Number(methods.getValues('ReferenceNo')) === 0
                                  ? null
                                  : Number(methods.getValues('ReferenceNo')),
                              BranchId:
                                Number(methods.getValues('BranchId')) === 0
                                  ? null
                                  : Number(methods.getValues('BranchId')),
                              PageIndex: 0
                            })
                          }>
                            <KTIcon iconName='magnifier' iconType='solid' className='fs-2 me-2' />
                            {t('Actions.Search')}
                          </Button>
                          <Button
                            className='me-2'
                            disabled={isDownloading}
                            onClick={() =>
                              getExcel({
                                NationalCode: methods.getValues('NationalCode'),
                                StatusId: methods.getValues('StatusId'),
                                FromDate: methods.getValues('FromDate'),
                                ToDate: methods.getValues('ToDate'),
                                TerminalNo: methods.getValues('TerminalNo'),
                                OperatorId:
                                  Number(methods.getValues('OperatorId')) === 0
                                    ? null
                                    : Number(methods.getValues('OperatorId')),
                                ReferenceNo:
                                  Number(methods.getValues('ReferenceNo')) === 0
                                    ? null
                                    : Number(methods.getValues('ReferenceNo')),
                                BranchId:
                                  Number(methods.getValues('BranchId')) === 0
                                    ? null
                                    : Number(methods.getValues('BranchId')),
                              })
                            }
                            type='button'
                            variant='success'
                          >
                            <Loader loading={isDownloading} />
                            <KTIcon iconName='cloud-download' iconType='solid' className='fs-2 me-2' />
                            {t('Actions.ExportExcel')}
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <CashbackClaimTable />
                </Form>
              </FormProvider>
            )}
          </QueryRequestConsumer>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};
