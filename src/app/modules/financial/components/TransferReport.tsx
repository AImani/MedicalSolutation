import { components } from 'react-select';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Column } from 'react-table';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'jalali-moment'
import * as yup from 'yup';
import { DatePickerField, InputField, SelectField, Table } from '@/_metronic/partials/controls';
import { KTIcon } from '@/_metronic/helpers';
import {
  ListViewProvider,
  QueryRequestConsumer,
  QueryRequestProvider,
  QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { exportAllFiltered, useFinancialTransfers } from '../services/ReportService';
import { FinancialTransferDto } from '../@types/ReportDto';
import { useBankAccounts, useStatuses } from '../services/BasicInfoService';
import { BankAccountSelectListDto, BankAccountTypeDto } from '../@types/BasicInfo';
import { PageTitle } from '@/_metronic/layout/core';
import { numberWithCommas } from '../../general/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusBadge } from './StatusBadge';

export const TransferReport = () => {
  const { t } = useTranslation();
  const { data: bankAccounts } = useBankAccounts();
  const{data: Status} = useStatuses();
  let behinBankAccounts = (bankAccounts?.Data || [])
    .filter((x) => x.Type === BankAccountTypeDto.Behin)
    .map((x) => ({ label: x.Title, value: x.Id, extra: x } as { label: string, value: number | null, extra: BankAccountSelectListDto | null }));
  behinBankAccounts = [{ label: 'همه', value: null, extra: null }, ...behinBankAccounts];

  let partnerBankAccounts = (bankAccounts?.Data || [])
    .filter((x) => x.Type === BankAccountTypeDto.Partners)
    .map((x) => ({ label: x.Title, value: x.Id, extra: x } as { label: string, value: number | null, extra: BankAccountSelectListDto | null }));
  partnerBankAccounts = [{ label: 'همه', value: null, extra: null }, ...partnerBankAccounts];

  const validationSchema = yup.object({
    ResponseFromDate: yup
      .date()
      .required(t('Messages.Required', { 0: t('Financial.Report.ResponseFromDate') })),
    ResponseToDate: yup
      .date()
      .required(t('Messages.Required', { 0: t('Financial.Report.ResponseToDate') }))
  });

  const methods = useForm({
    defaultValues: {
      PageIndex: 0,
      PageSize: 10,
      FromBankAccountId: null,
      ToBankAccountId: null,
      Succeeded: null,
    } as any,
    resolver: yupResolver(validationSchema)
  });

  const CustomOption = ({ children, ...props }: any) => (
    <components.Option {...props}>
      {props.isSelected ? (
        <p>{props.label}</p>
      ) : (
        <div>
          {props.data?.extra ? (
            <>
              <h4>{props.data?.extra?.Title}</h4>
              <h6>{props.data?.extra?.AccountNo || props.data?.extra?.Iban}</h6>
            </>
          ) : (
            <h4>{props.label}</h4>
          )}
        </div>
      )}
    </components.Option>
  );

  const columns: ReadonlyArray<Column<FinancialTransferDto>> = [
    {
      Header: t('Financial.Report.FromBankAccountName'),
      accessor: 'FromBankAccountName',
    },
    {
      Header: t('Financial.Report.ToBankAccountName'),
      accessor: 'ToBankAccountName',
    },
    {
      Header: t('Financial.Report.FromAccountNo'),
      accessor: 'FromAccountNo',
    },
    {
      Header: t('Financial.Report.ToIban'),
      accessor: 'ToIban',
    },
    {
      Header: t('Financial.Report.Amount'),
      accessor: 'Amount',
      Cell: ({ cell }: any) => <b>{numberWithCommas(cell.row.values.Amount)}</b>
    },
    {
      Header: t('Financial.Report.RefNumber'),
      accessor: 'RefNumber',
    },
    {
      Header: t('Financial.Report.ResponseDateTime'),
      accessor: 'ResponseDateTime',
      Cell: ({ cell }: any) => <div className='ltr pe-5'>{!!cell.row.values.ResponseDateTime? moment.from(cell.row.values.ResponseDateTime, 'en').locale('fa').format('YYYY/MM/DD HH:mm:ss'): ''}</div>
    },
    {
      Header: t('Financial.Report.ReferenceNumber'),
      accessor: 'RefundApiResponse_ReferenceNumber',
    },
    {
      Header: t('Financial.Report.OperatorFullName'),
      accessor: 'OperatorFullName',
    },
    {
      Header: t('Financial.Report.Succeeded'),
      accessor: 'StatusName',
      Cell: ({ cell }) => <StatusBadge statusId={cell.row.original.StatusId} message={cell.row.original.StatusName}/>,
      minWidth: 70,
    },
    {
      Header: t('Financial.Report.Description'),
      accessor: 'Description',
      minWidth: 150,
    }
  ];

  const onExport = methods.handleSubmit((values: any) => {
    methods.trigger(['FromBankAccountId', 'ResponseFromDate', 'ResponseToDate'])
      .then((res) => {
        exportAllFiltered({
          ...values,
          FromBankAccountId: values.FromBankAccountId,
          RefNumber: !!values.RefNumber ? values.RefNumber : undefined,
          RefundApiResponse_ReferenceNumber: !!values.RefundApiResponse_ReferenceNumber ? values.RefundApiResponse_ReferenceNumber : undefined,
          PageIndex: 0,
        }).then(
          ({ data }) => {
            const url = window.URL.createObjectURL(data);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              'گزارش انتقال وجه.xlsx'
            );

            document.body.appendChild(link);
            link.click();
          }
        );
      }
      )
  });

  return (
    <>
      <PageTitle>{t('Financial.Report')}</PageTitle>
      <QueryRequestProvider
        preState={{
          PageSize: 10,
          PageIndex: 0,
          OrderBy: ['InsertDate desc'],
          TotalCount: 0,
          StatusId:null,
          ...methods.getValues(),
        }}
        queryFn={useFinancialTransfers}
        queryKey='FinancialTransfers'
      >
        <QueryResponseProvider queryFn={useFinancialTransfers} queryKey='FinancialTransfers'>
          <ListViewProvider>
            <QueryRequestConsumer>
              {({ updateState, state }: any) => (
                <FormProvider {...methods}>
                  <Card className='mb-5'>
                    <Form className='form form-label-right'>
                      <Card.Body className='p-5'>
                        <Row className='w-100 my-3 mx-0 me-auto'>
                          <Col lg={3}>
                            <SelectField
                              name='FromBankAccountId'
                              label={t('Financial.Report.FromBankAccountName')}
                              components={{ Option: CustomOption }}
                              options={behinBankAccounts}
                            />
                          </Col>
                          <Col lg={3}>
                            <SelectField
                              name='ToBankAccountId'
                              label={t('Financial.Report.ToBankAccountName')}
                              components={{ Option: CustomOption }}
                              options={partnerBankAccounts}
                            />
                          </Col>
                          <Col lg={3} className='mb-2'>
                            <InputField name='RefNumber' label={t('Financial.Report.RefNumber')} />
                          </Col>
                          <Col lg={3}>
                            <InputField name='RefundApiResponse_ReferenceNumber' label={t('Financial.Report.ReferenceNumber')} />
                          </Col>
                          <Col lg={3}>
                            <SelectField
                              name='StatusId'
                              options={[
                                { label: 'همه', value: null },
                                ...(Status?.Data ?? []).map((it) => ({ label: it.Name, value: it.Id }))
                              ]}
                              label={t('Financial.Report.Succeeded')}
                            />
                          </Col>
                          <Col lg={3}>
                            <DatePickerField name='ResponseFromDate' label={t('Financial.Report.RequestFromDate')}
                            />
                          </Col>
                          <Col lg={3}>
                            <DatePickerField name='ResponseToDate' label={t('Financial.Report.RequestToDate')} />
                          </Col>
                          <Col lg={'auto'} className='pe-0 pt-5 mt-2'>
                            <InputGroup size='sm'>
                              <Button type='button' variant='primary' onClick={() => {
                                methods.trigger(['FromBankAccountId', 'ResponseFromDate', 'ResponseToDate'])
                                  .then((res) =>
                                    res && !!updateState && updateState({
                                      ...state, ...methods.getValues(),
                                      FromBankAccountId: methods.getValues("FromBankAccountId") == 0 ? null : methods.getValues("FromBankAccountId"),
                                      RefNumber: !!methods.getValues("RefNumber") ? methods.getValues("RefNumber") : null,
                                      RefundApiResponse_ReferenceNumber: !!methods.getValues("RefundApiResponse_ReferenceNumber") ? methods.getValues("RefundApiResponse_ReferenceNumber") : null,
                                      PageIndex: 0,
                                    })
                                  )
                              }}>
                                <KTIcon iconName='magnifier' iconType='solid' className='fs-2' />{' '}
                                {t('Actions.Search')}
                              </Button>
                            </InputGroup>
                          </Col>
                          <Col lg={'auto'} className='pt-5 mt-2'>
                            <InputGroup size='sm'>
                              <Button type='submit' variant='primary' onClick={onExport}>
                                <KTIcon iconName='cloud-download' iconType='solid' className='fs-2 me-2' /> {t('Actions.ExportExcel')}
                              </Button>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Form>
                  </Card>
                  <Table columns={columns} />
                </FormProvider>
              )}
            </QueryRequestConsumer>
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </>
  );
};
