import { Row, Col, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
    DatePickerField,
    InputField,
    SelectField
} from '@/_metronic/partials/controls';
import {
    useMaritalStatuses,
    useGroupStatuses
} from '../../basic-infos/services';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { url } from 'inspector';
import { ProfileImage } from '../../general/components/ProfileImage';

const Group: React.FC = () => {
    const { t } = useTranslation();
    const { data: groupStatuses } = useGroupStatuses({} as any);
    const { data: maritalStatuses } = useMaritalStatuses({} as any);

    return (
        <Row>
            <Col>
                <Row>
                    <Col xl={4} lg={6} md={6} className='mb-2 d-none d-sm-block'>
                        <InputField name="Title" label={t('Fields.Title')} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Group;