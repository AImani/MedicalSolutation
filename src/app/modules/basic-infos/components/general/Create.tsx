import { InputField } from "@/_metronic/partials/controls";
import { Button, Form, Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BasicInfoDto } from "../../@types";
import { useEffect } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { ExceptionError } from "@/app/modules/general/@types";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

export interface CreateModalProps {
    show: boolean;
    onHide: () => void;
    onCreate: () => UseMutationResult<void, ExceptionError, BasicInfoDto, unknown>;
    onAction?: () => void;
}

export const Create = ({ show, onHide, onCreate, onAction }: CreateModalProps) => {
    const { t } = useTranslation();
    const { mutateAsync, error } = onCreate();

    const validationSchema = yup.object({
        Title: yup.string().required(t('Messages.Required', { 0: t('BasicInfo.Title') }))
    });


    const form = useForm<BasicInfoDto>({
        defaultValues: { Title: "", Id: undefined },
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = form.handleSubmit(values => {
        const create = async () => {
            try {
                const result = await toast.promise(
                    async () => {
                        return await mutateAsync(values);
                    },
                    {
                        pending: t('Actions.Processing'),
                        success: {
                            render: (opt) => {
                                !!onAction && onAction();
                                onHide();
                                return t('Messages.Success')
                            }
                        },
                        error: t('Messages.Unsuccess') + '\n' + error?.Errors?.join('\n'),
                    }
                );
                console.log(result)
            } catch (error) {
                console.error(error);
            }
        };

        create();
    });

    useEffect(() => {
        form.reset({ Title: "" });
        return () => { form.reset({ Title: "" }); }
    }, [show])

    return (
        <FormProvider {...form}>
            <Form onSubmit={onSubmit}>
                <Modal show={show} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('Actions.Create')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputField name="Title" label={t('BasicInfo.Title')} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onHide}><i className="fas fa-ban"></i> {t('Actions.Cancel')}</Button>
                        <Button variant="success" onClick={onSubmit}><i className="fas fa-check"></i> {t('Actions.Create')}</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </FormProvider>
    );
}