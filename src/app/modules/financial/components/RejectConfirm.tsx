import { useListView } from "@/_metronic/partials/controls/Table";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { mutRejectRequest } from "../services/ReviewService";
import toast from "react-hot-toast";
import { PaginateResult } from "../../general/@types";
import { FinancialTransferDto } from "../@types/ReportDto";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { TextAreaField } from "@/_metronic/partials/controls";

export type ConfirmProps = {
    confirm: boolean,
    setConfirm: (confirm: boolean) => void
}

export enum ActionResult {
    Pending = 11,
    Failed = 12,
    Succeeded = 13
}

export const RejectConfirm = ({ confirm, setConfirm }: ConfirmProps) => {
    const listView = useListView();
    const queryClient = useQueryClient();

    //#region Reject
    const { mutateAsync: rejectAsync, isPending: isRejecting } = mutRejectRequest()

    const updateItem = (item: number, actionResult?: ActionResult, error?: string) => {
        const prec = queryClient.getQueriesData({ predicate: x => x.queryKey[0] == "FinancialTransfers" })[0];

        queryClient.setQueryData<PaginateResult<FinancialTransferDto>>([...prec[0]], (data) => {
            return {
                ...data,
                Data: {
                    ...data?.Data,
                    Result: data?.Data?.Result.map(x =>
                        x.Id == item
                            ? { ...x, StatusId: actionResult || 0, StatusName: error || t('Messages.Success') }
                            : x
                    )
                }
            } as PaginateResult<FinancialTransferDto>
        });
    }

    //#endregion
    
    const validationSchema = object({
        Description: string()
            .required(t('Messages.Required', { 0: t('Text.RejectReason') }))
            .max(500, t('Messages.MaxLength', { 0: t('Text.RejectReason'), 1: 500 }))
    });
    
    const methods = useForm<{ Description: string }>({
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        resolver: yupResolver(validationSchema),
    });

    const onReject = methods.handleSubmit(async (values) => {
        if (listView?.selected?.length) {
            let requests = listView?.selected.map((item) => {
                return new Promise((resolve, reject) => {
                    updateItem(Number(item), ActionResult.Pending);

                    rejectAsync({ Id: Number(item), Description: values.Description })
                        .then((res) => {
                            updateItem(Number(item), ActionResult.Succeeded);
                            resolve('');
                        }).catch((res) => {
                            updateItem(Number(item), ActionResult.Failed, res?.Errors?.join(', '));
                            reject('');
                        })
                })
            })

            Promise.all(requests).then(() => {
                queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'FinancialTransfers' });
            }).catch((res) => {
            }).finally(() => {
                setConfirm(false);
                listView.clearSelected();
            });
        }
    });

    return (
        <Modal show={confirm} centered onHide={() => setConfirm(false)}>
            <FormProvider {...methods}>
                <Form className='form form-label-right' onSubmit={onReject}>
                    <Modal.Header closeButton>{t('Actions.RejectFinacialTransfer')}</Modal.Header>
                    <Modal.Body>
                        <h4>{t('Messages.RejectQuestion')}</h4>
                        <label className="mt-5" htmlFor='RejectReason'>{t('Text.RejectReason')}</label>
                        <TextAreaField name='Description' />
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className='btn btn-secondary'
                            onClick={() => setConfirm(false)}
                            type='submit'
                            disabled={isRejecting}
                        >
                            {t('Actions.Cancel')}
                        </button>
                        <button
                            className='btn btn-danger'
                            onClick={() => !!listView?.selected && onReject()}
                            type='submit'
                            disabled={isRejecting}
                        >
                            {!isRejecting
                                ? (t('Actions.Reject'))
                                : (<>{t('Actions.Submitting')}<Spinner size='sm' className='ms-2' /></>)
                            }
                        </button>
                    </Modal.Footer>
                </Form>
            </FormProvider>
        </Modal>
    );
}