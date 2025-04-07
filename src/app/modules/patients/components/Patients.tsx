import { Column, ColumnDef } from '@tanstack/react-table';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'jalali-moment';
import { Button, Table } from '@/_metronic/partials/controls';
import { addDays } from '@/_metronic/helpers';
import {
    ListViewProvider,
    QueryRequestProvider,
    QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { PageTitle, useLayout } from '@/_metronic/layout/core';
import { CartableFilter } from './Filter';
import { PatientGridDto } from '../@types';
import { usePatients } from '../services/PatientService';
import Loader from '@/_metronic/partials/layout/loader';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const Patients = () => {
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
                to='/patients/create'
                className='btn btn-sm fw-bold btn-primary'
            >
                <i className='fas fa-plus'></i>
                {t('Actions.Create')}
            </Link>,
        ]
    )

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

    const columns = useMemo<ColumnDef<PatientGridDto, any>[]>(
        () => [
            {
                header: () => t('Fields.FirstName'),
                accessorKey: 'FirstName',
            },
            {
                header: t('Fields.LastName'),
                accessorKey: 'LastName'
            },
            {
                header: t('Fields.PhoneNo'),
                accessorKey: 'PhoneNo',
            },
            {
                header: t('Fields.CellPhoneNo'),
                accessorKey: 'CellPhoneNo',
            },
            {
                header: t('Fields.EmergencyPhoneNo'),
                accessorKey: 'EmergencyPhoneNo',
            },
            {
                header: t('Fields.Email'),
                accessorKey: 'Email',
            },
            {
                header: t('Fields.BirthDate'),
                accessorKey: 'BirthDate',
                cell: ({ cell }) => (
                    <>
                        {!!cell.row.original.BirthDate
                            ? moment
                                .from(cell.row.original.BirthDate, "en", "YYYY/MM/DD")
                                .format('jYYYY/jMM/jDD')
                            : ''}
                    </>
                ),
            },
            {
                header: t('Fields.StatusNameOf', {0: t('Patient.Singular')}),
                accessorKey: 'PatientStatusName',
            },
            {
                header: t('Fields.MaritalStatusName'),
                accessorKey: 'MaritalStatusName',
            },
            {
                header: t('Fields.EducationLevelName'),
                accessorKey: 'EducationLevelName',
            },
            {
                header: t('Fields.AddressLine'),
                accessorKey: 'AddressLine',
            },
            {
                header: t('Fields.InsuranceCompanyName'),
                accessorKey: 'InsuranceCompanyName',
            },
            {
                header: t('Actions.Operation'),
                minWidth: 50,
                accessorKey: 'Id',
                id: 'actions',
                cell: ({ cell }) => (
                    <Link
                        className='btn btn-sm btn-info'
                        to={`/patients/show/${cell.getValue()}`}
                    >
                        {false ? (
                            <Loader isLoading={true} color='text-dark' />
                        ) : (
                            t('Actions.Show')
                        )}
                    </Link>
                ),
            }
        ], []);

    return (
        <>
            <PageTitle>{t('Modules.Patients')}</PageTitle>
            <FormProvider {...methods}>
                <QueryRequestProvider
                    preState={{
                        PageSize: 10,
                        PageIndex: 0,
                        OrderBy: ['InsertDate desc'],
                        TotalCount: 0,
                        ...methods.getValues(),
                    }}
                    queryFn={usePatients}
                    queryKey='Patients'
                >
                    <QueryResponseProvider queryFn={usePatients} queryKey='Patients'>
                        <ListViewProvider isSelectable={true}>
                            <CartableFilter />
                            <Table columns={columns}/>
                        </ListViewProvider>
                    </QueryResponseProvider>
                </QueryRequestProvider>
            </FormProvider>
        </>
    );
};