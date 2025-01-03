import { QueryState, initialQueryState } from '@helpers/index'
import clsx from 'clsx'
import { FC, PropsWithChildren, useMemo } from 'react'
import { HeaderProps } from 'react-table'

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<object>>
  queryState: { state: QueryState, updateState(updates: Partial<QueryState>): void }
}
const UserCustomHeader: FC<Props> = ({ className, title, tableProps, queryState }) => {
  const id = tableProps.column.id
  const { state, updateState } = queryState

  const isSelectedForSorting = useMemo(() => {
    return state.OrderBy && state.OrderBy.length > 0
  }, [state, id])
  const order: string[] | undefined = useMemo(() => state.OrderBy, [state])

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({ OrderBy: ['asc'], ...initialQueryState })
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order.length > 0) {
        // enable sort desc
        updateState({ OrderBy: ['desc'], ...initialQueryState })
        return
      }

      // disable sort
      updateState({ OrderBy: undefined, ...initialQueryState })
    }
  }

  return (
    <th
      {...tableProps.column.getHeaderProps()}
      className={clsx(
        className,
        isSelectedForSorting && order !== undefined && `table-sort-${order}`,
        'ps-2'
      )}
      style={{ cursor: 'pointer' }}
      onClick={sortColumn}
    >
      {title}
    </th>
  )
}

export { UserCustomHeader }
