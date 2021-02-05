import React, { useEffect, useState } from 'react'
import {  useDispatch} from "react-redux";
import * as auth from "../../Auth/_redux/authRedux";
import { actionTypes } from "../../Auth/_redux/authRedux";
import { Redirect, Switch, Route ,useHistory } from 'react-router-dom'
import {
  useParams,
} from 'react-router'


export default function ConnectPage () {
    const dispatch = useDispatch()
const {authToken} = useParams()
const history = useHistory()
if(authToken){
    // debugger;
    dispatch({ type: actionTypes.getUserData , payload : { authToken } } )
    history.push('/')
}

 


 
  return (
      <>you are here </>
  )
  
   
}

 
