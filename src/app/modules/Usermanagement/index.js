import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import users from './pages/UserList'
import UserProfile from './pages/userProfile'
import BranchuserForm from './pages/branchuserForm'
import UserForm from './pages/Userform'
import BranchUserList from './pages/branchUserList'
import { permissionsContext } from '../permissionManager/permissionContext'

export default function UserManagement () {
  const { isUserAuthenticate } = useContext(permissionsContext)

  return (
    <Switch>
      {/* Redirect from root URL to /dashboard. */}
      <Route path='/User/UserForm/:id'>
        <UserForm />
      </Route>
      {isUserAuthenticate('M3', 1) && (<Route exact path='/User' component={users} />)}
      <Route exact path='/User/BranchUser' component={BranchUserList} />
      <Route exact path='/User/UserForm' component={UserForm} />
      <Route exact path='/User/BranchUserForm' component={BranchuserForm} />
      <Route path='/User/UserForm/:id'>
        <UserProfile />
      </Route>
      <Route path='/User/BranchuserForm/:id'>
        <BranchuserForm />
      </Route>
      <Route path='/User/testProfile/'>
        <UserProfile />
      </Route>
    </Switch>
  )
}
