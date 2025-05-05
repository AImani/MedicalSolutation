import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
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
import Loader from '@/_metronic/partials/layout/loader';
import { AppointmentRequestGridDto } from '../@types';
import { useAppointmentRequests } from '../services';
import { CartableFilter, View } from '.';

export const AppointmentRequests = () => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [showFilter, setShowFilter] = useState(true);
    const [id, setId] = useState<number>();
    const { setActions } = useLayout()
    setActions(
        [
            <button
                className='btn btn-sm fw-bold btn-secondary'
                onClick={()=>setShowFilter((_prev) => !_prev)}
            >
                <i className='fas fa-filter'></i>
                {t('Actions.Filter')}
            </button>
        ]
    );

    const handleShow = (id: number) => {
        setId(id);
        setShow(true);
    };
    const handleHide = () => {
        setId(undefined);
        setShow(false);
    }

    const validationSchema = yup.object({
        FromDate: yup.date().required(t('Messages.Required', { 0: t('Financial.Report.ResponseFromDate') })),
        ToDate: yup.date().required(t('Messages.Required', { 0: t('Financial.Report.ResponseToDate') }))
    });

    let fromDate = addDays(new Date(), -15);
    fromDate.setHours(0, 0, 0, 0)
    let toDate = addDays(new Date(), 15);
    toDate.setHours(23, 59, 59);

    const methods = useForm({
        defaultValues: {
            PageIndex: 0,
            PageSize: 10,
            FromDate: fromDate,
            ToDate: toDate,
            AppointmentRequestStatusId: null
        } as any,
        resolver: yupResolver(validationSchema)
    });
    const columns = useMemo<ColumnDef<AppointmentRequestGridDto, any>[]>(
        () => [
            {
                header: t('AppointmentRequest.PatientName'),
                accessorKey: 'PatientName'
            },
            {
                header: t('AppointmentRequest.PhoneNumber'),
                accessorKey: 'PhoneNumber'
            },
            {
                header: t('AppointmentRequest.AppointmentRequestStatus'),
                accessorKey: 'AppointmentRequestStatus',
            },
            {
                header: t('AppointmentRequest.AppointmentDate'),
                accessorKey: 'AppointmentDate',
                cell: ({ cell }) => (
                    <>
                        {!!cell.getValue()
                            ? moment
                                .from(cell.getValue(), "en", "YYYY/MM/DD")
                                .format('jYYYY/jMM/jDD')
                            : ''}
                    </>
                ),
            },
            {
                header: t('AppointmentRequest.AppointmentTime'),
                accessorKey: 'AppointmentTime',
            },
            {
                header: t('Actions.Operation'),
                minWidth: 50,
                accessorKey: 'Id',
                id: 'actions',
                cell: ({ cell }) => (
                    <Button
                        className='btn btn-sm btn-info'
                        onClick={() => handleShow(cell.getValue())}
                    >
                        {false ? (
                            <Loader isLoading={true} color='text-dark' />
                        ) : (
                            t('Actions.Show')
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
                            {showFilter && <CartableFilter />}
                            <Table columns={columns} />
                        </ListViewProvider>
                    </QueryResponseProvider>
                </QueryRequestProvider>
            </FormProvider>
            <View show={show} onHide={handleHide} id={id} />
        </>
    );
};