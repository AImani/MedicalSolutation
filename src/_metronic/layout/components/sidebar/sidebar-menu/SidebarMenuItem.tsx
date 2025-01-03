import { FC } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { checkIsActive, KTIcon, WithChildren } from '../../../../helpers'
import { useLayout } from '../../../core'
import { AccessDto } from '@/app/modules/auth'
import usePermission from '@/app/modules/auth/permissions/hook'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  permissions?: AccessDto[]
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  permissions
}) => {
  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { app } = config
  let hasPermission: boolean = permissions ? usePermission(permissions) : true;

  return (
    <>
      {hasPermission ? (
        <div className='menu-item'>
          <Link className={clsx('menu-link without-sub', { active: isActive })} to={to}>
            {hasBullet && (
              <span className='menu-bullet'>
                <span className='bullet bullet-dot'></span>
              </span>
            )}
            {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
              <span className='menu-icon'>
                {' '}
                <KTIcon iconName={icon} className='fs-2' />
              </span>
            )}
            {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
              <i className={clsx('bi fs-3', fontIcon)}></i>
            )}
            <span className='menu-title'>{title}</span>
          </Link>
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export { SidebarMenuItem }
