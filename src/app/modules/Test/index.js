import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SectionsTest from './pages/SectionTestList'
import TestForm from './pages/TestForm'


export default function Student() {
  return (
    <Switch>
      <Route exact path='/Test/Course/:id/tests'>
        <SectionsTest/>
      </Route>
      <Route exact path='/Test/Course/:id/TestForm'>
        <TestForm/>
      </Route>
      <Route exact path='/Test/Course/:id/TestForm/:TId'>
        <TestForm/>
      </Route>
     
      {/* <Route  exact path='/Student/testprofile' component={StudentProfile} /> */}

     
    </Switch>
  )
}
