import { Col, InputGroup, Modal, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { useAppointmentRequest } from "../services/CoreService";
import moment from 'jalali-moment';
import { Button, UsageOption, UsageSelector } from "@/_metronic/partials/controls";
import { useState } from "react";
import { QuickAppointment } from "../../appointments/components/QuickAppointment";

export interface ViewModalProps {
    show: boolean;
    onHide: () => void;
    id?: number;
}

export const View = ({ show, onHide, id }: ViewModalProps) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<string>('1');
    const { data: patient, isLoading, isError } = useAppointmentRequest(id ? +id : undefined);

    const defaultOptions: UsageOption[] = [
        {
            value: '1',
            title: 'تایید و ایجاد نوبت',
            description: 'Withdraw money to your bank account per transaction under $50,000 budget',
            defaultChecked: true,
        },
        {
            value: '2',
            title: 'رد نوبت',
            description: 'Withdraw money to your bank account per transaction under $50,000 budget',
        },
        {
            value: '3',
            title: 'لغو توسط بیمار',
            description: 'Withdraw money to your bank account per transaction under $50,000 budget',
        },
    ];

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{t('Messages.ShowOf', { 0: t('AppointmentRequest.Singular') })}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6} className='mb-2 d-none d-sm-block'>
                        <label>{t('Fields.PatientName')}</label>
                        <label className="form-control">{patient?.Data?.PatientName}&nbsp;</label>
                    </Col>
                    <Col md={6} className='mb-2'>
                        <label>{t('Fields.AppointmentDate')}</label>
                        <InputGroup>
                            <label className="form-control text-end">{
                                !!patient?.Data?.AppointmentDate
                                    ? moment
                                        .from(patient?.Data?.AppointmentDate, "en")
                                        .format('hh:mm:ss')
                                    : ''
                            }&nbsp;</label>
                            <label className="form-control text-end">{
                                !!patient?.Data?.AppointmentDate
                                    ? moment
                                        .from(patient?.Data?.AppointmentDate, "en")
                                        .format('jYYYY/jMM/jDD')
                                    : ''
                            }&nbsp;</label>
                        </InputGroup>
                    </Col>
                    <Col md={6} className='mb-1'>
                        <label>{t('Fields.AppointmentRequestStatus')}</label>
                        <label className="form-control">{patient?.Data?.AppointmentRequestStatus.Title}&nbsp;</label>
                    </Col>
                    <Col md={6} className='mb-2 d-none d-sm-block'>
                        <label>{t('Fields.PhoneNumber')}</label>
                        <InputGroup>
                            <label className="form-control text-end">{patient?.Data?.PhoneNumber}&nbsp;</label>
                            <a className="btn btn-light-primary border border-gray-300 px-5" href={`tel:${patient?.Data?.PhoneNumber}`}><i className="fas fa-phone fs-5"></i></a>
                        </InputGroup>
                    </Col>
                    <Col md={12} className='mb-1'>
                        <label>{t('Fields.Description')}</label>
                        <label className="form-control min-h-100px">{patient?.Data?.Description}&nbsp;</label>
                    </Col>
                    <Col md={12} className='mt-2'>
                        <UsageSelector
                            options={defaultOptions}
                            initialValue="1" // Optional: sets initial selected value
                            onChange={(value) => setStatus(value)} // Optional: callback for when the value changes
                        />
                    </Col>
                    <Col md={12}>
                        {status === '1' && (
                            <QuickAppointment />
                        )}
                        {status === '2' && (<>
                            <label htmlFor="Description">دلیل رد</label>
                            <textarea className="form-control" id="Description" name="Description" />
                        </>)}
                        {status === '3' && (<>
                            <label htmlFor="Description">دلیل لغو</label>
                            <textarea className="form-control" id="Description" name="Description" />
                        </>)}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <InputGroup className="w-100">
                    <Button className="btn btn-success">{t('Actions.Ok')}</Button>
                    <Button className="btn btn-secondary" onClick={onHide}>{t('Actions.Close')}</Button>
                </InputGroup>
            </Modal.Footer>
        </Modal>
    );
}
