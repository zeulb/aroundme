import { combineReducers } from "redux"

import app from "./appReducer"
import form from "./formReducer"

export default combineReducers({
  app,
  form
})