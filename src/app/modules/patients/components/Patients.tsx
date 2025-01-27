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
import { PageTitle } from '@/_metronic/layout/core';
import { CartableFilter } from './Filter';
import { PatientGridDto } from '../@types';
import { usePatients } from '../services/PatientService';
import Loader from '@/_metronic/partials/layout/loader';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const Patients = () => {
    const { t } = useTranslation();

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
                header: () => t('Patient.FirstName'),
                accessorKey: 'FirstName',
            },
            {
                header: t('Patient.LastName'),
                accessorKey: 'LastName'
            },
            {
                header: t('Patient.PhoneNo'),
                accessorKey: 'PhoneNo',
            },
            {
                header: t('Patient.CellPhoneNo'),
                accessorKey: 'CellPhoneNo',
            },
            {
                header: t('Patient.EmergencyPhoneNo'),
                accessorKey: 'EmergencyPhoneNo',
            },
            {
                header: t('Patient.Email'),
                accessorKey: 'Email',
            },
            {
                header: t('Patient.BirthDate'),
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
                header: t('Patient.PatientStatusName'),
                accessorKey: 'PatientStatusName',
            },
            {
                header: t('Patient.MaritalStatusName'),
                accessorKey: 'MaritalStatusName',
            },
            {
                header: t('Patient.EducationLevelName'),
                accessorKey: 'EducationLevelName',
            },
            {
                header: t('Patient.AddressLine'),
                accessorKey: 'AddressLine',
            },
            {
                header: t('Patient.InsuranceCompanyName'),
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