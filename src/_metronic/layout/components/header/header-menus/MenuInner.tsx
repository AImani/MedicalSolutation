import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import { usePageData } from '@/_metronic/layout/core'

export function MenuInner() {
  const intl = useIntl()
  const {pageTitle} = usePageData()
  
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      {/* <h3 className='py-3 align-content-center'>{pageTitle}</h3> */}
    </>
  )
}
