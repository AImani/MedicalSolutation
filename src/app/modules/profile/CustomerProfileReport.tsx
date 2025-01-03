import { useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { EnToFaString } from '@/_metronic/helpers/DateConverters';
import { HtmlMetaData } from '@/_metronic/partials';
import { DatePickerField } from '@/_metronic/partials/controls';
import { ReportProvider, useReport } from './ReportContext';
import * as yup from 'yup';
import { PageTitle } from '@/_metronic/layout/core';
import { KTIcon } from '@/_metronic/helpers';

export const CustomerProfileReport = ({ ...props }: any) => {
    const { t } = useTranslation();

    return (
        <ReportProvider>
            <PageTitle>{t('Reports.CustomerProfile')}</PageTitle>
            <ReportBody />
        </ReportProvider>
    );
}
const ReportBody = () => {
    const { t } = useTranslation();
    const [fromDate, setFromDate] = useState<DayValue>(null);
    const [toDate, setToDate] = useState<DayValue>(null);
    const reportProvider = useReport()!;
    const actions = useMemo(() => {
        return {
            search: reportProvider.queryReport,
            export: reportProvider.exportProfileReport,
            filledExport: reportProvider.exportProfileFilledReport,
            filledInRangeExport: reportProvider.exportProfileFilledReportInRange,
            error: reportProvider.error
        };
    }, [reportProvider]);

    const validationSchema = yup.object({
        fromDate: yup.date().required(t('Messages.Required', { 0: t('CustomerTransaction.Transaction.FromDate') })),
        toDate: yup.date().required(t('Messages.Required', { 0: t('CustomerTransaction.Transaction.ToDate') })),
    });

    const methods = useForm({
        defaultValues: {
            fromDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1_000),
            toDate: new Date(),
        },
    });
    const { handleSubmit } = methods;

    const onExport = handleSubmit((values: any) => {
        actions.export();
    });

    const onFilledExport = handleSubmit((values: any) => {
        actions.filledExport();
    });

    const onFilledInRangeExport = handleSubmit((values: any) => {
        let startDate = EnToFaString(values.fromDate) || '';
        let endDate = EnToFaString(values.toDate) || '';
        actions.filledInRangeExport(startDate, endDate);
    });

    return (
        <>
            <FormProvider {...methods}>
                <Form className='form form-label-right' onSubmit={onFilledInRangeExport}>
                    <Card>
                        <Card.Body>
                            <h6>خروجی پروفایل‌های تکمیل شده در بازه تاریخی:</h6>
                            <Row className='w-100 my-3 mx-0 me-auto'>
                                <Col lg={2} md={3} className='ps-0'>
                                    <label htmlFor='employee'>{t('CustomerTransaction.Transaction.FromDate')}</label>
                                    <DatePickerField
                                        wrapperClassName='form-control'
                                        clean
                                        name='fromDate'
                                        value={fromDate}
                                        handleOnChange={setFromDate}
                                    />
                                </Col>
                                <Col lg={2} md={3} className='ps-0'>
                                    <label htmlFor='employee'>{t('CustomerTransaction.Transaction.ToDate')}</label>
                                    <DatePickerField
                                        wrapperClassName='form-control'
                                        clean
                                        name='toDate'
                                        value={toDate}
                                        handleOnChange={setToDate}
                                    />
                                </Col>
                                <Col className='pe-0 pt-5 mt-2'>
                                    <InputGroup size='sm'>
                                        <Button type='submit' variant='primary' onClick={onFilledInRangeExport}>
                                            <KTIcon iconName='cloud-download' iconType='solid' className='fs-2 me-2' /> {t('Actions.ExportFilledProfileInRangeExcel')}
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <div className='my-10' style={{ height: '1px', backgroundColor: 'var(--bs-gray-200)' }}></div>

                            <h6>خروجی بدون بازه تاریخی:</h6>
                            <Row className='w-100 my-3 mx-0 me-auto'>
                                <Col lg={'auto'} className='ps-0'>
                                    <InputGroup size='sm'>
                                        <Button type='submit' variant='primary' onClick={onExport}>
                                            <KTIcon iconName='cloud-download' iconType='solid' className='fs-2 me-2' /> {t('Actions.ExportAllPRofileExcel')}
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col lg={'auto'} className='p-0'>
                                    <InputGroup size='sm'>
                                        <Button type='submit' variant='primary' onClick={onFilledExport}>
                                            <KTIcon iconName='cloud-download' iconType='solid' className='fs-2 me-2' /> {t('Actions.ExportFilledProfileExcel')}
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            </FormProvider>
        </>
    )
};
