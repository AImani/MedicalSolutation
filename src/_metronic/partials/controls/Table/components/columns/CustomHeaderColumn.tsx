import {FC} from 'react'
import {ColumnInstance} from 'react-table'

type Props = {
  column: ColumnInstance<object>,
}

const CustomHeaderColumn: FC<Props> = ({column}) => {
  const sticky = ['actions']
  return (
  <>
    {column.Header && typeof column.Header === 'string' ? <th style={{...sticky.includes(column.id) ? { left:  0, position: 'sticky', top: 0 } : {}, ...column.minWidth ? {minWidth: column.minWidth}: {}}} className='ps-2' {...column.getHeaderProps()}>{column.render('Header')}</th> : column.render('Header')}
  </>
)}

export {CustomHeaderColumn}
