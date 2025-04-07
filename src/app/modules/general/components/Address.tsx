import { InputField, SelectField } from '@/_metronic/partials/controls';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useCities } from '../../basic-infos/services';
import { useTranslation } from 'react-i18next';
import { useProvinces } from '../../basic-infos/services/ProvinceService';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

export const Address: React.FC = () => {
    const { t } = useTranslation();
    const form = useFormContext()
    const provinceId: number | undefined = useWatch({control: form.control, name: 'Address.ProvinceId'})
    const { data: provinces } = useProvinces({PageSize: 100} as any);
    const { data: cities, refetch } = useCities({ ProvinceId: provinceId });

    useEffect(() => {
        if(!!provinceId)
            refetch()
     }, [provinceId]);
    return (
        <Row>
            <Col lg={4} md={6} className='mb-2'>
                <SelectField name="Address.ProvinceId" label={t('Fields.Province')} options={provinces?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
            </Col>
            <Col lg={4} md={6} className='mb-2'>
                <SelectField name="Address.CityId" label={t('Fields.City')} options={cities?.Data.Result.map(x => ({ label: x.Title, value: x.Id }))} />
            </Col>
            <Col>
                <InputField name='Address.PostalCode' label={t('Fields.PostalCode')} />
            </Col>
            <Col lg={8} md={6} className='mb-2'>
                <InputField name='Address.FullAddress' label={t('Fields.FullAddress')} />
            </Col>
            <Col lg={2} md={2} className='mb-2'>
                <InputField name='Address.ApartmentNo' label={t('Fields.ApartmentNo')} />
            </Col>
            <Col lg={2} md={2} className='mb-2'>
                <InputField name='Address.UnitNo' label={t('Fields.UnitNo')} />
            </Col>
        </Row>
    );
};