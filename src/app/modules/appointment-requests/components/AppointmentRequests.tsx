import { Column, ColumnDef } from '@tanstack/react-table';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Table } from '@/_metronic/partials/controls';
import { addDays } from '@/_metronic/helpers';
import {
    ListViewProvider,
    QueryRequestProvider,
    QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { PageTitle } from '@/_metronic/layout/core';
import { CartableFilter } from './Filter';
import { ToWords } from 'to-words';
import { AppointmentRequestGridDto } from '../@types';
import { useAppointmentRequests } from '../services/CoreService';
import Loader from '@/_metronic/partials/layout/loader';
import { useMemo } from 'react';

export const AppointmentRequests = () => {
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
    const columns = useMemo<ColumnDef<AppointmentRequestGridDto, any>[]>(
        () => [
            {
                header: t('AppointmentRequest.PatientName'),
                accessor: 'PatientName'
            },
            {
                header: t('AppointmentRequest.PhoneNumber'),
                accessor: 'PhoneNumber'
            },
            {
                header: t('AppointmentRequest.AppointmentDate'),
                accessor: 'AppointmentDate',
            },
            {
                header: t('AppointmentRequest.AppointmentTime'),
                accessor: 'AppointmentTime',
            },
            {
                header: t('AppointmentRequest.AppointmentRequestStatus'),
                accessor: 'AppointmentRequestStatus',
            },
            {
                header: t('Actions.Operation'),
                minWidth: 65,
                accessor: 'Id',
                id: 'actions',
                cell: ({ cell }) => (
                    <Button
                        className='btn btn-sm btn-info'

                    >
                        {true ? (
                            <Loader isLoading={true} color='text-dark' />
                        ) : (
                            t('Actions.Check')
                        )}
                    </Button>
                ),
            }
        ], []);

    return (
        <>
            <PageTitle>{t('Modules.AppointmentRequest')}</PageTitle>
            <FormProvider {...methods}>
                <QueryRequestProvider
                    preState={{
                        PageSize: 10,
                        PageIndex: 0,
                        OrderBy: ['InsertDate desc'],
                        TotalCount: 0,
                        ...methods.getValues(),
                    }}
                    queryFn={useAppointmentRequests}
                    queryKey='AppointmentRequests'
                >
                    <QueryResponseProvider queryFn={useAppointmentRequests} queryKey='AppointmentRequests'>
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