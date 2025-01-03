import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_metronic/layout/core';
import {
  CardsWidget17,
  CardsWidget20,
  CardsWidget7,
  ChartsWidget1,
} from '../../../_metronic/partials/widgets';
import { toAbsoluteUrl } from '@/_metronic/helpers';
import { GetCashbackClaimKpiDto, useCashbackClaimKpi } from './service';
import _, { Dictionary } from 'lodash'

export interface CashbackClaimKpiDto {
  OperatorId: number,
  FullName: string,
  StatusId: number,
  StatusName: null | string,
  Count: number
}

const DashboardPage: FC = () => {
  const { data: dailyCashbackClaimKpi } = useCashbackClaimKpi(true);
  const { data: CashbackClaimKpi } = useCashbackClaimKpi(false);
  const [kpi, setKpi] = useState<Dictionary<CashbackClaimKpiDto[]>>()

  useEffect(() => {
    setKpi(_.groupBy(dailyCashbackClaimKpi?.Data?.Details, (x) => x.OperatorId))
  }, [dailyCashbackClaimKpi])

  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-10'>
        {/* begin::Col */}
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
          <CardsWidget17 data={CashbackClaimKpi} className='h-md-90 mb-5 mb-xl-10' />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
          <CardsWidget20
            className='h-md-90 mb-5 mb-xl-10'
            description='درخواست های خدمات ویژه'
            color='#F1416C'
            img={toAbsoluteUrl('/media/patterns/vector-1.png')}
          />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
          <CardsWidget7
            className='h-md-90 mb-5 mb-xl-10'
            description='همکاران'
            icon={false}
            stats={38}
            labelColor='dark'
            textColor='gray-300'
          />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
          <div className='card card-flush h-md-90 mb-5 mb-xl-10'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <div className='d-flex align-items-center'>
                  <span className='fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2'>90,000</span>
                  <span className='badge badge-light-success fs-base'>
                    <i className='ki-duotone ki-arrow-up fs-5 text-success ms-n1'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>
                    2.6%
                  </span>
                </div>
                <span className='text-gray-500 pt-1 fw-semibold fs-6'>تعداد کل کاربران</span>
              </div>
            </div>
            <div className='card-body d-flex align-items-end px-0 pb-0'>
              <div id='kt_card_widget_6_chart' className='w-100' style={{ height: '80px' }}></div>
            </div>
          </div>
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      <div className='row gx-5 gx-xl-10'>
        <div className='col-xl-6 mb-5 mb-xl-10'>
          <div className='card card-flush h-xl-100'>
            <div className='card-header pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold text-gray-800'>عملکرد روزانه همکاران</span>
              </h3>
            </div>
            <div className='card-body pt-1'>
              <ul className='nav nav-pills nav-pills-custom mb-3'>
                <li className='nav-item mb-3 me-3 me-lg-6'>
                  <a
                    className='nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-80px h-85px pt-5 pb-2 active'
                    id='kt_stats_widget_16_tab_link_1'
                    data-bs-toggle='pill'
                    href='#kt_stats_widget_16_tab_1'
                  >
                    <div className='nav-icon fw-bold mb-3'>{dailyCashbackClaimKpi?.Data?.TotalCount}</div>
                    <span className='nav-text text-gray-800 fw-bold fs-8 lh-1'>برگشت نقدی</span>
                    <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                  </a>
                </li>
                <li className='nav-item mb-3 me-3 me-lg-6'>
                  <a
                    className='nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-80px h-85px pt-5 pb-2'
                    id='kt_stats_widget_16_tab_link_2'
                    data-bs-toggle='pill'
                    href='#kt_stats_widget_16_tab_2'
                  >
                    <div className='nav-icon fw-bold mb-3'>80</div>
                    <span className='nav-text text-gray-800 fw-bold fs-8 lh-1'>خدمات ویژه</span>
                    <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                  </a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane fade show active' id='kt_stats_widget_16_tab_1'>
                  <div className='table-responsive'>
                    <table className='table table-row-dashed align-middle gs-0 gy-3 my-0'>
                      <thead>
                        <tr className='fs-7 fw-bold text-gray-500 border-bottom-0'>
                          <th className='p-3 text-start'>نام</th>
                          <th className='p-3 text-start'>درحال بررسی</th>
                          <th className='p-3 text-start'>تائید شده</th>
                          <th className='p-3 text-start'>رد شده</th>
                        </tr>
                      </thead>
                      <tbody>
                        {_.map(kpi, (detail, key) => (
                          <tr key={key}>
                            <td>
                              <div className='d-flex align-items-center'>
                                <div className='symbol symbol-50px me-3'>
                                  {/* <img
                                    src={toAbsoluteUrl(`/media/ax/${detail.OperatorId}.jpg`)}
                                    alt={detail.FullName}
                                  /> */}

                                </div>
                                <div className='d-flex justify-content-start flex-column'>
                                  <a
                                    href='pages/user-profile/overview.html'
                                    className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'
                                  >
                                    {!!detail && detail.find(x => x.OperatorId.toString() == key)?.FullName}
                                  </a>
                                  <span className='text-gray-500 fw-semibold d-block fs-7'>
                                    کاربر
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className='text-start pe-13'>
                              <span className='text-warning fw-bold fs-6'>
                                {!!detail && detail.find(x => x.StatusId == 1)?.Count || 0}
                              </span>
                            </td>
                            <td className='text-start pe-13'>
                              <span className='text-success fw-bold fs-6'>
                                {!!detail && detail.find(x => x.StatusId == 2)?.Count || 0}
                              </span>
                            </td>
                            <td className='text-start pe-13'>
                              <span className='text-danger fw-bold fs-6'>
                                {!!detail && detail.find(x => x.StatusId == 3)?.Count || 0}
                              </span>
                            </td>
                          </tr>
                        ))}

                        {/* <tr>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='symbol symbol-50px me-3'>
                              <img src='media/ax/Samane-Rabiei.jpg' alt='' />
                            </div>
                            <div className='d-flex justify-content-start flex-column'>
                              <a
                                href='pages/user-profile/overview.html'
                                className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'
                              >
                                سمانه شیخ ربیعی
                              </a>
                              <span className='text-gray-500 fw-semibold d-block fs-7'>
                                بازاریابی
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-start pe-13'>
                          <span className='text-warning fw-bold fs-6'>5</span>
                        </td>
                        <td className='text-start pe-13'>
                          <span className='text-success fw-bold fs-6'>4</span>
                        </td>
                        <td className='text-start pe-13'>
                          <span className='text-danger fw-bold fs-6'>15</span>
                        </td>
                      </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='tab-pane fade show' id='kt_stats_widget_16_tab_2'>
                  <div className='table-responsive'>
                    <table className='table table-row-dashed align-middle gs-0 gy-3 my-0'>
                      <thead>
                        <tr className='fs-7 fw-bold text-gray-500 border-bottom-0'>
                          <th className='p-3 text-start'>نام</th>
                          <th className='p-3 text-start'>درحال بررسی</th>
                          <th className='p-3 text-start'>تائید شده</th>
                          <th className='p-3 text-start'>رد شده</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='symbol symbol-50px me-3'>
                                <img src='media/ax/sm.jpg' className='' alt='' />
                              </div>
                              <div className='d-flex justify-content-start flex-column'>
                                <a
                                  href='pages/user-profile/overview.html'
                                  className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'
                                >
                                  ساسان محمدی
                                </a>
                                <span className='text-gray-500 fw-semibold d-block fs-7'>
                                  خدمات ویژه
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-warning fw-bold fs-6'>5</span>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-success fw-bold fs-6'>4</span>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-danger fw-bold fs-6'>15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='symbol symbol-50px me-3'>
                                <img src='media/ax/mc.jpg' className='' alt='' />
                              </div>
                              <div className='d-flex justify-content-start flex-column'>
                                <a
                                  href='pages/user-profile/overview.html'
                                  className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'
                                >
                                  ملاحت چراغچی
                                </a>
                                <span className='text-gray-500 fw-semibold d-block fs-7'>
                                  خدمات ویژه
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-warning fw-bold fs-6'>6</span>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-success fw-bold fs-6'>8</span>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-danger fw-bold fs-6'>11</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='symbol symbol-50px me-3'>
                                <img src='media/ax/em.jpg' className='' alt='' />
                              </div>
                              <div className='d-flex justify-content-start flex-column'>
                                <a
                                  href='pages/user-profile/overview.html'
                                  className='text-gray-800 fw-bold text-hover-primary mb-1 fs-6'
                                >
                                  الهه معصومی
                                </a>
                                <span className='text-gray-500 fw-semibold d-block fs-7'>
                                  خدمات ویژه
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-warning fw-bold fs-6'>10</span>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-success fw-bold fs-6'>6</span>
                          </td>
                          <td className='text-start pe-13'>
                            <span className='text-danger fw-bold fs-6'>17</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xl-stretch mb-xl-8' />
        </div>
      </div>
    </>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
