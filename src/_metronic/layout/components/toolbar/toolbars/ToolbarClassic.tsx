
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { KTIcon } from '../../../../helpers'
import { CreateAppModal, Dropdown1 } from '../../../../partials'
import { useLayout, usePageData } from '../../../core'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const ToolbarClassic = () => {
  const { config } = useLayout()
  const { pageCountDown } = usePageData()
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const daterangepickerButtonClass = config.app?.toolbar?.fixed?.desktop
    ? 'btn-light'
    : 'bg-body btn-color-gray-700 btn-active-color-primary'
  const [countDown, setCountDown] = useState(pageCountDown);
  
  useEffect(() => {
    setCountDown(undefined);
    setTimeout(() => {
      setCountDown(pageCountDown);
    }, 100);
    return () => setCountDown(undefined);
  }, [pageCountDown]);
  
  return (
    <div className='d-flex align-items-center gap-2 gap-lg-3'>
      {config.app?.toolbar?.actions?.map(x=> 
        <>
        {x}
        </>
      )}
      {/* {config.app?.toolbar?.filterButton && (
        <div className='m-0'>
          <a
            href='#'
            className={clsx('btn btn-sm btn-flex fw-bold', daterangepickerButtonClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            <KTIcon iconName='filter' className='fs-6 text-muted me-1' />
            Filter
          </a>
          <Dropdown1 />
        </div>
      )}
      {config.app?.toolbar?.daterangepickerButton && (
        <div
          data-kt-daterangepicker='true'
          data-kt-daterangepicker-opens='left'
          className={clsx(
            'btn btn-sm fw-bold  d-flex align-items-center px-4',
            daterangepickerButtonClass
          )}
        >
          <div className='text-gray-600 fw-bold'>Loading date range...</div>
          <KTIcon iconName='calendar-8' className='fs-1 ms-2 me-0' />
        </div>
      )}

      {config.app?.toolbar?.secondaryButton && (
        <a href='#' className='btn btn-sm btn-flex btn-light fw-bold'>
          Filter
        </a>
      )}

      {config.app?.toolbar?.primaryButton && (
        <a
          href='#'
          onClick={() => setShowCreateAppModal(true)}
          className='btn btn-sm fw-bold btn-primary'
        >
          Create
        </a>
      )} */}
      {!!countDown && countDown.hasCountDown && (
        <CountdownCircleTimer
          isPlaying
          duration={countDown.countDown}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[30, 10, 5, 0]}
          size={35}
          strokeWidth={4}
          trailStrokeWidth={2}
          onComplete={() => {
            let result = countDown.onDone()
            console.log('result > ', result);

            return result
          }}
          initialRemainingTime={countDown.countDown}
        >
          {({ remainingTime }) => <b>{remainingTime}</b>}
        </CountdownCircleTimer>
      )}
      <CreateAppModal show={showCreateAppModal} handleClose={() => setShowCreateAppModal(false)} />
    </div>
  )
}

export { ToolbarClassic }
