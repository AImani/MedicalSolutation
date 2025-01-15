import { useTranslation } from 'react-i18next';
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const { t } = useTranslation();
console.log("t('Modules.AppointmentRequest') > ", t('Modules.AppointmentRequest'));

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        title={t('MENU.DASHBOARD')}
        fontIcon='table-columns'
      />
      <SidebarMenuItem to='/appointment-requests' title={t('Modules.AppointmentRequest')} fontIcon='bell'/>
      <SidebarMenuItem to='/appointments' title={t('Modules.Appointments')} fontIcon='calendar-check'/>
      <SidebarMenuItem to='/patients' title={t('Modules.Patients')} fontIcon='user'/>
      <SidebarMenuItem to='/doctors' title={t('Modules.Doctors')} fontIcon='user-doctor'/>
      <SidebarMenuItem to='/insurance-companies' title={t('Modules.InsuranceCompanies')} fontIcon='hospital'/>
      
      <SidebarMenuItemWithSub
        to='/sms-panel'
        title={t('Modules.SMSPanel')}
        fontIcon='message'
      >
        <SidebarMenuItem to='/sms-panel/messages' title={t('Modules.Messages')} fontIcon='sms'/>
        <SidebarMenuItem to='/sms-panel/groups' title={t('Modules.Groups')} fontIcon='users'/>
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/basic-infos'
        title={t('Modules.BasicInfo')}
        fontIcon='heart-pulse'
      >
        <SidebarMenuItem to='/basic-infos/appointment-purpose' title={t('BasicInfo.AppointmentPurpose')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/appointment-request-status' title={t('BasicInfo.AppointmentRequestStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/appointment-status' title={t('BasicInfo.AppointmentStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/doctor-status' title={t('BasicInfo.DoctorStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/document-type' title={t('BasicInfo.DocumentType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/education-level' title={t('BasicInfo.Educationlevel')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/image-usage-type' title={t('BasicInfo.ImageUsageType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/marital-status' title={t('BasicInfo.MaritalStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/medical-specialty' title={t('BasicInfo.MedicalSpecialty')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/patient-status' title={t('BasicInfo.PatientStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/phone-number-type' title={t('BasicInfo.PhoneNumberType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/treatment-type' title={t('BasicInfo.TreatmentType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-infos/visit-reason' title={t('BasicInfo.VisitReason')} hasBullet={true}  />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem to='/settings' title={t('Modules.Setting')} fontIcon='gear'/>
    </>
  )
}

export { SidebarMenuMain }
