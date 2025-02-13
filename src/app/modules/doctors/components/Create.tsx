import { Button, Card, Form, Nav } from "react-bootstrap"
import Doctor from "./Doctor"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CreateDoctorDto } from "../@types";
import { Address } from "../../general/components";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
// import { createDoctorSchema } from "../services/SchemaValidation";
import { PageTitle, useLayout } from "@/_metronic/layout/core";

export const Create = () => {
    const { t } = useTranslation()
    const { setActions } = useLayout()

    const [activeTab, setActiveTab] = useState('ContantInfo');

    const form = useForm<CreateDoctorDto>({
        defaultValues: {
            FirstName: "مهرداد",
            LastName: "ایمانی",
        },
        // resolver: yupResolver<any>(createDoctorSchema)
    });
    const { errors } = form.formState;
    const onSubmit = form.handleSubmit((values) => {
        console.log(values)
    });

    setActions(
        [
            <Link className="btn btn-sm btn-secondary" to="/doctors"><i className="fas fa-arrow-right">
            </i> {t('Actions.Cancel')}
            </Link>,
            <Button variant="success" size="sm" onClick={onSubmit}>
                <i className='fas fa-check'></i> {t('Actions.Save')}
            </Button>,
        ]
    )

    return (
        <FormProvider {...form}>
            <PageTitle>{t('Doctor.Singular')}</PageTitle>
            <Form onSubmit={onSubmit}>
                <Card>
                    <Card.Body className="p-5 pb-0">
                        <Doctor />
                        <Nav
                            variant="tabs"
                            className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold mt-2'
                            activeKey={activeTab}
                            onSelect={(k) => k && setActiveTab(k)}>
                            <Nav.Item className="pt-2">
                                <Nav.Link eventKey="ContantInfo">{t('ContantInfo.Title')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pt-2">
                                <Nav.Link eventKey="Address">{t('Fields.Address')}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pt-2">
                                <Nav.Link eventKey="MedicalDocument">{t('MedicalDocument.Title')}</Nav.Link>
                            </Nav.Item>
                            <div className='card-toolbar m-0 my-3 ms-auto'>
                                <Button variant="success" size="sm" onClick={onSubmit}>
                                    <i className='fas fa-check'></i> {t('Actions.Save')}
                                </Button>
                                <Link className="btn btn-sm btn-secondary ms-2" to="/doctors"><i className="fas fa-arrow-right"></i> {t('Actions.Cancel')}</Link>
                            </div>
                        </Nav>
                    </Card.Body>
                </Card>
                <Card className="mt-5">
                    <Card.Body>
                        {activeTab === 'Address' && <Address />}
                    </Card.Body>
                </Card>
            </Form>
        </FormProvider>
    )
}