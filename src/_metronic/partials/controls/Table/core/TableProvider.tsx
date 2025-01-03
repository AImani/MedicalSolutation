import { FC, useContext, useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from '@helpers/index'
import { useQueryRequest } from './QueryRequestProvider'

const TableContext = createResponseContext<any>(initialQueryResponse)

const TableProvider: FC<WithChildren> = ({ children }) => {
  const queryRequest = useQueryRequest()
  const state = useMemo(() => {
    return queryRequest?.state
  }, [queryRequest])
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = queryRequest?.queryFn(state)

  return (
    <TableContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
      {children}
    </TableContext.Provider>
  )
}

const useTable = () => useContext(TableContext)

const useTableData = () => {
  const { response } = useTable()!
  if (!response) {
    return []
  }

  return response?.Data?.Result || []
}

const useTablePagination = () => {
  const defaultPaginationState: PaginationState = {
    ...initialQueryState,
  }

  const { response } = useTable()!
  if (!response || !response.Data) {
    return defaultPaginationState
  }
  const {Result, ...paginationState} = response.Data;
  return {...defaultPaginationState, ...paginationState}
}

const useTableLoading = (): boolean => {
  const { isLoading } = useTable()!
  return isLoading
}

export {
  TableProvider,
  useTable,
  useTableData,
  useTablePagination,
  useTableLoading,
}
