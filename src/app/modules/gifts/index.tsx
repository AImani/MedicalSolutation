import {useTranslation} from 'react-i18next';
import {AdminGiftProvider, useAdminGift} from './context';
import {HtmlMetaData} from '@/_metronic/partials';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form';
import {InputField, SelectField} from '@/_metronic/partials/controls';
import {useMemo, useState} from 'react';
import {GiftTable} from './GiftTable';
import {AddGiftModal} from './AddGiftModal';
import { KTIcon } from '@/_metronic/helpers';
import { PageTitle } from '@/_metronic/layout/core';

export const AdminGift = ({...props}: any) => {
  const {t} = useTranslation();

  return (
    <AdminGiftProvider>
      <PageTitle>{`${t('Gifts')} / ${t('Gift.Gifts')}`}</PageTitle>
      <Body />
    </AdminGiftProvider>
  );
};

const Body = () => {
  const {t} = useTranslation();
  const adminGiftProvider = useAdminGift()!;
  const methods = useForm();

  const [selectedGiftProvider, setSelectedGiftProvider] = useState();

  const {search, giftProviders, queryParams, showAddGiftModal, toggleAddGiftModal} = useMemo(() => {
    return {
      search: adminGiftProvider.queryGifts,
      giftProviders: adminGiftProvider.giftProviders!,
      queryParams: adminGiftProvider.queryParams!,
      showAddGiftModal: adminGiftProvider.showAddGiftModal,
      toggleAddGiftModal: adminGiftProvider.toggleAddGiftModal,
    };
  }, [adminGiftProvider]);

  const {handleSubmit} = methods;
  const onSubmit = handleSubmit((values: any) => {
    search({
      PageIndex: 0,
      PageSize: 10,
      GiftProviderId: selectedGiftProvider,
      NationalCode: methods.getValues('NationalCode'),
    });
  });

  const options = (giftProviders || []).map((o: any) => {
    return {value: o.Id, label: o.Name};
  });
  options.unshift({value: null, label: 'همه'});

  return (
    <>
      <FormProvider {...methods}>
        <Form className='form form-label-right' onSubmit={onSubmit}>
          <Card className='mb-5'>
            <Card.Body className='p-5'>
              <Row className='w-100 my-3 mx-0 me-auto'>
                <Col lg={4}>
                  <Col>
                    <label>{t('Gifts.GiftProvider')}</label>
                    <SelectField
                      // @ts-ignore
                      options={options}
                      onChange={(e: any) => setSelectedGiftProvider(e)}
                      name='GiftProviderId'
                    />
                  </Col>
                </Col>
                <Col lg={4}>
                  <InputField name='NationalCode' label='کدملی' />
                </Col>
                <Col lg={'auto'} className='pe-0 pt-5 mt-2'>
                  <Button className='me-2' type='submit' variant='primary'>
                    <KTIcon iconName='magnifier' iconType='solid' className='fs-2 me-2' /> {t('Actions.Search')}
                  </Button>
                  <Button variant='success' onClick={() => toggleAddGiftModal(true)}>
                  <KTIcon iconName='plus' iconType='solid' className='fs-2 me-2' /> {t('Actions.Add')}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <GiftTable />
        </Form>
      </FormProvider>

      <AddGiftModal props={{showAddGiftModal}} />
    </>
  );
};
