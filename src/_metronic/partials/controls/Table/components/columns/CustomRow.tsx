import clsx from 'clsx'
import { FC } from 'react'
import { Row } from 'react-table'
import { useListView } from '../../core/ListViewProvider'

type Props = {
  row: Row<object & {Id: number}>
}

const CustomRow: FC<Props> = ({ row }) => {
  const sticky = ['actions']
  const listView = useListView()

  return (
    <tr {...row.getRowProps()}>
      <>
        {listView?.isSelectable && <td role="cell" className='ps-2'>
          <input type='checkbox' title='انتخاب' checked={listView.selected.some(x=>x == row.original.Id)}
            onChange={(e) => {
              if (e.target.checked || listView.isAllSelected)
                listView.onSelect(row.original.Id);
              else
                listView.onSelect(row.original.Id);
            }}
          />
        </td>
        }
        {row.cells.map((cell) => {
          return (
            <td
              style={{
                ...sticky.includes(cell.column.id) ? { left: 0, position: 'sticky', top: 0 } : {},
                ...cell.column.minWidth ? { minWidth: cell.column.minWidth } : {},
              }}
              {...cell.getCellProps()}
              className={clsx({ 'text-end min-w-100px td-actions': cell.column.id === 'actions' })}
            >
              {cell.render('Cell')}
            </td>
          )
        })}
      </>
    </tr>
  )
}

export { CustomRow }
