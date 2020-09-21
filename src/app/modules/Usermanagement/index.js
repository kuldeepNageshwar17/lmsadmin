import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import users from "./pages/UserList"
import UserProfile from "./pages/userProfile"
import UserForm from "./pages/Userform"



export default function  UserManagement() {
  return (
    <Switch>
      {
        /* Redirect from root URL to /dashboard. */
      }    
 			<Route  path='/User/UserForm/:id'>
        <UserForm />
      </Route>   


      <Route exact  path='/User' component={users} />      
      <Route path='/User/UserForm' component={UserForm} />      
      <Route  path='/User/user/:id'>
        <UserProfile />
      </Route>   
      <Route  path='/User/testProfile/'>
        <UserProfile/>
      </Route>   
     </Switch>
  )
}
