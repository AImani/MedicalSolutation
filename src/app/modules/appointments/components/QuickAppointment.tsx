import { useLayout } from "@/_metronic/layout/core";
import { InputField } from "@/_metronic/partials/controls";
import { useState } from "react";
import { Col, InputGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const QuickAppointment = () => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [showFilter, setShowFilter] = useState(true);
    const [id, setId] = useState<number>();
    const { setActions } = useLayout()
    setActions(
        [
            <button
                className='btn btn-sm fw-bold btn-secondary'
                onClick={() => setShowFilter((_prev) => !_prev)}
            >
                <i className='fas fa-filter'></i>
                {t('Actions.Filter')}
            </button>
        ]
    );

    const handleShow = (id: number) => {
        setId(id);
        setShow(true);
    };
    const handleHide = () => {
        setId(undefined);
        setShow(false);
    }
    return (
        <>
            <Row>
                <Col>
                    <InputGroup>
                        <InputGroup.Text>
                            <label className="label-control">بیمار</label>
                        </InputGroup.Text>
                        <label className="form-control bg-gray-200"><i className="fas fa-user"></i> مهرداد ایمانی</label>
                        <label className="form-control bg-gray-200"><i className="fas fa-phone me-2"></i> 09191830178</label>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup>
                        <InputGroup.Text>
                            <label className="label-control">بیمار</label>
                        </InputGroup.Text>
                        <label className="form-control d-flex align-items-center">
                            <i className="fas fa-user me-2"></i>
                            <input type="text" className="form-control border-0 p-0" placeholder="نام بیمار" />
                        </label>
                        <label className="form-control d-flex align-items-center">
                            <i className="fas fa-phone me-2"></i>
                            <input type="text" className="form-control border-0 p-0" placeholder="شماره تماس" />
                        </label>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup>
                        <InputGroup.Text>
                            <label className="label-control">نوبت</label>
                        </InputGroup.Text>
                        <label className="form-control bg-gray-200"><i className="fas fa-stethoscope"></i> مهرداد ایمانی</label>
                        <label className="form-control bg-gray-200"><i className="fas fa-calendar-days me-2"></i> 09191830178</label>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup>
                        <InputGroup.Text>
                            <label className="label-control">نوبت</label>
                        </InputGroup.Text>
                        <label className="form-control d-flex align-items-center">
                            <i className="fas fa-stethoscope me-2"></i>
                            <input type="text" className="form-control border-0 p-0" placeholder="نام بیمار" />
                        </label>
                        <label className="form-control d-flex align-items-center">
                            <i className="fas fa-calendar-days me-2"></i>
                            <input type="text" className="form-control border-0 p-0" placeholder="شماره تماس" />
                        </label>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}