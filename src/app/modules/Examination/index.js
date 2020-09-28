import React from 'react'
import {  Route, Switch } from 'react-router-dom'
import Exams from './pages/exam'
import ExamForm from './pages/examForm'
import ExamQuestionList from './pages/examQuestions'
import QuestionForm from './pages/questionForm'

export default function Student() {
  return (
    <Switch>
      <Route exact path='/Exams'>
        <Exams />
      </Route>
      <Route exact path='/Exams/ExamForm'>
        <ExamForm />
      </Route>
      <Route exact path='/Exams/ExamForm/:id'>
        <ExamForm />
      </Route>   
      <Route exact path='/Exams/:id/ExamQuestion/'>
        <ExamQuestionList />
      </Route>  
      <Route exact path='/Exams/:id/QuestionForm/'>
        <QuestionForm />
      </Route>  
      <Route exact path='/Exams/:id/QuestionForm/:qid'>
        <QuestionForm />
      </Route>       
    </Switch>
  )
}
