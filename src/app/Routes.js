/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { Layout } from '../_metronic/layout'
import BasePage from './BasePage'
import { Logout, AuthPage } from './modules/Auth'
import ErrorsPage from './modules/ErrorsExamples/ErrorsPage'
import CoursePlayer from './modules/Setting/pages/CoursePlayer'
import {
  PermissionContenxt,
  PermissionsProvider
} from './modules/permissionManager/permissionContext'

 export function Routes () {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  )
 
  // const {isAuthorized} =true;
  return (
    <Switch>
      {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from='/auth' to='/' />
      )}
        <Route path='/coursePlayer/:id/:sectionId?/:contentId?/:time?/:type?'>
        <CoursePlayer />
      </Route>
      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />
      {!isAuthorized ? (
        <Redirect to='/auth/login' />
      ) : (
        <PermissionsProvider >
          <Layout>
            <BasePage />
          </Layout>
        </PermissionsProvider>
      )}
    </Switch>
  )
}


// export default connect(mapStateToProps)(Routes)
 