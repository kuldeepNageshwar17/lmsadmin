import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SectionsTest from './pages/SectionTestList'
import TestForm from './pages/TestForm'
import TestQuestion from './pages/testQuestion'
import QuestionForm from './pages/questionForm'
import Question from './pages/question'
import CourseTestForm from './pages/CourseTestForm'
import CourseTestList from './pages/CourseTestList'
import CourseTestQuestions from './pages/CourseTestQuestions'
import CourseTestQuestion from './pages/CourseTestQuestion'
import CourseQuestionForm from './pages/CourseQuestionForm'
import SectionTestList from './pages/SectionalTestList'
import SectionalTestForm from './pages/SectionalTestForm'

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

      <Route exact path='/Test/CourseTest/:id/TestForm'>
        <CourseTestForm/>
      </Route>
      <Route exact path='/Test/CourseTest/:id/TestForm/:TId'>
        <CourseTestForm/>
      </Route>
      <Route exact path='/Test/CourseTest/:id/tests'>
        <CourseTestList/>
      </Route>
      <Route exact path='/Test/CourseTest/:id/Questions'>
        <CourseTestQuestions/>
      </Route>
      <Route exact path='/Test/CourseTest/:id/Question/:qid'>
        <CourseTestQuestion />
      </Route>
      <Route exact path='/Test/CourseTest/:id/QuestionForm'>
        <CourseQuestionForm />
      </Route>
      <Route exact path='/Test/CourseTest/:id/QuestionForm/:qid'>
        <CourseQuestionForm />
      </Route>
      

      <Route exact path='/Test/:id/section/:sid/tests'>
        < SectionTestList />
      </Route>
      <Route exact path='/Test/:id/section/:sid/sectionalTestForm'>
        < SectionalTestForm />
      </Route>
      <Route exact path='/Test/:id/section/:sid/sectionalTestForm/:tid'>
        < SectionalTestForm />
      </Route>
      
      
     
      {/* <Route  exact path='/Student/testprofile' component={StudentProfile} /> */}

     
    </Switch>
  )
}
