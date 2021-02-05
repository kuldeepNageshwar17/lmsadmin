/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'

import BasePage from './BasePage'
// import { Logout, AuthPage } from './modules/Auth'
import ErrorsPage from './modules/ErrorsExamples/ErrorsPage'
import CoursePlayer from './modules/Setting/pages/CoursePlayer'
import ConnectPage from './modules/Auth/pages/connectPage'
import PrivateRoute  from './privateRoute'

 export function Routes () {
  return (
    <Switch>
      <Redirect exact from='/' to='/dashboard' />

      <Route path='/connectPage/:authToken?' component={ConnectPage} />


      ///////////////////////////////////////
      <PrivateRoute path="/OnlineExam" component={BasePage} />
      <PrivateRoute path="/user" component={BasePage} />
      <PrivateRoute path="/Courses" component={BasePage} />
      <PrivateRoute path="/test" component={BasePage} />
      <PrivateRoute path="/fees" component={BasePage} />
      <PrivateRoute path="/ecourse" component={BasePage}/>
      <PrivateRoute path="/setting" component={BasePage}/>
      <PrivateRoute path="/student" component={BasePage}/> 
      <PrivateRoute path="/Exams" component={BasePage}/>
      <PrivateRoute path="/permission" component={BasePage}/>  
      <PrivateRoute path="/Notifications" component={BasePage} />
      <PrivateRoute path="/fee" component={BasePage} />
  
      ///////////////////////////////////////

      <Route path='/dashboard' component={BasePage} />
      <Route path='/coursePlayer/:id/:sectionId?/:contentId?/:time?/:type?'>
        <CoursePlayer />
      </Route>
      <Route path='/error' component={ErrorsPage} />
      {/* <Route path='/logout' component={Logout} /> */}
      <Redirect exact from='*' to='/' />
    </Switch>
  )
}


// export default connect(mapStateToProps)(Routes)
 