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
  'description': 'description',
  'firstTime': 'first_time',
}
const cachedFields = ['id', 'session', 'fbId', 'fullName', 'firstName', 'lastName', 'pictureUrl', 'description'];

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
    user: {
      ...userInfo,
      name: userInfo.fullName
    }
  };
}

export default function reducer(state={
    page: localStorage.getItem('session') ? Page.MAIN : Page.SPLASH,
    pageArg: {},
    drawerOpen: false,
    feedExpandedEvent: null,
    ga: new GoogleAnalytics(),
    images: [],
    startImageIndex: 0,
    recentlyLoggedIn: localStorage.getItem('session') ? true : false,
    ...fetchFromCache()
  }, action) {

  var ga = new GoogleAnalytics()
  switch (action.type) {
    case "SWITCH_PAGE": {
      ga.pageview("/" + action.payload.page.toString());
      return {...state, page: action.payload.page, pageArg: {...state.pageArg, ...action.payload.arg}, drawerOpen: false, feedExpandedEvent: null};
    }
    case "SET_DESCRIPTION": {
      return {...state, user: {...state.user, description: action.payload.description}}
    }
    case "DISPLAY_IMAGES": {
      return {...state, images: action.payload.images, startImageIndex: action.payload.startIndex}
    }
    case "CLOSE_IMAGES": {
      return {...state, images: []}
    }
    case "OPEN_DRAWER": {
      return {...state, drawerOpen: true};
    }
    case "CLOSE_DRAWER": {
      return {...state, drawerOpen: false};
    }
    case "EXPAND_EVENT": {
      return {...state, feedExpandedEvent: action.payload};
    }
    case "COLLAPSE_EVENT": {
      return {...state, feedExpandedEvent: null};
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
      userInfo['firstTime'] = action.payload[fieldMapping['firstTime']];
      localStorage.setItem('firstTime', false);

      return {
        ...state,
        isLoggedIn: true,
        recentlyLoggedIn: true,
        user: {
          ...userInfo,
          name: userInfo.fullName
        }
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
      return {...state, isLoggedIn: false, recentlyLoggedIn: false, user: {}, page: Page.SPLASH, drawerOpen: false }
    }
    case "NOT_RECENTLY_LOGGED_IN": {
      return {...state, recentlyLoggedIn: false}
    }
    default:
      return state;
  }
}
