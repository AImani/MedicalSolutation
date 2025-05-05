import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import {useLayout} from '@/_metronic/layout/core'
import {Card, Form, Button} from 'react-bootstrap'
import {useForm, FormProvider} from 'react-hook-form'
import {UpdateSmsGroupDto} from '../@types/SmsGroupDto'
import {PageTitle} from '@/_metronic/layout/core'

export const Modify: React.FC = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const {id} = useParams()
  const {setActions} = useLayout()

  const form = useForm<UpdateSmsGroupDto>({
    defaultValues: {
      Id: Number(id),
      Name: '',
      Members: [],
    },
  })

  useEffect(() => {
    // Add your fetch SMS logic here
  }, [id])

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      // Add your update SMS logic here
      navigate('/sms-panel')
    } catch (error) {
      console.error(error)
    }
  })

  setActions([
    <Button key="cancel" variant="secondary" size="sm" onClick={() => navigate('/sms-panel')}>
      <i className="fas fa-arrow-left"></i> {t('Actions.Cancel')}
    </Button>,
    <Button key="save" variant="success" size="sm" onClick={onSubmit}>
      <i className="fas fa-check"></i> {t('Actions.Save')}
    </Button>,
  ])

  return (
    <FormProvider {...form}>
      <PageTitle>{t('SmsPanel.Edit')}</PageTitle>
      <Form onSubmit={onSubmit}>
        <Card>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>{t('SmsPanel.Message')}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...form.register('message')}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('SmsPanel.PhoneNumber')}</Form.Label>
              <Form.Control
                type="text"
                {...form.register('phoneNumber')}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
    </FormProvider>
  )
}