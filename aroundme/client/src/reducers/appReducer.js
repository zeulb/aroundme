import { Page } from "../actions/appActions"
import GoogleAnalytics from "./GoogleAnalytics"

const fieldMapping = {
  'id': 'user_id',
  'fbId': 'facebook_id',
  'session': 'session_id',
  'fullName': 'name',
  'firstName': 'first_name',
  'lastName': 'last_name',
  'pictureUrl': 'facebook_pic_url',
}
const cachedFields = ['id', 'session', 'fbId', 'fullName', 'firstName', 'lastName', 'pictureUrl'];

const fetchFromCache = () => {
  const isLoggedIn = localStorage.getItem('session') ? true : false;
  let userInfo = {};

  if (isLoggedIn) {
    cachedFields.forEach(field => {
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
    ga: new GoogleAnalytics(),
    ...fetchFromCache()
  }, action) {

  var ga = new GoogleAnalytics()
  switch (action.type) {
    case "SWITCH_PAGE": {
      ga.pageview("/" + action.payload.toString());
      return {...state, page: action.payload};
    }
    case "OPEN_DRAWER": {
      return {...state, drawerOpen: true};
    }
    case "CLOSE_DRAWER": {
      return {...state, drawerOpen: false};
    }
    case "LOGIN_PENDING": {
      return {...state};
    }
    case "LOGIN_REJECTED": {
      return {...state};
    }
    case "LOGIN_FULFILLED": {
      ga.event({
        category: 'User',
        action: 'Logged in'
      });
      var userInfo = {};
      cachedFields.forEach(field => {
        userInfo[field] = action.payload[fieldMapping[field]];
        localStorage.setItem(field, userInfo[field]);
      });

      return {
        ...state,
        isLoggedIn: true,
        user: userInfo
      };
    }
    case "LOGOUT": {
      ga.event({
        category: 'User',
        action: 'Logged out'
      });
      cachedFields.forEach(field => {
        localStorage.removeItem(field);
      });
      return {...state, isLoggedIn: false, user: {}}
    }
    default:
      return state;
  }
}
