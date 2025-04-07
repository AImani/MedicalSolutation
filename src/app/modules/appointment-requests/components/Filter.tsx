import { KTIcon } from "@/_metronic/helpers"
import { SelectField, DatePickerField, InputField } from "@/_metronic/partials/controls"
import { t } from "i18next"
import { Card, Row, Col, InputGroup, Button, Form } from "react-bootstrap"
import { FormProvider, useFormContext } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { useQueryRequest } from "@/_metronic/partials/controls/Table"
import { useAppointmentRequestStatuses } from "../../basic-infos/services"
import { useMemo } from "react"

export const CartableFilter = () => {
    const methods = useFormContext();

    const { data: statuses } = useAppointmentRequestStatuses({ ...methods.getValues() } as any);
    const queryClient = useQueryClient();
    const queryRequest = useQueryRequest();
    const { state, updateState } = useMemo(() => ({ state: queryRequest?.state, updateState: queryRequest?.updateState }), [queryRequest]);

    const onSubmit = methods.handleSubmit((values) => {
        methods.trigger(['FromDate', 'ToDate'])
            .then((res) => {
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'AppointmentRequests' })
                    .finally(() => !!updateState && updateState({ ...state, ...values }));
            });
    })

    return (
        <>
            <Card className='mb-5'>
                <Form className='form form-label-right' onSubmit={onSubmit}>
                    <Card.Body className='p-5'>
                        <Row className='w-100 my-3 mx-0 me-auto'>
                            <Col md={6} lg={3} xl={3}>
                                <SelectField
                                    name='AppointmentRequestStatusId'
                                    options={statuses?.Data.Result.map(x => ({ value: x.Id, label: x.Title }))}
                                    label={t('Fields.AppointmentRequestStatus')}
                                />
                            </Col>
                            <Col md={6} lg={3} xl={3}>
                                <InputField name='PatientName' label={t('Fields.PatientName')} />
                            </Col>
                            <Col md={6} lg={3} xl={3}>
                                <InputField name='PhoneNumber' label={t('Fields.PhoneNumber')} />
                            </Col>
                        </Row>
                        <Row className='w-100 my-3 mx-0 me-auto'>
                            <Col md={6} lg={3} xl={3}>
                                <DatePickerField name='FromDate' label={t('Fields.FromDate')} />
                            </Col>
                            <Col md={6} lg={3} xl={3}>
                                <DatePickerField name='ToDate' label={t('Fields.ToDate')} />
                            </Col>
                            <Col className='pe-0 pt-4 mt-2'>
                                <InputGroup size='sm'>
                                    <Button type='submit' variant='primary'>
                                        <KTIcon iconName='magnifier' iconType='solid' className='fs-2' />{' '}
                                        {t('Actions.Search')}
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Form>
            </Card>
        </>
    )
}