import { KTIcon } from "@/_metronic/helpers"
import { SelectField, DatePickerField, InputField } from "@/_metronic/partials/controls"
import { t } from "i18next"
import { Card, Row, Col, InputGroup, Button, Form } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import { useStatuses } from "../services/BasicInfoService"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useListView, useQueryRequest } from "@/_metronic/partials/controls/Table"
import usePermission from '../../auth/permissions/hook';
import { toast } from "react-toastify";

export const CartableFilter = () => {
    const methods = useFormContext();

    const queryClient = useQueryClient();
    const queryRequest = useQueryRequest();
    const { state, updateState } = useMemo(() => ({ state: queryRequest?.state, updateState: queryRequest?.updateState }), [queryRequest]);
    const listView = useListView();


    const onSubmit = methods.handleSubmit((values) => {
        methods.trigger(['ResponseFromDate', 'ResponseToDate'])
            .then((res) => {
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'InsuranceCompanies' })
                    .finally(() => res && !!updateState && updateState({ ...state, ...values }));
            })
    })

    return (
        <>
            <Card className='mb-5'>
                <Form className='form form-label-right'>
                    <Card.Body className='p-5'>
                        <Row className='w-100 my-3 mx-0 me-auto'>
                            <Col md={6} lg={3} xl={2}>
                                <InputField name='Name' label={t('InsuranceCompany.Name')}/>
                            </Col>
                            <Col md={6} lg={3} xl={2}>
                                <InputField name='PhoneNumber' label={t('InsuranceCompany.PhoneNumber')}/>
                            </Col>
                            <Col md={6} lg={3} xl={2}>
                                <InputField name='Email' label={t('InsuranceCompany.Email')}/>
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