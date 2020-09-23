import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import users from "./pages/UserList"
import UserProfile from "./pages/userProfile"
import BranchuserForm from "./pages/branchuserForm"
import UserForm from "./pages/Userform"
import BranchUserList from "./pages/branchUserList"


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
      <Route exact  path='/User/BranchUser' component={BranchUserList} />      
      <Route exact path='/User/UserForm' component={UserForm} />      
      <Route exact path='/User/BranchUserForm' component={BranchuserForm} />      
      <Route  path='/User/UserForm/:id'>
        <UserProfile />
      </Route>   
      <Route  path='/User/BranchuserForm/:id'>
        <BranchuserForm/>
      </Route>   
      <Route  path='/User/testProfile/'>
        <UserProfile/>
      </Route>   
     
     </Switch>
  )
}
