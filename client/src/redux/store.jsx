import { configureStore, combineReducers } from "@reduxjs/toolkit"
import alertSlice  from "./alertSlice"
import userSlice from "./userSlice"

const rootReducer = combineReducers({
  alerts: alertSlice,
  users: userSlice
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
