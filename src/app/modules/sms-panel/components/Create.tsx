import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLayout } from '@/_metronic/layout/core'
import { Card, Form, Button } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'
import { CreateSmsGroupDto } from '../@types'
import { PageTitle } from '@/_metronic/layout/core'
import { InputField } from '@/_metronic/partials/controls'

export const Create: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setActions } = useLayout()

  const form = useForm<CreateSmsGroupDto>({
    defaultValues: {
      Name: '',
      Members: [],
      CreatedById: "0",
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      navigate('/sms-panel/groups')
    } catch (error) {
      console.error(error)
    }
  })

  setActions([
    <Button key="cancel" variant="secondary" size="sm" onClick={() => navigate('/sms-panel/groups')}>
      <i className="fas fa-arrow-left"></i> {t('Actions.Cancel')}
    </Button>,
    <Button key="save" variant="success" size="sm" onClick={onSubmit}>
      <i className="fas fa-check"></i> {t('Actions.Save')}
    </Button>,
  ])

  return (
    <FormProvider {...form}>
      <PageTitle>{t('Actions.Create')}</PageTitle>
      <Form onSubmit={onSubmit}>
        <Card>
          <Card.Body>
            <Form.Group className="mb-3">
              <InputField name="Name" label={t('Fields.Title')} />
            </Form.Group>
          </Card.Body>
        </Card>
        <Card className='mt-5'>
          <Card.Header>
            <Card.Title>{t('Fields.Members')}</Card.Title>
            <div className="card-toolbar gap-2">
              <Button variant="primary" size="sm" onClick={() => {}}>
                <i className="fas fa-plus"></i> {t('Actions.Add')}
              </Button>
              <Button variant="danger" size="sm" onClick={() => {}}>
                <i className="fas fa-trash"></i> {t('Actions.Remove')}
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <InputField name="Name" label={t('Fields.Title')} />
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
    </FormProvider>
  )
}