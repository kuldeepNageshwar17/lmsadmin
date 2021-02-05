import React from 'react'
import { Route, Switch } from 'react-router-dom'

import FeeManagement from './pages/feeManagement'


export default function FeeManagementIndex () {
  return (
    <Switch>
      
      <Route exact path='/fee'>
        <FeeManagement />
      </Route>
      
    </Switch>
  )
}
