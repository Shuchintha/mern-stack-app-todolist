import { combineReducers, createStore } from 'redux'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = { userLogin: { userInfo: userInfoFromStorage } }

export const store = createStore(reducer, initialState)
