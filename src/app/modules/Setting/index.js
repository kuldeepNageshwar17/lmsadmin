import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Classes from './pages/classes'
import ClassForm from './pages/classForm'
import Branches from './pages/branches'
import BranchForm from './pages/branchForm'
import Batches from './pages/batches'
import BatchForm from './pages/batchForm'
import Courses from './pages/Courses'
import CourseForm from './pages/CourseForm'
import CourseSections from './pages/CourseSections'
import CourseSectionform from './pages/CourseSectionform'
import ContentText from './pages/ContentText'
import ContentPdf from './pages/ContentPdf'
import ContentVideo from './pages/ContentVideo'
import ContentAudio from './pages/ContentAudio'
import ContentAll from './pages/ContentAll'



export default function ECourse () {
  return (
    <Switch>
      <Route exact path='/setting/class' component={Classes} />
      <Route exact path='/setting/Branch' component={Branches} />
      <Route exact path='/setting/Batch' component={Batches} />

      <Route exact path='/setting/classForm' component={ClassForm} />
      <Route exact path='/setting/branchForm' component={BranchForm} />
      <Route exact path='/setting/BatchForm/' component={BatchForm} />

      <Route path='/setting/branchForm/:id'>
        <BranchForm />
      </Route>
      <Route exact path='/setting/CourseForm/:id'>
        <CourseForm />
      </Route>
      <Route path='/setting/classForm/:id'>
        <ClassForm />
      </Route>
      <Route exact path='/setting/BatchForm/:id'>
        <BatchForm />
      </Route>

      <Route exact path='/setting/CourseForm/:id/:cid'>
        <CourseForm />
      </Route>
      <Route exact path='/setting/Courses/:id'>
        <Courses />
      </Route>
      <Route exact path='/setting/course/:id/sections'>
        < CourseSections />
      </Route>
      <Route exact path='/setting/course/:cid/sectionForm'>
        < CourseSectionform />
      </Route>
      <Route exact path='/setting/course/:cid/sectionForm/:id'>
        < CourseSectionform />
      </Route>
      <Route exact path='/setting/course/section/:id/content'>
        < ContentAll />
      </Route>
      <Route exact path='/setting/course/section/:id/content/text'>
        < ContentText />
      </Route>
      <Route exact path='/setting/course/section/:id/content/video'>
        < ContentVideo />
      </Route>
      <Route exact path='/setting/course/section/:id/content/audio'>
        < ContentAudio />
      </Route>
      <Route exact path='/setting/course/section/:id/content/pdf'>
        < ContentPdf />
      </Route>
      <Route exact path='/setting/course/section/:id/content/:cid'>
        <ContentVideo/>
      </Route>
      
{/* 
      <Redirect to='/error/error-v1' /> */}
    </Switch>
  )
}
