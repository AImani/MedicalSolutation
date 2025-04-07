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
        to='/reports'
        title={t('Modules.Accounting')}
        fontIcon='calculator'
      >
        
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/reports'
        title={t('Modules.Warhousing')}
        fontIcon='warehouse'
      >
        
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/reports'
        title={t('Modules.Reporting')}
        fontIcon='envelope-open-text'
      >
        
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/basic-info'
        title={t('Modules.BasicInfo')}
        fontIcon='heart-pulse'
      >
        <SidebarMenuItem to='/basic-info/appointment-purposes' title={t('BasicInfo.AppointmentPurpose')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/appointment-request-status' title={t('BasicInfo.AppointmentRequestStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/appointment-statuses' title={t('BasicInfo.AppointmentStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/doctor-statuses' title={t('BasicInfo.DoctorStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/document-types' title={t('BasicInfo.DocumentType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/education-levels' title={t('BasicInfo.EducationLevel')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/image-usage-types' title={t('BasicInfo.ImageUsageType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/marital-statuses' title={t('BasicInfo.MaritalStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/medical-specialties' title={t('BasicInfo.MedicalSpecialty')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/patient-statuses' title={t('BasicInfo.PatientStatus')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/phone-number-types' title={t('BasicInfo.PhoneNumberType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/treatment-types' title={t('BasicInfo.TreatmentType')} hasBullet={true}  />
        <SidebarMenuItem to='/basic-info/visit-reasons' title={t('BasicInfo.VisitReason')} hasBullet={true}  />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem to='/settings' title={t('Modules.Setting')} fontIcon='gear'/>
    </>
  )
}

export { SidebarMenuMain }
