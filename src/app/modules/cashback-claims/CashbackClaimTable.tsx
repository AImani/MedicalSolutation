import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getStatusColor, useAdminCashbackClaim } from './context';
import { numberWithCommas } from '@/app/modules/general/helpers';
import { CashbackClaimDto } from './@types';
import moment from 'jalali-moment';
import { ActionModal } from './ActionModal';
import { Button, Table } from '@/_metronic/partials/controls';
import { EnToFaDateTimeSlash } from '@/_metronic/helpers';
import Loader from '@/_metronic/partials/layout/loader';
import { Column } from 'react-table';
import { useFormContext } from 'react-hook-form';
import usePermission from '@/app/modules/auth/permissions/hook'
import { useQueryClient } from '@tanstack/react-query';
import { usePageData } from '@/_metronic/layout/core';

export const CashbackClaimTable: React.FC<any> = () => {
  const { t } = useTranslation();
  const provider = useAdminCashbackClaim();
  const methods = useFormContext();
  const { setPageCountDown } = usePageData();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!!setPageCountDown)
      setPageCountDown({
        hasCountDown: true, countDown: 60, onDone: () => {
          queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'AdminGetAllCashbackClaims' });
          return { shouldRepeat: true, delay: 1 }
        }
      });

    return () => { !!setPageCountDown && setPageCountDown(undefined) }
  }, [setPageCountDown]);

  let viewPermission: boolean = usePermission([{ ctrl: 'CashbackClaims', action: 'Get' }]) || false;
  let checkPermission: boolean = usePermission([{ ctrl: 'CashbackClaims', action: 'Check' }]) || false;

  const {
    reportData,
    search,
    isLoading,
    setChecking,
    showActionModal,
    setCheckingLoading,
    showActionModalWithoutSetChecking,
  } = useMemo(
    () => ({
      reportData: provider?.items!,
      search: provider?.queryCashbackClaims!,
      isLoading: provider?.isLoading!,
      setChecking: provider?.setChecking!,
      showActionModal: provider?.showActionModal!,
      setCheckingLoading: provider?.setCheckingLoading,
      showActionModalWithoutSetChecking: provider?.showActionModalWithoutSetChecking!,
    }),
    [provider]
  );

  const columns: ReadonlyArray<Column<CashbackClaimDto>> = [
    {
      Header: t('CashbackClaim.CardNo'),
      accessor: 'CardNo',
      Cell: ({ cell }) => <span className='fs-6 fw-bold'>{cell.row.values.CardNo}</span>,
    },
    {
      Header: t('CashbackClaim.NationalCode'),
      accessor: 'CustomerNationalCode',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>{cell.row.values.CustomerNationalCode}</span>
      ),
    },
    {
      Header: t('CashbackClaim.CustomerFullName'),
      accessor: 'CustomerFullName',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>{cell.row.values.CustomerFullName}</span>
      ),
    },
    {
      Header: t('CashbackClaim.Amount'),
      accessor: 'TransactionAmount',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>
          {numberWithCommas(cell.row.values.TransactionAmount)}
        </span>
      ),
    },
    {
      Header: t('CashbackClaim.BranchName'),
      accessor: 'BranchName',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>{cell.row.values.BranchName}</span>
      ),
    },
    {
      Header: t('CashbackClaim.TerminalNo'),
      accessor: 'TerminalNo',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>{cell.row.values.TerminalNo}</span>
      ),
    },
    {
      Header: t('CashbackClaim.Status'),
      accessor: 'Status',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>
          <span
            className={'badge rounded-pill ' + getStatusColor(cell.row.original.StatusId)}
          >
            {cell.row.values.Status}
          </span>
        </span>
      ),
    },
    {
      Header: t('CashbackClaim.TransactionDate'),
      accessor: 'TransactionDate',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>
          {!!cell.row.original.TransactionDate
            ? moment
              .from(cell.row.original.TransactionDate.toString(), 'fa', 'YYYYMMDD')
              .format('jYYYY/jMM/jDD')
            : ''}
        </span>
      ),
    },
    {
      Header: t('CashbackClaim.ReferenceNo'),
      accessor: 'TransactionReferenceNo',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>{cell.row.values.TransactionReferenceNo}</span>
      ),
    },
    {
      Header: t('CashbackClaim.SystemUserFullName'),
      accessor: 'OperatorFullName',
      minWidth: 100,
      Cell: ({ cell }) => (
        <span className='fs-6 fw-bold'>{cell.row.values.OperatorFullName}</span>
      ),
    },
    {
      Header: t('CashbackClaim.InsertDate'),
      accessor: 'InsertDateTime',
      minWidth: 100,
      Cell: ({ cell }) => (
        <div className='fs-6 fw-bold ltr'>
          {EnToFaDateTimeSlash(cell.row.values.InsertDateTime)}
        </div>
      ),
    },
    {
      Header: t('CashbackClaim.ModifiedDate'),
      accessor: 'ModifiedDateTime',
      minWidth: 100,
      Cell: ({ cell }) => (
        <div className='fs-6 fw-bold ltr'>
          {EnToFaDateTimeSlash(cell.row.values.ModifiedDateTime)}
        </div>
      ),
    },
    {
      Header: t('Actions.Operation'),
      minWidth: 65,
      accessor: 'Id',
      id: 'actions',
      Cell: ({ cell }) => (
        <>
          {(checkPermission && (cell.row.original.StatusId === 1 || cell.row.original.StatusId === 2)) && (
            <Button
              className='btn btn-sm btn-info'
              disabled={setCheckingLoading}
              onClick={() => setChecking(cell.row.original as CashbackClaimDto)}
            >
              {setCheckingLoading ? (
                <Loader isLoading={setCheckingLoading} color='text-dark' />
              ) : (
                t('Actions.Check')
              )}
            </Button>
          )}
          {(viewPermission && !(cell.row.original.StatusId === 1 || cell.row.original.StatusId === 2)) && (
            <Button
              className='btn btn-sm btn-light'
              onClick={() => showActionModalWithoutSetChecking(cell.row.original as CashbackClaimDto)}
            >{t('Actions.Show')}</Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} />
      <ActionModal props={{ showActionModal }} />
    </>
  );
};
