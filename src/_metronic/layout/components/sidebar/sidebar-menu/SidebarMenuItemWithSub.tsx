import React from 'react'
import clsx from 'clsx'
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

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
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
        <div
          className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
          data-kt-menu-trigger='click'
        >
          <span className='menu-link'>
            {hasBullet && (
              <span className='menu-bullet'>
                <span className='bullet bullet-dot'></span>
              </span>
            )}
            {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
              <span className='menu-icon'>
                <KTIcon iconName={icon} className='fs-2' />
              </span>
            )}
            {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
              <i className={clsx('fas fs-3 me-2 ', 'fa-' + fontIcon )}></i>
            )}
            <span className='menu-title'>{title}</span>
            <span className='menu-arrow'></span>
          </span>
          <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export { SidebarMenuItemWithSub }
