import { Button, Card, Form, Nav } from "react-bootstrap"
import Patient from "./Patient"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePatientDto } from "../@types";
import { ContantInfo } from "./ContantInfo";
import Address from "./Address";
import MedicalDocument from "./MedicalDocument";

export const Create = () => {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState('Patient');
    const form = useForm<CreatePatientDto>();
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
                            <Nav.Item>
                                <Nav.Link eventKey="ContantInfo">{t('ContantInfo.Title')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Address">{t('Address.Title')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="MedicalDocument">{t('MedicalDocument.Title')}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div className='card-toolbar m-0 mt-2'>
                            <Button variant="success" onClick={() => setActiveTab('first')}>
                                <i className='fa fa-check'></i> {t('Actions.Save')}
                            </Button>
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