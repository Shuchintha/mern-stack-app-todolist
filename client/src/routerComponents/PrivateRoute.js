import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest}>{true ? <Component /> : <Redirect to='/login' />}</Route>
  )
}

export default PrivateRoute
