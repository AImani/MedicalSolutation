import { Badge, Spinner } from "react-bootstrap"
import {
    FinancialTransferRequestStatuses as Statuses,
    FinancialToNumberStatusMapper as Mapper
} from "../@types/BasicInfo"


export const StatusBadge = ({ statusId, message }: { statusId: number, message?: string }) => {

    return (
        <>
            {statusId === Statuses.Rejected && <Badge bg="danger" pill className='text-light text-start'>{Mapper[statusId]}</Badge>}
            {statusId === Statuses.InitialRequest && <Badge bg="info" pill className='text-light text-start'>{Mapper[statusId]}</Badge>}
            {statusId === Statuses.WaitingForApprove && <Badge bg="primary" pill className='text-light text-start'>{Mapper[statusId]}</Badge>}
            {statusId === Statuses.WaitingForPayment && <Badge bg="warning" pill className='text-light text-start'>{Mapper[statusId]}</Badge>}
            {statusId === Statuses.SuccessfulPayment && <Badge bg="success" pill className='text-light text-start'>{Mapper[statusId]}</Badge>}
            {statusId === Statuses.FailedPayment && <Badge bg="danger" pill className='text-light text-start'>{Mapper[statusId]}</Badge>}

            {statusId === Statuses.Pending && <Badge bg="info" pill className='text-light text-start'>در حال ارسال <Spinner size='sm' className='ms-2' /></Badge>}
            {statusId === Statuses.Failed && <Badge bg="danger" pill className='text-light text-start'>{message || Mapper[statusId]}</Badge>}
            {statusId === Statuses.Succeeded && <Badge bg="success" pill className='text-light text-start'>{message || Mapper[statusId]}</Badge>}
        </>
    )
}