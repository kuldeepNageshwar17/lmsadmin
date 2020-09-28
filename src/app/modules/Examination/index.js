import React from 'react'
import {  Route, Switch } from 'react-router-dom'
import Exams from './pages/exam'
import ExamForm from './pages/examForm'

export default function Student() {
  return (
    <Switch>
      <Route exact path='/Exams'>
        <Exams />
      </Route>
      <Route exact path='/Exams/ExamForm'>
        <ExamForm />
      </Route>
      <Route exact path='/Exams/ExamForm/:examId'>
        <ExamForm />
      </Route>      
    </Switch>
  )
}
