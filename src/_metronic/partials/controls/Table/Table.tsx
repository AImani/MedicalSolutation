import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next';
import { CustomHeaderColumn } from './components/columns/CustomHeaderColumn'; // Import your custom header column component
import { CustomRow } from './components/columns/CustomRow'; // Import your custom row component
import { ListPagination } from './components/pagination/ListPagination'; // Import your pagination component (optional)
import { ListLoading } from './components/loading/ListLoading'; // Import your loading component (optional)
import { useQueryResponse, useQueryResponseLoading } from './core/QueryResponseProvider'; // Assuming this provides data and loading state
import { useListView } from './core/ListViewProvider'; // Assuming this provides selection state (optional)
import '../styles/Table2.css'; // Import your styles (optional)
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

export const Table = ({ columns }: { columns: ColumnDef<any>[] }) => {
  const { t } = useTranslation();
  const responseContext = useQueryResponse();
  const isLoading = useQueryResponseLoading();
  const [data, setData] = useState(responseContext?.response?.Data?.Result || []);
  const listView = useListView();

  useEffect(() => {
    setData(responseContext?.response?.Data?.Result || []);
  }, [responseContext]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  return (
    <Card>
      <Card.Body className='p-5'>
      <div className='table-responsive'>
      <table className='table border-light-subtle align-middle table-row-dashed fs-6 gy-3 dataTable no-footer'>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                            {header.column.getCanFilter() ? (
                              <div>
                                {/* <Filter column={header.column} /> */}
                              </div>
                            ) : null}
                          </>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {isLoading && <ListLoading />}
      </Card.Body>
        <Card.Footer className='p-1 pt-0'>
        <ListPagination />
        </Card.Footer>
    </Card>
  );
};