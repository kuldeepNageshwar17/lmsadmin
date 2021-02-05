import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Students from './pages/student'
import StudentProfile from './pages/studentProfile'
import StudentForm from './pages/studentform'
import Passwordreset from './pages/studentPasswordReset'

export default function Student() {
  return (
    <Switch>
      <Route exact path='/Student/StudentForm/:id'>
        <StudentForm />
      </Route>
      <Route exact path='/Student/studentProfile/:id'>
        <StudentProfile />
      </Route>
      <Route exact path='/Student/SPasswordReset/:id'>
        <Passwordreset />
      </Route>
      {/* <Route exact path='/Student/Student/:id'>
        <StudentProfile />
      </Route> */}
      <Route exact path='/Student'>
        <Students />
      </Route>
      {/* <Route exact path='/Student' component={Students} /> */}
      <Route  exact path='/Student/StudentForm' component={StudentForm} />
      {/* <Route  exact path='/Student/testprofile' component={StudentProfile} /> */}

     
    </Switch>
  )
}
