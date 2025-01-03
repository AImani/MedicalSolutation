import { useListView } from "@/_metronic/partials/controls/Table";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { mutApproveRequest } from "../services/ReviewService";
import toast from "react-hot-toast";
import { PaginateResult } from "../../general/@types";
import { FinancialTransferDto } from "../@types/ReportDto";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

export type ConfirmProps = {
    confirm: boolean,
    setConfirm: (confirm: boolean) => void
}

export enum ActionResult {
    Pending = 11,
    Failed = 12,
    Succeeded = 13
}

export const ApproveConfirm = ({ confirm, setConfirm }: ConfirmProps) => {
    const listView = useListView();
    const queryClient = useQueryClient();

    //#region Approve
    const { mutateAsync: approveAsync, isPending: isApproveing } = mutApproveRequest()

    const updateItem = (item: number, actionResult?: ActionResult, error?: string) => {
        const prec = queryClient.getQueriesData({ predicate: x => x.queryKey[0] == "FinancialTransfers" })[0];

        queryClient.setQueryData<PaginateResult<FinancialTransferDto>>([...prec[0]], (data) => {
            return {
                ...data,
                Data: {
                    ...data?.Data,
                    Result: data?.Data?.Result.map(x =>
                        x.Id == item
                            ? { ...x, StatusId: actionResult || 3, StatusName: error || t('Messages.Success') }
                            : x
                    )
                }
            } as PaginateResult<FinancialTransferDto>
        });
    }

    //#endregion

    const methods = useForm({
        reValidateMode: 'onChange',
        mode: 'onSubmit',
    });

    const onApprove = methods.handleSubmit(async (values) => {
        if (listView?.selected?.length) {
            let requests = listView?.selected.map((item) => {
                return new Promise((resolve, approve) => {
                    updateItem(Number(item), ActionResult.Pending);

                    approveAsync({ Id: Number(item), Description: values.Description })
                        .then((res) => {
                            updateItem(Number(item), ActionResult.Succeeded);
                            resolve('');
                        }).catch((res) => {
                            updateItem(Number(item), ActionResult.Failed, res?.Errors?.join(', '));
                            approve('');
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
                <Form className='form form-label-right' onSubmit={onApprove}>
                    <Modal.Header closeButton>{t('Actions.ApproveFinacialTransfer')}</Modal.Header>
                    <Modal.Body>
                        <h4>{t('Messages.ApproveQuestion')}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className='btn btn-secondary'
                            onClick={() => setConfirm(false)}
                            type='submit'
                            disabled={isApproveing}
                        >
                            {t('Actions.Cancel')}
                        </button>
                        <button
                            className='btn btn-danger'
                            onClick={() => !!listView?.selected && onApprove()}
                            type='submit'
                            disabled={isApproveing}
                        >
                            {!isApproveing
                                ? (t('Actions.Approve'))
                                : (<>{t('Actions.Submitting')}<Spinner size='sm' className='ms-2' /></>)
                            }
                        </button>
                    </Modal.Footer>
                </Form>
            </FormProvider>
        </Modal>
    );
}