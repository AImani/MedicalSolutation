import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { CreatePatientDto } from "../@types";
import { InputField, SelectField } from "@/_metronic/partials/controls";
import { InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const Phones = () => {
    const { t } = useTranslation()
    const form = useFormContext<CreatePatientDto>();

    const { fields, append, remove } = useFieldArray({
        name: "ContactInfo.PhoneNumbers",
        control: form.control
    });

    return (
        <>
            {fields.map((field, index) => (
                <InputGroup key={field.id}>
                    <InputGroup.Text>{t('Patient.PhoneNo')}</InputGroup.Text>
                    <Controller
                        name={`ContactInfo.PhoneNumbers.${index}.PhoneNumberValue`}
                        control={form.control}
                        defaultValue=""
                        render={({ field }) => <InputField name={field.name}/>}
                    />
                    {form.formState.errors.ContactInfo?.PhoneNumbers?.[index]?.PhoneNumberValue && <p>Phone Number is required</p>}

                    <InputGroup.Text>{t('Patient.PhoneType')}</InputGroup.Text>
                    <Controller
                        name={`ContactInfo.PhoneNumbers.${index}.PhoneNumberTypeId`}
                        control={form.control}
                        render={({ field }) => 
                        <SelectField options={[]} name={field.name}/>
                        }
                    />
                    {form.formState.errors.ContactInfo?.PhoneNumbers?.[index]?.PhoneNumberTypeId && <p>Phone Type is required</p>}
                    <button className="btn btn-danger px-5" type="button" onClick={() => remove(index)}><i className="fas fa-trash-alt"></i></button>
                </InputGroup>
            ))}
        </>
    );
}