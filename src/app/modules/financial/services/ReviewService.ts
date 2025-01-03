import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ExceptionError, Result } from "@/app/modules/general/@types";
import { TransferWithIbanCommand } from "../@types";
import { ReviewCommand } from "../@types/ReviewDto";

const rejectRequest = async (command: ReviewCommand) =>
    await axios.patch<Result<string>>(`FinancialTransfers/Reject/${command.Id}/${command.Description}`)
        .then(res => res.data)

export const mutRejectRequest = () =>
    useMutation<Result<string>, ExceptionError, ReviewCommand>({ mutationKey: ["TransferRejectCommand"], mutationFn: rejectRequest })


const approveRequest = async (command: ReviewCommand) =>
    await axios.patch<Result<string>>(`FinancialTransfers/Approve/${command.Id}`)
        .then(res => res.data)

export const mutApproveRequest = () =>
    useMutation<Result<string>, ExceptionError, ReviewCommand>({ mutationKey: ["TransferApproveCommand"], mutationFn: approveRequest })

const waitingForApproveRequest = async (command: ReviewCommand) =>
    await axios.patch<Result<string>>(`FinancialTransfers/WaitingForApprove/${command.Id}`)
        .then(res => res.data)

export const mutWaitingForApproveRequest = () =>
    useMutation<Result<string>, ExceptionError, ReviewCommand>({ mutationKey: ["TransferWaitingForApproveCommand"], mutationFn: waitingForApproveRequest })
