import { FC, useContext, useState, useEffect, useMemo } from 'react'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  stringifyRequestQuery,
  WithChildren,
} from '@helpers/index'
import { useQueryRequest } from './QueryRequestProvider'

const QueryResponseContext = createResponseContext<object & { Id: number }>(initialQueryResponse)
const QueryResponseConsumer = QueryResponseContext.Consumer

const QueryResponseProvider: FC<WithChildren & { queryKey: string, queryFn: Function }> = ({ children, queryKey, queryFn }) => {
  const queryRequest = useQueryRequest()
  const state = useMemo(() => queryRequest?.state, [queryRequest])
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery)
      setQuery(updatedQuery)
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data,
  } = queryFn(queryRequest?.state)

  return (
    <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response: data, query }}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const { response } = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.Data
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    ...initialQueryState
  }

  const { response } = useQueryResponse() || { response: null }
  if (!response || !response.Data) {
    return defaultPaginationState
  }

  const { Result, ...paginationState } = response.Data;

  return paginationState
}

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse() || { isLoading: false }
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
  QueryResponseConsumer
}
