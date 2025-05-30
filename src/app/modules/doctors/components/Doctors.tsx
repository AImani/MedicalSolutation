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
import { PageTitle, useLayout } from '@/_metronic/layout/core';
import { CartableFilter } from './Filter';
import { ToWords } from 'to-words';
import { DoctorGridDto } from '../@types';
import { useDoctors } from '../services/DoctorService';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export const Doctors = () => {
    const { t } = useTranslation();
    const { setActions } = useLayout()
    setActions(
        [
            <button
                className='btn btn-sm fw-bold btn-secondary'
            >
                <i className='fas fa-filter'></i>
                {t('Actions.Filter')}
            </button>,
            <Link
                to='/doctors/create'
                className='btn btn-sm fw-bold btn-primary'
            >
                <i className='fas fa-plus'></i>
                {t('Actions.Create')}
            </Link>,
        ]
    )

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

    const columns = useMemo<ColumnDef<DoctorGridDto, any>[]>(
        () => [
            {
                header: t('Fields.FirstName'),
                accessor: 'FirstName'
            },
            {
                header: t('Fields.LastName'),
                accessor: 'LastName'
            },
            {
                header: t('Fields.PhoneNumber'),
                accessor: 'PhoneNumber',
            },
            {
                header: t('Fields.Email'),
                accessor: 'Email',
            },
            {
                header: t('Fields.DateOfBirth'),
                accessor: 'DateOfBirth'
            },
            {
                header: t('Fields.MedicalSpecialtyName'),
                accessor: 'MedicalSpecialtyName',
            },
            {
                header: t('Fields.DoctorStatusName'),
                accessor: 'DoctorStatusName',
            },
            {
                header: t('Fields.AddressLine'),
                accessor: 'AddressLine',
            }
        ], []);

    return (
        <>
            <PageTitle>{t('Modules.Doctors')}</PageTitle>
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