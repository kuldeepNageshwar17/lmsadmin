import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menus from './pages/menus'

import Permission from './pages/permissions'

export default function Student () {
  return (
    <Switch>
      <Route exact path='/permission/Menus'>
        <Menus />
      </Route>
      {/* <Route exact path='/permission/MenuForm'>
        <MenusForm />
      </Route>
      <Route exact path='/permission/MenuForm/:id'>
        <MenusForm />
      </Route> */}
      <Route exact path='/permission/permissions'>
        <Permission />
      </Route>
      {/* <Route exact path='/permission/permissionForm'>
        <PermissionForm />
      </Route>
      <Route exact path='/permission/permissionForm/:id'>
        <PermissionForm />
      </Route> */}
    </Switch>
  )
}
