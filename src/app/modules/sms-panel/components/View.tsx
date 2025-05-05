import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useParams, useNavigate} from 'react-router-dom'
import {useLayout} from '@/_metronic/layout/core'
import {Card, Button} from 'react-bootstrap'
import {SmsGroupDto} from '../@types'
import {PageTitle} from '@/_metronic/layout/core'

export const View: React.FC = () => {
  const {t} = useTranslation()
  const {id} = useParams()
  const navigate = useNavigate()
  const {setActions} = useLayout()
  const [sms, setSms] = useState<SmsGroupDto | null>(null)

  useEffect(() => {
    // Add your fetch SMS logic here
  }, [id])

  setActions([
    <Button key="back" variant="secondary" size="sm" onClick={() => navigate('/sms-panel')}>
      <i className="fas fa-arrow-left"></i> {t('Actions.Back')}
    </Button>,
    <Button key="edit" variant="primary" size="sm" onClick={() => navigate(`/sms-panel/edit/${id}`)}>
      <i className="fas fa-edit"></i> {t('Actions.Edit')}
    </Button>,
  ])

  return (
    <>
      <PageTitle>{t('SmsPanel.View')}</PageTitle>
      <Card>
        <Card.Body>
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">{t('SmsPanel.Message')}:</div>
            <div className="col-md-9">{sms?.message}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">{t('SmsPanel.PhoneNumber')}:</div>
            <div className="col-md-9">{sms?.phoneNumber}</div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">{t('SmsPanel.Status')}:</div>
            <div className="col-md-9">{sms?.status}</div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}