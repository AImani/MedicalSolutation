import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Table } from '@/_metronic/partials/controls';
import {
    ListViewProvider,
    QueryRequestProvider,
    QueryResponseProvider,
} from '@/_metronic/partials/controls/Table';
import { PageTitle, useLayout } from '@/_metronic/layout/core';
import { useMemo } from 'react';
import { BasicInfoDto } from '../../@types';

export interface ListProps {
    pageTitle: string,
    queryFn: Function,
    queryKey: string,
    showModify: Function,
    showDelete: Function,
    showView: Function,
    showCreate: Function,
    showFilter: Function,
};

export const List = ({ queryFn, queryKey, pageTitle, ...dialog }: ListProps) => {
    const { t } = useTranslation();
    const { setActions } = useLayout()
    setActions(
        [
            <button
                onClick={() => dialog.showFilter()}
                className='btn btn-sm fw-bold btn-secondary'
            >
                <i className='fas fa-filter'></i>
                {t('Actions.Filter')}
            </button>,
            <button
                onClick={() => dialog.showCreate()}
                className='btn btn-sm fw-bold btn-primary'
            >
                <i className='fas fa-plus'></i>
                {t('Actions.Create')}
            </button>,
        ]
    )
    const columns = useMemo<ColumnDef<BasicInfoDto, any>[]>(
        () => [
            {
                header: () => t('Fields.Title'),
                accessorKey: 'Title',
            },
            {
                header: t('Actions.Operation'),
                minWidth: 50,
                accessorKey: 'Id',
                id: 'actions',
                cell: ({ cell }) => (
                    <>
                        <button className='btn btn-sm btn-info me-1' onClick={() => dialog.showView(cell.row.original)}><i className='fas fa-eye p-0'></i></button>
                        <button className='btn btn-sm btn-danger me-1' onClick={() => dialog.showDelete(cell.row.original)}><i className='fas fa-trash-alt p-0'></i></button>
                        <button className='btn btn-sm btn-primary' onClick={() => dialog.showModify(cell.row.original)}><i className='fas fa-pen p-0'></i></button>
                    </>
                ),
            }
        ], []);

    return (
        <>
            <PageTitle>{pageTitle}</PageTitle>
            <QueryRequestProvider
                preState={{
                    PageSize: 10,
                    PageIndex: 0,
                    OrderBy: ['InsertDate desc'],
                    TotalCount: 0,
                }}
                queryFn={queryFn}
                queryKey={queryKey}
            >
                <QueryResponseProvider queryFn={queryFn} queryKey={queryKey}>
                    <ListViewProvider>
                        <Table columns={columns} />
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
};