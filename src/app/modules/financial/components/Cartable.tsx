import { useEffect } from 'react';
import moment from 'jalali-moment'
import { Column } from 'react-table';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { Table } from '@/_metronic/partials/controls';
import { addDays } from '@/_metronic/helpers';
import {
    ListViewProvider,
    QueryRequestProvider,
    QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { useFinancialTransfers } from '../services/ReportService';
import { FinancialTransferDto } from '../@types/ReportDto';
import { PageTitle, usePageData } from '@/_metronic/layout/core';
import { numberWithCommas } from '../../general/helpers';
import { CartableFilter } from './CartableFilter';
import { Badge, Spinner } from 'react-bootstrap';
import { ToWords } from 'to-words';
import { StatusBadge } from './StatusBadge';
import { FinancialTransferRequestStatuses, NumberToFinancialStatusMapper } from '../@types/BasicInfo';

export const Cartable = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
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
        ResponseFromDate: yup.date().required(t('Messages.Required', { 0: t('Financial.Report.ResponseFromDate') })),
        ResponseToDate: yup.date().required(t('Messages.Required', { 0: t('Financial.Report.ResponseToDate') }))
    });

    const { setPageCountDown } = usePageData();
    useEffect(() => {
        if (!!setPageCountDown)
            setPageCountDown({
                hasCountDown: true, countDown: 60, onDone: () => {
                    queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'FinancialTransfers' });
                    return { shouldRepeat: true, delay: 1 }
                }
            });

        return () => { !!setPageCountDown && setPageCountDown(undefined) }
    }, [setPageCountDown]);

    let fromDate = addDays(new Date(), -30);
    fromDate.setHours(0, 0, 0, 0)
    let toDate = new Date()
    toDate.setHours(23, 59, 59);

    const methods = useForm({
        defaultValues: {
            PageIndex: 0,
            PageSize: 10,
            ResponseFromDate: fromDate,
            ResponseToDate: toDate,
            StatusId: null
        } as any,
        resolver: yupResolver(validationSchema)
    });

    const columns: ReadonlyArray<Column<FinancialTransferDto>> = [
        {
            Header: t('Financial.FromAccount'),
            accessor: 'FromBankAccountName',
            Cell: ({ cell }) => (
                <div>
                    <h5>{cell.row.original.FromBankAccountName}</h5>
                    <h6 className='text-gray'>{cell.row.original.FromAccountNo}</h6>
                </div>
            )
        },
        {
            Header: t('Financial.ToAccountOrRefNumber'),
            accessor: 'ToBankAccountName',
            Cell: ({ cell }) => (
                <div>
                    <h5>{cell.row.original.ToBankAccountName}</h5>
                    <h6 className='text-gray'>{cell.row.original.ToIban || cell.row.original.RefNumber}</h6>
                </div>
            )
        },
        {
            Header: t('Financial.Report.Amount'),
            accessor: 'Amount',
            Cell: ({ cell }) => <>
                <h5>{numberWithCommas(cell.row.values.Amount)}</h5>
                <h6 className='text-gray'>{towards.isValidNumber(cell.row.values.Amount) ?
                    towards.convert(+cell.row.values.Amount
                        .substring(0, cell.row.values.Amount.length - 1)
                    )
                    : ''}</h6>
            </>
        },
        {
            Header: t('Financial.Report.InsertDateTime'),
            accessor: 'InsertDateTime',
            Cell: ({ cell }) => <div className='ltr pe-5 text-start'>{moment(cell.row.original.InsertDateTime).locale('fa').format('YYYY/MM/DD HH:mm:ss')}</div>
        },
        {
            Header: t('Financial.Report.ResponseDateTime'),
            accessor: 'ResponseDateTime',
            Cell: ({ cell }) => <div className='ltr pe-5 text-start'>{cell.row.original.ResponseDateTime ? moment(cell.row.original.ResponseDateTime).locale('fa').format('YYYY/MM/DD HH:mm:ss') : ''}</div>
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
            Header: t('Financial.Status'),
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

    return (
        <>
            <PageTitle>{t('Financial.Cartable')}</PageTitle>
            <FormProvider {...methods}>
                <QueryRequestProvider
                    preState={{
                        PageSize: 10,
                        PageIndex: 0,
                        OrderBy: ['InsertDate desc'],
                        TotalCount: 0,
                        ...methods.getValues(),
                    }}
                    queryFn={useFinancialTransfers}
                    queryKey='FinancialTransfers'
                >
                    <QueryResponseProvider queryFn={useFinancialTransfers} queryKey='FinancialTransfers'>
                        <ListViewProvider isSelectable={true}>
                            <CartableFilter />
                            <Table columns={columns} />
                        </ListViewProvider>
                    </QueryResponseProvider>
                </QueryRequestProvider>
            </FormProvider>
        </>
    );
};