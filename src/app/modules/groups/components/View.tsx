import { Button, Card, Form, Nav } from "react-bootstrap"
import Group from "./Group"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CreateGroupDto, GroupDto } from "../@types";
import { MedicalDocuments } from "./MedicalDocuments";
import { Link, useParams } from "react-router-dom";
import ContantInfo from "./Users";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroupSchema } from "../services/SchemaValidation";
import { PageTitle, useLayout } from "@/_metronic/layout/core";
import { Address } from "../../general/components";
import { mutCreateGroup, useGroup } from "../services/GroupService";
import { Placeholder } from "./Placeholder";

export const View = () => {
    const { t } = useTranslation()
    const { setActions } = useLayout()
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('ContantInfo');
    const { mutateAsync: createAsync } = mutCreateGroup();
    const { data: patient, isLoading, isError } = useGroup(id ? +id : undefined);
    const form = useForm<GroupDto>({
        defaultValues: patient?.Data || {} as GroupDto
    });
    useEffect(() => {
        if (patient && patient.Data) {
            form.reset(patient.Data);
        }
    }, [patient])
    setActions(
        [
            <Link className="btn btn-sm btn-secondary" to="/patients"><i className="fas fa-arrow-right">
            </i> {t('Actions.Cancel')}
            </Link>,
            // <Button variant="success" size="sm" onClick={onSubmit}>
            //     <i className='fas fa-check'></i> {t('Actions.Save')}
            // </Button>,
        ]
    )

    return (
        <>{isLoading ? (
            <Placeholder />
        ) : (
            <FormProvider {...form}>
                <PageTitle>{t('Groups.Singular')}</PageTitle>
                <Form>
                    <Card>
                        <Card.Body className="p-5 pb-0">
                            <Group />
                            <Nav
                                variant="tabs"
                                className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold mt-2'
                                activeKey={activeTab}
                                onSelect={(k) => k && setActiveTab(k)}>
                                <Nav.Item className="pt-2">
                                    <Nav.Link eventKey="ContantInfo">{t('ContantInfo.Singular')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pt-2">
                                    <Nav.Link eventKey="Address">{t('Address.Singular')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pt-2">
                                    <Nav.Link eventKey="MedicalDocuments">{t('MedicalDocument.Plural')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pt-2">
                                    <Nav.Link eventKey="Appointments">{t('Appointment.Plural')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pt-2">
                                    <Nav.Link eventKey="VisitHistories">{t('VisitHistory.Plural')}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="pt-2">
                                    <Nav.Link eventKey="Bills">{t('Bill.Plural')}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Body>
                    </Card>
                    <Card className="mt-5">
                        <Card.Body>
                            {activeTab === 'ContantInfo' && <ContantInfo />}
                            {activeTab === 'Address' && <Address />}
                            {activeTab === 'MedicalDocuments' && <MedicalDocuments />}
                        </Card.Body>
                    </Card>
                </Form>
            </FormProvider>
        )}
        </>
    )
}