import { InputField } from "@/_metronic/partials/controls";
import { Button, Form, Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BasicInfoDto } from "../../@types";
import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ExceptionError, PaginateResult } from "@/app/modules/general/@types";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

export interface FilterModalProps {
    show: boolean;
    onHide: () => void;
    onFilter: (dto: BasicInfoDto) => UseQueryResult<PaginateResult<BasicInfoDto>, ExceptionError>;
    onAction?: () => void;
}

export const Filter = ({ show, onHide, onFilter, onAction }: FilterModalProps) => {
    const { t } = useTranslation();
    
    const validationSchema = yup.object({
        Title: yup.string().required(t('Messages.Required', { 0: t('Fields.Title') }))
    });
    
    
    const form = useForm<BasicInfoDto>({
        defaultValues: { Title: "", Id: undefined },
        resolver: yupResolver(validationSchema)
    });
    const { data, refetch, error } = onFilter(form.getValues());

    const onSubmit = form.handleSubmit(values => {
        const create = async () => {
            try {
                const result = await toast.promise(
                    async () => {
                        return await refetch();
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
                        <Modal.Title>{t('Actions.Filter')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputField name="Title" label={t('Fields.Title')} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}><i className="fas fa-ban"></i> {t('Actions.Cancel')}</Button>
                        <Button variant="primary" onClick={onSubmit}><i className="fas fa-search"></i> {t('Actions.Search')}</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </FormProvider>
    );
}