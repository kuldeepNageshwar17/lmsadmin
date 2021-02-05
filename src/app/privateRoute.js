import React from "react"
import {Redirect , Route} from "react-router-dom"
import { shallowEqual, useSelector    } from 'react-redux'

export default function  PrivateRoute ({component: Component  ,  ...rest}){
    const { isAuthorized } = useSelector(
        ({ auth }) => ({
          isAuthorized: auth.user != null
        }),
        shallowEqual
    )
    console.log("isAuth" , isAuthorized)
    return (
        
        <Route {...rest} render={(props) => (
                isAuthorized ? <Component {...props} /> : window.location.href = "http://localhost:3001/auth/login"
        )} />
    )
}


