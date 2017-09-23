import { Page } from "../actions/appActions"

const fbCacheFields = ['id', 'fbId', 'fullName', 'firstName', 'lastName', 'pictureUrl'];

const fetchFromCache = () => {
  const isLoggedIn = localStorage.getItem('fbId') ? true : false;
  let userInfo = {};

  if (isLoggedIn) {
    fbCacheFields.forEach(field => {
      userInfo[field] = localStorage.getItem(field)
    });
  }

  return {
    isLoggedIn,
    user: userInfo
  };
}

export default function reducer(state={
    page: Page.MAIN,
    drawerOpen: false,
    ...fetchFromCache()
  }, action) {

  switch (action.type) {
    case "SWITCH_PAGE": {
      return {...state, page: action.payload};
    }
    case "OPEN_DRAWER": {
      return {...state, drawerOpen: true};
    }
    case "CLOSE_DRAWER": {
      return {...state, drawerOpen: false};
    }
    case "LOGIN": {
      fbCacheFields.forEach(field => {
        localStorage.setItem(field, action.payload[field]);
      });
      return {...state, isLoggedIn: true, user: action.payload};
    }
    case "LOGOUT": {
      fbCacheFields.forEach(field => {
        localStorage.removeItem(field);
      });
      return {...state, isLoggedIn: false, user: {}}
    }
    default:
      return state;
  }
}