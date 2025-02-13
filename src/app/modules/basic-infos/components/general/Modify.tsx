import { InputField } from "@/_metronic/partials/controls";
import { Button, Form, Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BasicInfoDto } from "../../@types";
import { useEffect } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { ExceptionError } from "@/app/modules/general/@types";
import { toast } from "react-toastify";

export interface ModifyModalProps {
    show: boolean;
    onHide: () => void;
    onModify: () => UseMutationResult<void, ExceptionError, BasicInfoDto, unknown>;
    data?: BasicInfoDto;
    onAction?: () => void;
}

export const Modify = ({ show, onHide, onModify, onAction, data }: ModifyModalProps) => {
    const { t } = useTranslation();
    const { mutateAsync, error } = onModify();

    const form = useForm<BasicInfoDto>({
        defaultValues: data
    });

    const onSubmit = form.handleSubmit(values => {
        const modify = async () => {
            try {
                const result = await toast.promise(
                    async () => {
                        return await mutateAsync(values);
                    },
                    {
                        pending: t('Actions.Pending'),
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

        modify();
    });

    useEffect(() => {
        return () => { form.reset({ Title: "" }); }
    }, []);

    useEffect(() => {
        form.reset(data)
    }, [data]);

    return (
        <FormProvider {...form}>
            <Form onSubmit={onSubmit}>
                <Modal show={show} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('Actions.Edit')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputField name="Title" label={t('Fields.Title')} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onHide}><i className="fas fa-ban"></i> {t('Actions.Cancel')}</Button>
                        <Button variant="success" onClick={onSubmit}><i className="fas fa-pen"></i> {t('Actions.Edit')}</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </FormProvider>
    );
}