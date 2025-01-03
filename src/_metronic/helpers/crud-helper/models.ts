import { PaginateResult } from '@/app/modules/general/@types'
import {Dispatch, SetStateAction} from 'react'

export type ID = undefined | null | number

export type PaginationState = {
  PageIndex: number;
  PageSize: number; //10 | 30 | 50 | 100
  TotalCount: number;
}

export type SortState = {
  OrderBy?: string[]
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}

export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  state: QueryState
  reCallState?: Function
  updateState: (updates: Partial<QueryState>) => void
  queryKey: string
  queryFn: Function
}

export const initialQueryState: QueryState = {
  PageIndex: 0,
  PageSize: 10,
  TotalCount: 0
}

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  reCallState: Function,
  updateState: () => {},
  queryFn: () => {},
  queryKey: '',
}

export type QueryResponseContextProps<T> = {
  response?: PaginateResult<T> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  isSelectable: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  isSelectable: false,
  disabled: false,
}
