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
import { PageTitle, useLayout } from '@/_metronic/layout/core';
import { CartableFilter } from './Filter';
import { ToWords } from 'to-words';
import { InsuranceCompanyGridDto } from '../@types';
import { useInsuranceCompanies } from '../services/InsuranceCompanyService';
import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import Loader from '@/_metronic/partials/layout/loader';

export const InsuranceCompanies = () => {
    const { t } = useTranslation()
    const [showFilter, setShowFilter] = useState(true)
    const { setActions } = useLayout()
    setActions(
        [
            <button
                className='btn btn-sm fw-bold btn-secondary'
                onClick={() => setShowFilter((_prev) => !_prev)}

            >
                <i className='fas fa-filter'></i>
                {t('Actions.Filter')}
            </button>,
            <Link
                to='/insurance-companies/create'
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

    const columns = useMemo<ColumnDef<InsuranceCompanyGridDto, any>[]>(
        () => [
            {
                header: t('InsuranceCompany.Name'),
                accessorKey: 'Name'
            },
            {
                header: t('InsuranceCompany.PhoneNumber'),
                accessorKey: 'PhoneNumber',
            },
            {
                header: t('InsuranceCompany.Email'),
                accessorKey: 'Email'
            },
            {
                header: t('Actions.Operation'),
                minWidth: 50,
                accessorKey: 'Id',
                id: 'actions',
                cell: ({ cell }) => (
                    <Link
                        className='btn btn-sm btn-info'
                        to={`/insurance-companies/show/${cell.getValue()}`}
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
            <PageTitle>{t('Modules.InsuranceCompanies')}</PageTitle>
            <FormProvider {...methods}>
                <QueryRequestProvider
                    preState={{
                        PageSize: 10,
                        PageIndex: 0,
                        OrderBy: ['InsertDate desc'],
                        TotalCount: 0,
                        ...methods.getValues(),
                    }}
                    queryFn={useInsuranceCompanies}
                    queryKey='InsuranceCompanies'
                >
                    <QueryResponseProvider queryFn={useInsuranceCompanies} queryKey='InsuranceCompanies'>
                        <ListViewProvider>
                            {showFilter && <CartableFilter />}
                            <Table columns={columns} />
                        </ListViewProvider>
                    </QueryResponseProvider>
                </QueryRequestProvider>
            </FormProvider>
        </>
    );
};