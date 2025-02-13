import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BasicInfoDto } from "../../@types";

export interface ViewModalProps {
    show: boolean;
    onHide: () => void;
    data?: BasicInfoDto;
}

export const View = ({ show, onHide, data }: ViewModalProps) => {
    const { t } = useTranslation();

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{t('Messages.Confirmation')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <label className="form-label">{t('Fields.Title')}</label>
                <label className="form-control" >{data?.Title}</label>
            </Modal.Body>
        </Modal>
    );
}