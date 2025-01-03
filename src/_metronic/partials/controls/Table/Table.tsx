import { useEffect, useMemo, useState } from 'react';
import { useTable, ColumnInstance, Row, Column } from 'react-table';
import { useTranslation } from 'react-i18next';
import { CustomHeaderColumn } from './components/columns/CustomHeaderColumn';
import { CustomRow } from './components/columns/CustomRow';
import { ListPagination } from './components/pagination/ListPagination';
import { ListLoading } from './components/loading/ListLoading';
import { useQueryResponse, useQueryResponseLoading } from './core/QueryResponseProvider';
import '../styles/Table2.css';
import { useListView } from './core/ListViewProvider';
import { Card } from 'react-bootstrap';

export const Table = ({ columns }: { columns: ReadonlyArray<Column<any>> }) => {
  const { t } = useTranslation();
  const reponseContext = useQueryResponse();
  const isLoading = useQueryResponseLoading();
  const [data, setData] = useState(reponseContext.response?.Data?.Result || []);
  const cols = useMemo(() => columns, []);
  const listView = useListView();

  useEffect(() => {
    setData(reponseContext.response?.Data?.Result || []);
  }, [reponseContext]);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns: cols,
    data,
  });

  return (
    <Card>
      <Card.Body className='p-5'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table border-light-subtle align-middle table-row-dashed fs-6 gy-3 dataTable no-footer'
            {...getTableProps()}
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                {listView?.isSelectable && (
                  <th className='ps-2'>
                    <input type='checkbox' title='انتخاب همه' checked={listView.isAllSelected} onChange={(e) => {
                    if (e.target.checked)
                      listView.onSelectAll();
                    else
                      listView.clearSelected();
                  }} /></th>
                )}
                {headers.map((column: ColumnInstance<object>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<object & {Id: number}>, i) => {
                  prepareRow(row);
                  return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
                })
              ) : (
                <tr>
                  <td colSpan={cols.length}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      {t('Messages.NoRecords')}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ListPagination />
        {isLoading && <ListLoading />}
      </Card.Body>
    </Card>
  );
};
