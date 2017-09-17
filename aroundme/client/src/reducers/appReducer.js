import { Page } from "../actions/appActions"

export default function reducer(state={
    page: Page.MAIN
  }, action) {

  switch (action.type) {
    case "SWITCH_PAGE": {
      return {...state, page: action.payload};
    }
    default:
      return state;
  }
}