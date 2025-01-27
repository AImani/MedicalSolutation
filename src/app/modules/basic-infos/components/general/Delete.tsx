import { InputField } from "@/_metronic/partials/controls";
import { Button, Form, Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BasicInfoDto } from "../../@types";
import { useEffect } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { ExceptionError } from "@/app/modules/general/@types";
import { toast } from "react-toastify";

export interface DeleteModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => UseMutationResult<void, ExceptionError, number, unknown>
    data?: BasicInfoDto;
    onAction?: () => void;
}

export const Delete = ({ show, onHide, onDelete, data, onAction }: DeleteModalProps) => {
    const { t } = useTranslation();
    const { mutateAsync, error } = onDelete();

    const onSubmit = () => {
        const remove = async () => {
            try {
                const result = await toast.promise(
                    async () => {
                        return await mutateAsync(!!data ? data.Id || 0 : 0);
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

        if (!!data && data.Id)
            remove();
    };
    console.log('data > ', data);


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{t('Messages.Confirmation')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <label className="form-label">{t('BasicInfo.Title')}</label>
                <label className="form-control" >{data?.Title}</label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}><i className="fas fa-ban"></i> {t('Actions.Cancel')}</Button>
                <Button variant="danger" onClick={onSubmit}><i className="fas fa-trash-alt"></i> {t('Actions.Remove')}</Button>
            </Modal.Footer>
        </Modal>
    );
}