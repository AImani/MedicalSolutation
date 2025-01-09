import { KTIcon } from "@/_metronic/helpers"
import { SelectField, DatePickerField } from "@/_metronic/partials/controls"
import { t } from "i18next"
import { Card, Row, Col, InputGroup, Button, Form } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import { useStatuses } from "../services/BasicInfoService"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useListView, useQueryRequest } from "@/_metronic/partials/controls/Table"
import usePermission from '../../auth/permissions/hook';
import toast from "react-hot-toast"

export const CartableFilter = () => {
    const methods = useFormContext();

    const { data: statuses } = useStatuses();
    const queryClient = useQueryClient();
    const queryRequest = useQueryRequest();

    const onSubmit = methods.handleSubmit((values) => {
        methods.trigger(['ResponseFromDate', 'ResponseToDate'])
            .then((res) => {
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'FinancialTransfers' })
                    // .finally(() => res && !!updateState && updateState({ ...state, ...values }));
            })
    })

    return (
        <>
            <Card className='mb-5'>
                <Form className='form form-label-right'>
                    <Card.Body className='p-5'>
                        <Row className='w-100 my-3 mx-0 me-auto'>
                            <Col md={6} lg={3} xl={2}>
                                <SelectField
                                    name='StatusId'
                                    options={[]}
                                    label={t('Financial.Report.Succeeded')}
                                />
                            </Col>
                            <Col md={6} lg={3} xl={2}>
                                <DatePickerField name='ResponseFromDate' label={t('Financial.Report.RequestFromDate')}
                                />
                            </Col>
                            <Col md={6} lg={3} xl={2}>
                                <DatePickerField name='ResponseToDate' label={t('Financial.Report.RequestToDate')} />
                            </Col>
                            <Col className='pe-0 pt-4 mt-2'>
                                <InputGroup size='sm'>
                                    <Button type='submit' variant='primary' onClick={onSubmit}>
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