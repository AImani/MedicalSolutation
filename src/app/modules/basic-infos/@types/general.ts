import * as yup from 'yup';

export interface BasicInfoDto {
    Id?: number;
    Title: string;
}

export interface Column<T> {
    header: string;
    accessor: keyof T;
}

export interface Item {
    id: number;
    [key: string]: any;
}

export interface ModalProps<T> {
    show: boolean;
    onHide: () => void;
    onSubmit: (values: T) => void;
    initialValues: T;
    schema: yup.Schema<T>;
    isEdit: boolean;
}

export interface DeleteModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: (itemId: number) => void;
    itemId: number | null;
}