import { useTranslation } from "react-i18next"
import { Create, Delete, List, Modify, View } from "./general"
import {
    useDocumentTypes,
    mutUpdateDocumentType,
    mutCreateDocumentType,
    mutDeleteDocumentType
} from "../services"
import { useState } from "react";
import { BasicInfoDto } from "../@types";
import { useQueryClient } from "@tanstack/react-query";

export const DocumentTypes = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation();
    const [showModify, setShowModify] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showView, setShowView] = useState(false);
    const [data, setData] = useState<BasicInfoDto>();

    const onAction = () => {
        queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'DocumentTypes' });
    }

    return (
        <>
            <List
                pageTitle={t('BasicInfo.DocumentType')}
                queryFn={useDocumentTypes}
                queryKey="DocumentTypes"
                showModify={(data: BasicInfoDto) => {
                    setData(data);
                    setShowModify(true);
                }}
                showDelete={(data: BasicInfoDto) => {
                    setData(data);
                    setShowDelete(true);
                }}
                showView={(data: BasicInfoDto) => {
                    setData(data);
                    setShowView(true);
                }}
                showCreate={(data: BasicInfoDto) => {
                    setData(data);
                    setShowCreate(true);
                }}
            />
            <Create show={showCreate} onHide={() => setShowCreate(false)} onCreate={mutCreateDocumentType} onAction={onAction} />
            <Modify show={showModify} onHide={() => setShowModify(false)} onModify={mutUpdateDocumentType} onAction={onAction} data={data} />
            <Delete show={showDelete} onHide={() => setShowDelete(false)} onDelete={mutDeleteDocumentType} onAction={onAction} data={data} />
            <View show={showView} onHide={() => setShowView(false)} data={data} />
        </>
    )
}