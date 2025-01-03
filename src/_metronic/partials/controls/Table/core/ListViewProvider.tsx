import { FC, useState, createContext, useContext, useMemo } from 'react'
import {
  ID,
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  initialListView,
  ListViewContextProps,
  groupingOnSelectAll,
  WithChildren,
} from '@helpers/index'
import { useQueryResponse } from './QueryResponseProvider'

const ListViewContext = createContext<ListViewContextProps | null>(null)
const ListViewConsumer = ListViewContext.Consumer

const ListViewProvider: FC<WithChildren & { isSelectable?: boolean }> = ({ children, isSelectable = false }) => {
  const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
  const { isLoading } = useQueryResponse() || { isLoading: false }
  const reponseContext = useQueryResponse();
  const data = reponseContext.response?.Data
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data?.Result), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data?.Result, selected), [data, selected])

  return (
    <ListViewContext.Provider
      value={{
        selected,
        itemIdForUpdate,
        setItemIdForUpdate,
        disabled,
        isAllSelected,
        isSelectable,
        onSelect: (id: ID) => {
          groupingOnSelect(id, selected, setSelected)
        },
        onSelectAll: () => {
          groupingOnSelectAll(isAllSelected, setSelected, data?.Result?.map(x => x.Id) || [])
          setSelected(data?.Result?.map(x => x.Id) || [])
        },
        clearSelected: () => {
          setSelected([])
          groupingOnSelectAll(isAllSelected, setSelected, [])
        },
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useListView = () => useContext(ListViewContext)

export { ListViewProvider, useListView, ListViewConsumer }
