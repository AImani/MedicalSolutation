import { useTranslation } from "react-i18next"
import { Create, Delete, List, Modify, View } from "./general"
import {
    usePhoneNumberTypes,
    mutUpdatePhoneNumberType,
    mutCreatePhoneNumberType,
    mutDeletePhoneNumberType
} from "../services"
import { useState } from "react";
import { BasicInfoDto } from "../@types";
import { useQueryClient } from "@tanstack/react-query";

export const PhoneNumberTypes = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation();
    const [showModify, setShowModify] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showView, setShowView] = useState(false);
    const [data, setData] = useState<BasicInfoDto>();

    const onAction = () => {
        queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'PhoneNumberTypes' });
    }

    return (
        <>
            <List
                pageTitle={t('BasicInfo.PhoneNumberType')}
                queryFn={usePhoneNumberTypes}
                queryKey="PhoneNumberTypees"
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
            <Create show={showCreate} onHide={() => setShowCreate(false)} onCreate={mutCreatePhoneNumberType} onAction={onAction} />
            <Modify show={showModify} onHide={() => setShowModify(false)} onModify={mutUpdatePhoneNumberType} onAction={onAction} data={data} />
            <Delete show={showDelete} onHide={() => setShowDelete(false)} onDelete={mutDeletePhoneNumberType} onAction={onAction} data={data} />
            <View show={showView} onHide={() => setShowView(false)} data={data} />
        </>
    )
}