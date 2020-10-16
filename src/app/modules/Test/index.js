import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SectionsTest from './pages/SectionTestList'
import TestForm from './pages/TestForm'
import TestQuestion from './pages/testQuestion'
import QuestionForm from './pages/questionForm'
import Question from './pages/question'

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
      <Route exact path='/Test/:id/Questions'>
        <TestQuestion />
      </Route> 
      <Route exact path='/Test/:id/Question/:qid'>
        <Question />
      </Route>
      <Route exact path='/Test/:id/QuestionForm'>
        <QuestionForm />
      </Route>
      <Route exact path='/Test/:id/QuestionForm/:qid'>
        <QuestionForm />
      </Route>  
      
      
     
      {/* <Route  exact path='/Student/testprofile' component={StudentProfile} /> */}

     
    </Switch>
  )
}
