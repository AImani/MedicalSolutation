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
import { PageTitle } from '@/_metronic/layout/core';
import { CartableFilter } from './Filter';
import { ToWords } from 'to-words';
import { PatientGridDto } from '../@types';
import { usePatients } from '../services/PatientService';

export const Patients = () => {
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

    const columns: ReadonlyArray<Column<PatientGridDto>> = [
        {
            Header: t('Patient.FirstName'),
            accessor: 'FirstName'
        },
        {
            Header: t('Patient.LastName'),
            accessor: 'LastName'
        },
        {
            Header: t('Patient.PhoneNo'),
            accessor: 'PhoneNo',
        },
        {
            Header: t('Patient.CellPhoneNo'),
            accessor: 'CellPhoneNo',
        },
        {
            Header: t('Patient.EmergencyPhoneNo'),
            accessor: 'EmergencyPhoneNo',
        },
        {
            Header: t('Patient.Email'),
            accessor: 'Email',
        },
        {
            Header: t('Patient.BirthDate'),
            accessor: 'BirthDate'
        },
        {
            Header: t('Patient.PatientStatusName'),
            accessor: 'PatientStatusName',
        },
        {
            Header: t('Patient.MaritalStatusName'),
            accessor: 'MaritalStatusName',
        },
        {
            Header: t('Patient.EducationLevelName'),
            accessor: 'EducationLevelName',
        },
        {
            Header: t('Patient.AddressLine'),
            accessor: 'AddressLine',
        },
        {
            Header: t('Patient.InsuranceCompanyName'),
            accessor: 'InsuranceCompanyName',
        }
    ];

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