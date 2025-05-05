import { KTIcon } from "@/_metronic/helpers"
import { SelectField, DatePickerField, InputField } from "@/_metronic/partials/controls"
import { t } from "i18next"
import { Card, Row, Col, InputGroup, Button, Form } from "react-bootstrap"
import { FormProvider, useFormContext } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { useQueryRequest } from "@/_metronic/partials/controls/Table"
import { useMemo } from "react"

export const CartableFilter = () => {
    const methods = useFormContext();

    const queryClient = useQueryClient();
    const queryRequest = useQueryRequest();
    const { state, updateState } = useMemo(() => ({ state: queryRequest?.state, updateState: queryRequest?.updateState }), [queryRequest]);

    const onSubmit = methods.handleSubmit((values) => {
        methods.trigger(['FromDate', 'ToDate'])
            .then((res) => {
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'SmsGroups' })
                    .finally(() => !!updateState && updateState({ ...state, ...values }));
            });
    })

    return (
        <>
            <Card className='mb-5'>
                <Form className='form form-label-right' onSubmit={onSubmit}>
                    <Card.Body className='p-5'>
                        <Row className='w-100 my-3 mx-0 me-auto'>
                            <Col md={6} lg={3} xl={3} xxl={2}>
                                <InputField name='Name' label={t('Fields.Title')} />
                            </Col>
                            {/* <Col md={6} lg={3} xl={3} xxl={2}>
                                <InputField name='PhoneNumber' label={t('Fields.PhoneNumber')} />
                            </Col> */}

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