import { Col, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { InputField, SelectField } from "@/_metronic/partials/controls";
import { usePhoneNumberTypes } from "../../basic-infos/services";
import { CreatePatientDto } from "../@types";

export const Phones = () => {
    const { t } = useTranslation()
    const form = useFormContext<CreatePatientDto>();
    const { data: phoneNumberTypes } = usePhoneNumberTypes({} as any);

    const { fields, remove, append } = useFieldArray({
        name: "ContactInfo.PhoneNumbers",
        control: form.control
    });

    return (
        <>
            <h3>{t('ContantInfo.Phones')}</h3>

            <Col md={12} className="mb-2 py-3">
                <InputGroup>
                    <InputGroup.Text>برای افزودن شماره تماس جدید کلیک کنید</InputGroup.Text>
                    <button className="btn btn-sm btn-light-primary" type="button" onClick={() => append({ PhoneTypeId: undefined, PhoneNo: undefined })}>
                        <i className="fas fa-plus"></i> {t('Actions.Add')}
                    </button>
                </InputGroup>
            </Col>
            {fields.map((field, index) => (
                <Col md={12} key={field.id} className="mb-2">
                    <InputGroup key={field.id}>
                        <InputGroup.Text>{t('Fields.PhoneType')}</InputGroup.Text>
                        <Controller
                            name={`ContactInfo.PhoneNumbers.${index}.PhoneTypeId`}
                            control={form.control}
                            render={({ field }) =>
                                <SelectField
                                    name={field.name}
                                    options={phoneNumberTypes?.Data.Result.map(x => ({ value: x.Id, label: x.Title }))}
                                    noMessage />
                            }
                        />
                        <InputGroup.Text>{t('Fields.PhoneNo')}</InputGroup.Text>
                        <Controller
                            control={form.control}
                            name={`ContactInfo.PhoneNumbers.${index}.PhoneNo`}
                            defaultValue=""
                            render={({ field }) => <InputField name={field.name} noMessage />}
                        />

                        <button className="btn btn-light-danger px-5" type="button" onClick={() => remove(index)}>
                            <i className="fas fa-trash-alt p-0"></i>
                        </button>
                    </InputGroup>
                </Col>
            ))}
        </>
    );
}