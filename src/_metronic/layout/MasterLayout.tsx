import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { HeaderWrapper } from './components/header'
import { ScrollTop } from './components/scroll-top'
import { Content } from './components/content'
import { FooterWrapper } from './components/footer'
import { Sidebar } from './components/sidebar'
import { ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan } from '../partials'
import { PageDataProvider } from './core'
import { reInitMenu } from '../helpers'
import { ToolbarWrapper } from './components/toolbar'
import { Bounce, ToastContainer } from 'react-toastify'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    reInitMenu()
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />

          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <Sidebar />
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div className='d-flex flex-column flex-column-fluid mt-5'>
                <ToolbarWrapper />
                <Content>
                  <Outlet />
                </Content>
              </div>
              <FooterWrapper />
            </div>
          </div>
        </div>
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export { MasterLayout }
