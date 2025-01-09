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
        icon='element-11'
        title={t('MENU.DASHBOARD')}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/appointment-requests' title={t('Modules.AppointmentRequest')} hasBullet/>
      <SidebarMenuItem to='/appointments' title={t('Modules.Appointments')} hasBullet/>
      <SidebarMenuItem to='/patients' title={t('Modules.Patients')} hasBullet/>
      <SidebarMenuItem to='/doctors' title={t('Modules.Doctors')} hasBullet/>
      <SidebarMenuItem to='/insurance-companies' title={t('Modules.InsuranceCompanies')} hasBullet/>
      <SidebarMenuItem to='/sms-panel' title={t('Modules.SMSPanel')} hasBullet/>

      <SidebarMenuItemWithSub
        to='/basic-infos'
        title={t('Modules.BasicInfo')}
        icon='information'
        fontIcon='bi-information'
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
    </>
  )
}

export { SidebarMenuMain }
