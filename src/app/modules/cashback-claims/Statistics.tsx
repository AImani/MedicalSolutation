import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

export const Statistics = ({...props}: any) => {
  const {t} = useTranslation();
  return (
    <Row className='w-100'>
      <Col xl={4}>
        <p>
          {props.title}:<span className='fw-bolder text-info mx-3'>{props.statistics?.Total}</span>
        </p>
      </Col>
      <Col xl={8}>
        <span>
          <span className='ms-5'>
            {t('CashbackClaim.InitialSubmit')}:
            <span className='fw-bolder text-secondary text-dark mx-3'>
              {props.statistics?.InitialSubmitCount}
            </span>
          </span>
          <span>
            {t('CashbackClaim.Checking')}:
            <span className='fw-bolder text-warning mx-3'>{props.statistics?.CheckingCount}</span>
          </span>
          <span>
            {t('CashbackClaim.Accepted')}:
            <span className='fw-bolder text-success mx-3'>{props.statistics?.AcceptedCount}</span>
          </span>
          <span>
            {t('CashbackClaim.Rejected')}:
            <span className='fw-bolder text-danger mx-3'>{props.statistics?.RejectedCount}</span>
          </span>
        </span>
      </Col>
    </Row>
  );
};
