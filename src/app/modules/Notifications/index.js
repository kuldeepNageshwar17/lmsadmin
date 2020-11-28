import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Notifications from './pages/Notifications'

export default function Notification () {
  return (
    <Switch>
      
      <Route exact path='/Notifications'>
        <Notifications />
      </Route>
      
    </Switch>
  )
}
