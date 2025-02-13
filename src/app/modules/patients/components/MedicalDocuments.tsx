import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ViewMedicalDocument, CreateMedicalDocument } from '../../general/components/MedicalDocument';

export const MedicalDocuments: React.FC = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        documentType: '',
        issueDate: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <Row>
            <Col xl={6} className='mb-5'>
                <ViewMedicalDocument />
            </Col>
            <Col xl={6} className='mb-5'>
                <ViewMedicalDocument />
            </Col>
            <Col xl={6} className='mb-5'>
                <CreateMedicalDocument />
            </Col>
        </Row>
    );
};