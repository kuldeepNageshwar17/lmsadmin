import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Classes from './pages/classes'
import ClassForm from './pages/classForm'
import Branches from './pages/branches'
import BranchForm from './pages/branchForm'
import Batches from './pages/batches'
import BatchForm from './pages/batchForm'

export default function ECourse () {  
  return (
    <Switch>
      <Route exact path='/setting/class' component={Classes} />
      <Route exact path='/setting/Branch' component={Branches} />
      <Route exact path='/setting/Batch' component={Batches} />

      <Route exact path='/setting/classForm' component={ClassForm} />
      <Route exact path='/setting/branchForm' component={BranchForm} />
      <Route exact path='/setting/BatchForm/'   component={BatchForm} />
      
      <Route  path='/setting/branchForm/:id'>
        <BranchForm />
      </Route>
      <Route path='/setting/classForm/:id'>
        <ClassForm />
      </Route>
      <Route exact  path='/setting/BatchForm/:id'>
        <BatchForm />
      </Route>
     
      <Redirect to='/error/error-v1' />
    </Switch>
  )
}
