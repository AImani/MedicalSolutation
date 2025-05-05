import {Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'
import {LayoutSplashScreen} from '@/_metronic/layout/core'
import { Create, Modify, SmsGroups, View } from './components'


const SmsPanelRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route path='/groups' Component={(props) => <SmsGroups />} />
        <Route path='/groups/create' Component={(props) => <Create />} />
        <Route path='/groups/show/:id' Component={(props) => <View />} />
        <Route path='/groups/edit/:id' Component={(props) => <Modify />} />
      </Routes>
    </Suspense>
  )
}

export default SmsPanelRoutes