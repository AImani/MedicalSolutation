import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

export const Placeholder: React.FC = () => {
    return (
        <Card className='placeholder-glow'>
            <Card.Body>
                <Row>
                    <Col md={4} xl="auto">
                        <Row>
                            <Col xs="auto" className='placeholder me-0 mb-4 symbol symbol-100px symbol-lg-180px symbol-md-200px symbol-fixed position-relative border border-gray-300 cursor-pointer'><img /></Col>
                            <Col className='d-md-none'>
                                <Row>
                                    <Col xs={12} className='mb-2'><label className='form-control placeholder h-45px'></label></Col>
                                    <Col xs={12} className='mb-2'><label className='form-control placeholder h-45px'></label></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xl={4} lg={6} md={6} className='mb-4 d-none d-sm-block'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                            <Col xl={4} lg={6} md={6} className='mb-4 d-none d-sm-block'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                            <Col xl={4} lg={6} md={6} className='mb-4'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                            <Col xl={4} lg={6} md={6} className='mb-4'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                            <Col xl={4} lg={6} md={6} className='mb-4'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                            <Col xl={4} lg={6} md={6} className='mb-4'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                            <Col xl={4} lg={6} md={6} className='mb-4'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                            <Col xl={4} lg={6} md={6} className='mb-4'>
                                <label className='form-control placeholder h-45px'></label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};