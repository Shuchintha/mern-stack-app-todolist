import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  const userInfo = useSelector(state => state.userLogin.userInfo)
  return (
    <Route {...rest}>
      {userInfo?.isAdmin ? <Component /> : <Redirect to='/' />}
    </Route>
  )
}

export default PrivateRoute
