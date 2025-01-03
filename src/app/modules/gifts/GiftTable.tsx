import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminGift } from './context';
import { GiftDto } from './@types';
import { EnToFaDateSlash } from '@/_metronic/helpers';
import { numberWithCommas } from '@/app/modules/general/helpers';
import { List } from '@/_metronic/partials/controls/Table/List';
import { useGetAllGifts } from './service';
import { Column } from 'react-table';
import { useFormContext } from 'react-hook-form';

export const GiftTable: React.FC<any> = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const columns: ReadonlyArray<Column<GiftDto>> = [{
    Header: t('Gifts.FullName'),
    accessor: 'FullName',
    width: 150,
    Cell: ({ cell }: any) => <span className='fs-6 fw-bold'>{cell.row.values.FullName}</span>,
  },
  {
    Header: t('Gifts.NationalCode'),
    accessor: 'NationalCode',
    width: 100,
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>{cell.row.values.NationalCode}</span>
    ),
  },
  {
    Header: t('Gifts.Amount'),
    accessor: 'Amount',
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>{numberWithCommas(cell.row.values.Amount)}</span>
    ),
  },
  {
    Header: t('Gifts.Type'),
    accessor: 'IsApi',
    width: 100,
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>
        {cell.row.values.IsApi ? (
          <span className='badge rounded-pill bg-secondary text-dark'>
            {t('Gifts.Api')}
          </span>
        ) : (
          <span className='badge rounded-pill bg-primary'>{t('Gifts.Voucher')}</span>
        )}
      </span>
    ),
  },
  {
    Header: t('Gifts.GiftProvider'),
    accessor: 'GiftProvider',
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>{cell.row.values.GiftProvider}</span>
    ),
  },
  {
    Header: t('Gifts.Status'),
    accessor: 'Used',
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>
        {cell.row.values.Used === null ? (
          <span className='badge rounded-pill bg-secondary text-dark'>
            {t('Gifts.WaitingToUse')}
          </span>
        ) : cell.row.values.Used ? (
          <span className='badge rounded-pill bg-success'>{t('Gifts.Used')}</span>
        ) : (
          <span className='badge rounded-pill bg-warning'>{t('Gifts.Unused')}</span>
        )}
      </span>
    ),
  },
  {
    Header: t('Gifts.ActivateDate'),
    accessor: 'ActivateDate',
    width: 100,
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>{EnToFaDateSlash(cell.row.values.ActivateDate)}</span>
    ),
  },
  {
    Header: t('Gifts.ExpireDate'),
    accessor: 'ExpireDate',
    width: 100,
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>{EnToFaDateSlash(cell.row.values.ExpireDate)}</span>
    ),
  },
  {
    Header: t('Gifts.GetGiftDate'),
    accessor: 'GetGiftDate',
    width: 100,
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>{EnToFaDateSlash(cell.row.values.GetGiftDate)}</span>
    ),
  },
  {
    Header: t('Gifts.InsertDateTime'),
    accessor: 'InsertDateTime',
    width: 100,
    Cell: ({ cell }: any) => (
      <span className='fs-6 fw-bold'>
        {EnToFaDateSlash(cell.row.values.InsertDateTime)}
      </span>
    ),
  },
  ];

  return (
    <>
      <List
        preState={{
          PageSize: 10,
          PageIndex: 0,
          TotalCount: 0,
          OrderBy: ['InsertDate desc'],
          ...methods.getValues()
        }}
        reCallState={methods.handleSubmit}
        columns={columns}
        queryFn={useGetAllGifts}
        queryKey='GetAllGifts'
      />
    </>
  );
};
