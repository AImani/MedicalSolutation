import { Button, Card, Form, Nav } from "react-bootstrap"
import Patient from "./Patient"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePatientDto } from "../@types";
import Address from "./Address";
import MedicalDocument from "./MedicalDocument";
import { Link } from "react-router-dom";
import ContantInfo from "./ContantInfo";

export const Create = () => {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState('Patient');
    const form = useForm<CreatePatientDto>({
        defaultValues: {
            FirstName: "مهرداد",
            LastName: "ایمانی",
            ContactInfo: {
                Email: "test",
                PhoneNumbers: [
                    { PhoneNumberValue: '09191830178' }
                ]
            }
        }
    });
    const onSubmit = form.handleSubmit((values) => {
        console.log(values)
    });

    return (
        <FormProvider {...form}>
            <Form onSubmit={onSubmit}>
                <Card>
                    <Card.Header className='min-h-auto py-2'>
                        <Nav
                            variant="tabs"
                            className='fs-4 align-self-end'
                            activeKey={activeTab}
                            onSelect={(k) => k && setActiveTab(k)}>
                            <Nav.Item className="pt-2">
                                <Nav.Link eventKey="Patient">{t('Patient.Title')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pt-2">
                                <Nav.Link eventKey="ContantInfo">{t('ContantInfo.Title')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pt-2">
                                <Nav.Link eventKey="Address">{t('Address.Title')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pt-2">
                                <Nav.Link eventKey="MedicalDocument">{t('MedicalDocument.Title')}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className='card-toolbar m-0 mt-2'>
                            <Button variant="success" onClick={() => setActiveTab('first')}>
                                <i className='fas fa-check'></i> {t('Actions.Save')}
                            </Button>
                            <Link className="btn btn-danger ms-2" to="/patients"><i className="fas fa-cancel"></i> {t('Actions.Cancel')}</Link>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {activeTab === 'Patient' && <Patient />}
                        {activeTab === 'ContantInfo' && <ContantInfo />}
                        {activeTab === 'Address' && <Address />}
                        {activeTab === 'MedicalDocument' && <MedicalDocument />}
                    </Card.Body>
                </Card>
            </Form>
        </FormProvider>
    )
}