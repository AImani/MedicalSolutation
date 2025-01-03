import { QueryState } from "@helpers/index"
import { Table } from "./Table"
import { ListViewProvider } from "./core/ListViewProvider"
import { QueryRequestProvider } from "./core/QueryRequestProvider"
import { QueryResponseProvider } from "./core/QueryResponseProvider"
import { Column } from "react-table"

export type ListProps = {
  preState: QueryState
  reCallState: Function
  columns: ReadonlyArray<Column<any>>
  queryKey: string
  queryFn: Function
}

const List = ({ ...props }: ListProps) => (
  <QueryRequestProvider preState={props.preState} reCallState={props.reCallState} queryFn={props.queryFn} queryKey={props.queryKey}>
    <QueryResponseProvider queryKey={props.queryKey} queryFn={props.queryFn}>
      <ListViewProvider>
        <Table columns={props.columns} />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { List }