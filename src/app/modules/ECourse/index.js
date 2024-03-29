import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Courses from './pages/Courses'
import NewCourse from './pages/NewCourse'
import AddCourseContent from './pages/CourseContent'
import SectionEditDilogue from './components/SectionEditDilogue'
import ContentEditDilogue from './components/ContentEditDilogue'
import CourseDetails from './pages/CourseDetails'

export default function ECourse () {
  return (
    <Switch>
      {       
        <Redirect exact from='/ecourse' to='/ecourse/courses' />
      }
      <Route exact path='/Ecourse/CourseContent/section'>
        {({ history, match }) => (
          <SectionEditDilogue
            show={match != null}
            match
            onHide={() => {
              history.push('/Ecourse/CourseContent')
            }}
          />
        )}
      </Route>
      <Route exact  path='/Ecourse/CourseContent/Section/Content'>
        {({ history, match }) => (
          <ContentEditDilogue
            show={match != null}
            match
            onHide={() => {
              history.push('/Ecourse/CourseContent')
            }}
          />
        )}
      </Route>
      <Route path='/ecourse/courses' component={Courses} />
      <Route path='/ecourse/courseOverview/:courseId' component={CourseDetails} />
      <Route path='/ecourse/newcourse' component={NewCourse} />
      <Route path='/ecourse/CourseContent/' component={AddCourseContent} />
      <Redirect to='/error/error-v1' />
    </Switch>
  )
}
