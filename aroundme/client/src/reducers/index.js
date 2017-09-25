import { combineReducers } from "redux"

import app from "./appReducer"
import form from "./formReducer"
import map from "./mapReducer"

export default combineReducers({
  app,
  form,
  map
});