import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LayoutSplashScreen } from '@/_metronic/layout/core';
import { PatientStatuses } from './components/PatientStatus';
import { AppointmentPurposes } from './components/AppointmentPurpose';
import { AppointmentStatuses } from './components/AppointmentStatus';
import { AppointmentRequestStatuses } from './components/AppointmentRequestStatus';
import { DoctorStatuses } from './components/DoctorStatus';
import { DocumentTypes } from './components/DocumentType';
import { VisitReasons } from './components/VisitReason';
import { TreatmentTypees } from './components/TreatmentType';
import { PhoneNumberTypes } from './components/PhoneNumberType';
import { MedicalSpecialties } from './components/MedicalSpecialty';
import { MaritalStatuses } from './components/MaritalStatus';
import { ImageUsageTypes } from './components/ImageUsageType';
import { EducationLevels } from './components/EducationLevel';


const BasicInfoRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/appointment-purposes' Component={(props) => <AppointmentPurposes />} />
        <Route path='/appointment-request-status' Component={(props) => <AppointmentRequestStatuses />} />
        <Route path='/appointment-statuses' Component={(props) => <AppointmentStatuses />} />
        <Route path='/doctor-statuses' Component={(props) => <DoctorStatuses />} />
        <Route path='/document-types' Component={(props) => <DocumentTypes />} />
        <Route path='/education-levels' Component={(props) => <EducationLevels />} />
        <Route path='/image-usage-types' Component={(props) => <ImageUsageTypes />} />
        <Route path='/marital-statuses' Component={(props) => <MaritalStatuses />} />
        <Route path='/medical-specialties' Component={(props) => <MedicalSpecialties />} />
        <Route path='/patient-statuses' Component={(props) => <PatientStatuses />} />
        <Route path='/phone-number-types' Component={(props) => <PhoneNumberTypes />} />
        <Route path='/treatment-types' Component={(props) => <TreatmentTypees />} />
        <Route path='/visit-reasons' Component={(props) => <VisitReasons />} />
      </Routes>
    </Suspense>
  );
};

export default BasicInfoRoutes;
