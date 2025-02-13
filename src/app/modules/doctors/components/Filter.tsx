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
import { toast } from "react-toastify";
import { Link } from "react-router-dom"

export const CartableFilter = () => {
    const methods = useFormContext();
    const canWaitingForApprove = usePermission([{ ctrl: 'FinancialTransfers', action: 'WaitingForApprove' }]);
    const canApprove = usePermission([{ ctrl: 'FinancialTransfers', action: 'Approve' }]);
    const canReject = usePermission([{ ctrl: 'FinancialTransfers', action: 'Reject' }]);

    const { data: statuses } = useStatuses();
    const [selectableStatuses, setSelectableStatuses] = useState<any[]>([]);
    useEffect(() => {
        setSelectableStatuses([]);
        if (canWaitingForApprove || canApprove || canReject)
            setSelectableStatuses([{ value: null, label: 'همه' }]);
        if (canWaitingForApprove)
            setSelectableStatuses((prev) => [...prev, { value: 1, label: 'ثبت اولیه' }]);
        if (canApprove || canReject)
            setSelectableStatuses((prev) => [...prev, { value: 2, label: 'در انتظار تایید' }]);
    }, [statuses]);

    const queryClient = useQueryClient();
    const queryRequest = useQueryRequest();
    const { state, updateState } = useMemo(() => ({ state: queryRequest?.state, updateState: queryRequest?.updateState }), [queryRequest]);
    const listView = useListView();
    const [confirmReject, setConfirmReject] = useState<boolean>(false);
    const [confirmApprove, setConfirmApprove] = useState<boolean>(false);
    const [confirmWaitingForApprove, setConfirmWaitingForApprove] = useState<boolean>(false);

    const showReject = () => {
        if (listView?.selected.length == 0)
            toast.error('درخواستی انتخاب نشده است.');
        else
            setConfirmReject(true)
    };
    const showApprove = () => {
        if (listView?.selected.length == 0)
            toast.error('درخواستی انتخاب نشده است.');
        else
            setConfirmApprove(true);
    };
    const showWaitingForApprove = () => {
        if (listView?.selected.length == 0)
            toast.error('درخواستی انتخاب نشده است.');
        else
            setConfirmWaitingForApprove(true);
    };

    const onSubmit = methods.handleSubmit((values) => {
        methods.trigger(['ResponseFromDate', 'ResponseToDate'])
            .then((res) => {
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'FinancialTransfers' })
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
                                <SelectField
                                    name='StatusId'
                                    options={selectableStatuses}
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
                            <Col xs={'auto'} className='pt-5 mt-2'>
                                <Link type='button' className="btn btn-success" to='/doctors/create'>
                                    <KTIcon iconName='plus-square' iconType='solid' className='fs-2 me-2' /> {t('Actions.Add')}
                                </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Form>
            </Card>
        </>
    )
}