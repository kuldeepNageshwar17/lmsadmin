// store.js
import React, { createContext, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const initialState = { permission: {} }
const permissionsContext = createContext(initialState)
const { Provider } = permissionsContext

const PermissionsProvider = ({ children }) => {
  const { permission } = useSelector(({ auth }) => {
    return { permission: auth.userPermission }
  }, shallowEqual)
  useEffect(() => {
    // console.log('permissions :', user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isUserAuthenticate = (module, perm) => {
    console.log(module, perm)
    console.log(permission)
    if (permission) {
      return permission.some(m => m.module === module && m.permission === perm)
    }

    return false
  }
  return <Provider value={{ isUserAuthenticate }}>{children}</Provider>
}

export { permissionsContext, PermissionsProvider }
