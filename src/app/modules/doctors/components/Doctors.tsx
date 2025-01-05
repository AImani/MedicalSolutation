import { Column } from 'react-table';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Table } from '@/_metronic/partials/controls';
import { addDays } from '@/_metronic/helpers';
import {
    ListViewProvider,
    QueryRequestProvider,
    QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { useFinancialTransfers } from '../services/ReportService';
import { PageTitle } from '@/_metronic/layout/core';
import { CartableFilter } from './Filter';
import { ToWords } from 'to-words';
import { DoctorGridDto } from '../@types';
import { useDoctors } from '../services/DoctorService';

export const Doctors = () => {
    const { t } = useTranslation();
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

    const columns: ReadonlyArray<Column<DoctorGridDto>> = [
        {
            Header: t('Doctor.FirstName'),
            accessor: 'FirstName'
        },
        {
            Header: t('Doctor.LastName'),
            accessor: 'LastName'
        },
        {
            Header: t('Doctor.PhoneNumber'),
            accessor: 'PhoneNumber',
        },
        {
            Header: t('Doctor.Email'),
            accessor: 'Email',
        },
        {
            Header: t('Doctor.DateOfBirth'),
            accessor: 'DateOfBirth'
        },
        {
            Header: t('Doctor.MedicalSpecialtyName'),
            accessor: 'MedicalSpecialtyName',
        },
        {
            Header: t('Doctor.DoctorStatusName'),
            accessor: 'DoctorStatusName',
        },
        {
            Header: t('Doctor.AddressLine'),
            accessor: 'AddressLine',
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
                    queryFn={useDoctors}
                    queryKey='Doctors'
                >
                    <QueryResponseProvider queryFn={useDoctors} queryKey='Doctors'>
                        <ListViewProvider>
                            <CartableFilter />
                            <Table columns={columns} />
                        </ListViewProvider>
                    </QueryResponseProvider>
                </QueryRequestProvider>
            </FormProvider>
        </>
    );
};