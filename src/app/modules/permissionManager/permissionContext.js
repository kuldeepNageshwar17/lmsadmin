// store.js
import React, { createContext, useReducer, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const initialState = { menus: [], permission: {} }
const permissionsContext = createContext(initialState)
const { Provider } = permissionsContext

const PermissionsProvider = ({ children }) => {
  const { menus,permission } = useSelector(({ auth }) => {
    debugger
    return { menus: auth.user.menus, permission: auth.user.permission }
  }, shallowEqual)
  useEffect(() => {
    // console.log('permissions :', user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Provider value={{ menus,permission }}>{children}</Provider>
}

export { permissionsContext, PermissionsProvider }
