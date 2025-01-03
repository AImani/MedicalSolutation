import {useEffect, useRef, FC} from 'react';
import ApexCharts, {ApexOptions} from 'apexcharts';
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils';
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
};

const ChartsWidget1: FC<Props> = ({className}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const {mode} = useThemeMode();

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, 'height'));

    const chart = new ApexCharts(chartRef.current, getChartOptions(height));
    if (chart) {
      chart.render();
    }

    return chart;
  };

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>گزارش رسوب</span>

          <span className='text-muted fw-semibold fs-7 mt-2'>بیش از 20 هزار کاربر فعال</span>
        </h3>
        {/* end::Title */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '350px'}} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export {ChartsWidget1};

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const baseColor = getCSSVariableValue('--bs-primary');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');

  return {
    series: [
      {
        name: 'رسوب',
        data: [
          1.8, 1.8, 2.0, 2.1, 1.9, 1.3, 2.3, 2.6, 2.8, 1.5, 3.1, 3.3, 2.8, 3.6, 3.9, 4, 4.3, 4.5,
        ],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 80, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: [
        'مهر 1401',
        'آبان 1401',
        'آذر 1401',
        'دی 1401',
        'بهمن 1401',
        'اسنفد 1402',
        'فروردین 1402',
        'اردیبهشت 1402',
        'خرداد 1402',
        'تیر 1402',
        'مرداد 1402',
        'شهریور 1402',
        'مهر 1402',
        'آبان 1402',
        'آذر 1402',
        'دی 1402',
        'بهمن 1402',
        'اسفند 1402',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6,
      labels: {
        rotate: 0,
        rotateAlways: true,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      max: 8,
      min: 0,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
        formatter: function (val) {
          return val + 'همت';
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + ' همت';
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}
