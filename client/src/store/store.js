import { combineReducers, createStore } from 'redux'
import {
  userLoginReducer,
  userRegisterReducer,
  uiUpdateReducer,
} from './reducers/userReducers'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  uiUpdate: uiUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = { userLogin: { userInfo: userInfoFromStorage } }

export const store = createStore(reducer, initialState)
