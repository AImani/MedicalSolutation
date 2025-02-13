import { InputField } from '@/_metronic/partials/controls';
import { Row, Col } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreatePatientDto } from '../@types';
import { Phones } from './Phones';

const ContantInfo: React.FC = () => {
  const { t } = useTranslation();
  const form = useFormContext<CreatePatientDto>();

  return (
    <>
      <Row>
        <Col lg={4} md={6} className='mb-2'>
          <InputField name="ContactInfo.Email" label={t('Fields.Email')} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col lg={6}>
          <Phones />
        </Col>
      </Row>
    </>
  );
};

export default ContantInfo;