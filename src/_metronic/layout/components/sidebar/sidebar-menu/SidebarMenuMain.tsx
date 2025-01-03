import { useTranslation } from 'react-i18next';
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const { t } = useTranslation();
console.log("t('Modules.AppointmentRequest') > ", t('Modules.AppointmentRequest'));

  return (
    <>
      <SidebarMenuItem
        to='/'
        icon='element-11'
        title={t('MENU.DASHBOARD')}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/appointment-requests' title={t('Modules.AppointmentRequest')} hasBullet/>
      <SidebarMenuItem to='/appointment-requests' title={t('Modules.Appointments')} hasBullet/>
      <SidebarMenuItem to='/appointment-requests' title={t('Modules.Patients')} hasBullet/>
      <SidebarMenuItem to='/appointment-requests' title={t('Modules.Doctors')} hasBullet/>
    </>
  )
}

export { SidebarMenuMain }
