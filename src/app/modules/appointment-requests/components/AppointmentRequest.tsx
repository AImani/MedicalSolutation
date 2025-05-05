import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DatePickerField, InputField, SelectField } from '@/_metronic/partials/controls';
import { useAppointmentRequestStatuses } from '../../basic-infos/services';

const AppointmentRequest: React.FC = () => {
    const { t } = useTranslation();
    const { data: appointmentRequestStatuses } = useAppointmentRequestStatuses({} as any);

    return (
        <Row>
            <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>
                <InputField name="PatientName" label={t('Fields.PatientName')} />
            </Col>
            <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>
                <InputField name="PhoneNumber" label={t('Fields.PhoneNumber')} />
            </Col>
            <Col xl={4} lg={6} md={6} className='mb-2'>
                <DatePickerField name="AppointmentDate" hasTime label={t('Fields.AppointmentDate')} />
            </Col>
            <Col xl={4} lg={6} md={6} className='mb-1'>
                <InputField name="Description" label={t('Fields.Description')} />
            </Col>
            <Col xl={4} lg={6} md={6} className='mb-1'>
                <SelectField
                    name="AppointmentRequestStatusId"
                    label={t('Fields.StatusNameOf', { 0: t('AppointmentRequest.Singular') })}
                    options={appointmentRequestStatuses?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
            </Col>
        </Row>
    );
};

export default AppointmentRequest;