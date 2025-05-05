import { PageTitle, useLayout } from '@/_metronic/layout/core';
import { ImageInput, InputField, TextAreaField } from '@/_metronic/partials/controls';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { ProfileImage } from '../../general/components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CreateInsuranceCompanyDto, InsuranceCompanyDto, UpdateInsuranceCompanyDto } from '../@types';
import { mutCreateInsuranceCompany, mutUpdateInsuranceCompany, useInsuranceCompany } from '../services/InsuranceCompanyService';
import { Id, toast } from 'react-toastify';
import { Placeholder } from '../../patients/components/Placeholder';

const insuranceCompanySchema = yup.object({
    Name: yup.string().required('نام شرکت الزامی است'),
    Address: yup.string().required('آدرس الزامی است'),
    PhoneNumber: yup.string().required('شماره تلفن الزامی است').matches(/^(\+98|0)\d{10}$/, {
        message: 'شماره تلفن باید معتبر باشد.',
    }),
});

interface InsuranceCompanyFormProps {
    onSubmit: (data: yup.InferType<typeof insuranceCompanySchema> & { imageFile?: File | null }) => void; // Added imageFile
    initialValues?: yup.InferType<typeof insuranceCompanySchema>;
    isEditing?: boolean;
}

export const InsuranceCompany = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const navigate = useNavigate()
    const { setActions } = useLayout()
    const [actionId, setActionId] = useState<Id>()

    const { data: insuranceCompany, isLoading } = useInsuranceCompany(id);
    useEffect(() => {
        if (insuranceCompany?.Data) {
            form.reset(insuranceCompany.Data as InsuranceCompanyDto)
        }
    }
        , [insuranceCompany?.Data])

    const { mutateAsync: create, isPending: createIsPending, isError: createHasError, error: createError, isSuccess: createIsSuccess } = mutCreateInsuranceCompany();
    const { mutateAsync: modify, isPending: modifyIsPending, isError: modifyHasError, error: modifyError, isSuccess: modifyIsSuccess } = mutUpdateInsuranceCompany();
    type InsuranceCompanyFormData = yup.InferType<typeof insuranceCompanySchema>;
    const form = useForm<InsuranceCompanyFormData>({
        resolver: yupResolver(insuranceCompanySchema),
    });

    useEffect(() => {
        if (createIsPending)
            setActionId(toast.loading(t('Actions.Pending'), { autoClose: false }))
        if (createHasError && actionId) {
            toast.update(actionId, { render: t('Messages.Error', { 0: createError?.Errors?.join('\n') }), type: "error", isLoading: false, autoClose: 2000 });
        }
        if (!createIsPending && !createHasError && createIsSuccess && actionId) {
            toast.update(actionId, { render: t('Messages.Saved'), type: "success", isLoading: false, autoClose: 300 });
            setTimeout(() => {
                toast.dismiss();
                navigate('/insurance-companies')
            }, 300);
        }

        return () => {
            if (createIsPending)
                toast.dismiss();
        }
    }, [createIsPending, createHasError, createError]);

    useEffect(() => {
        if (modifyIsPending)
            setActionId(toast.loading(t('Actions.Pending'), { autoClose: false }))
        if (modifyHasError && actionId) {
            toast.update(actionId, { render: t('Messages.Error', { 0: modifyError?.Errors?.join('\n') }), type: "error", isLoading: false, autoClose: 2000 });
        }
        if (!modifyIsPending && !modifyHasError && modifyIsSuccess && actionId) {
            toast.update(actionId, { render: t('Messages.Saved'), type: "success", isLoading: false, autoClose: 2000 });
            setTimeout(() => {
                toast.dismiss();
                navigate('/insurance-companies')
            }, 300);
        }

        return () => {
            if (modifyIsPending)
                toast.dismiss();
        }
    }, [modifyIsPending, modifyHasError, modifyError]);

    const handleCreate = async (dto: CreateInsuranceCompanyDto) => {
        await create(dto)
    }

    const handleModify = async (dto: UpdateInsuranceCompanyDto) => {
        await modify(dto)
    }

    const onSubmit = form.handleSubmit(async (values) => {
        if (!!id)
            handleModify(values as UpdateInsuranceCompanyDto)
        else
            handleCreate(values as CreateInsuranceCompanyDto)
    });

    setActions(
        [
            <Link className="btn btn-sm btn-secondary" to="/insurance-companies"><i className="fas fa-arrow-right">
            </i> {t('Actions.Cancel')}
            </Link>,
            <Button variant="success" size="sm" onClick={onSubmit} disabled={createIsPending}>
                <i className='fas fa-check'></i> {t('Actions.Save')}
            </Button>,
        ]
    )

    return (
        <>
            {isLoading ? (
                <Placeholder />
            ) : (
                <FormProvider {...form}>
                    <PageTitle>{t('InsuranceCompany.Singular')}</PageTitle>
                    <Form onSubmit={onSubmit}>
                        <Card>
                            <Card.Body className="p-5 pb-0">
                                <Row>
                                    <Col md={4} xl="auto">
                                        <div className='row'>
                                            <Col xs="auto" className='mb-3'>
                                                <ProfileImage fieldName='Image' label={t('Text.ImageOf', { 0: t('InsuranceCompany.Singular') })} />
                                            </Col>
                                            <Col className='d-md-none'>
                                                <Row>
                                                    <Col xs={12} className='mb-2'>
                                                        <InputField name="Name" label="نام شرکت" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col xl={3} lg={6} md={6} className="mb-2 d-none d-sm-block">
                                                <InputField name="Name" label="نام شرکت" />
                                            </Col>
                                            <Col xl={3} lg={6} md={6} className="mb-2">
                                                <InputField name="PhoneNumber" label="شماره تلفن" ltr />
                                            </Col>
                                            <Col xl={3} lg={6} md={6} className="mb-1">
                                                <InputField name="Email" label="ایمیل" ltr />
                                            </Col>
                                            <Col xl={3} lg={6} md={6} className="mb-1">
                                                <InputField name="Website" label="وبسایت" ltr />
                                            </Col>
                                            <Col className="mb-2 mt-1">
                                                <TextAreaField name="Address" label="آدرس" rows="4" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Form>
                </FormProvider >
            )}
        </>
    );
};
