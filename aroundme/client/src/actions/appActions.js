const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const apiUrl = appConfig[nodeEnv].api;

export const Page = Object.freeze({
    MAIN: Symbol("main"),
    LOGIN: Symbol("login"),
    SPLASH: Symbol("splash"),
    SETTING: Symbol("setting"),
    ADD: Symbol("add"),
    SELECT_LOCATION: Symbol("select_location"),
    MAP_FEED: Symbol("map_feed"),
    MY_FEED: Symbol("my_feed"),
    POPULAR_FEED: Symbol("popular_feed"),
    HELP: Symbol("help")
});

export function onboardingDone() {
  return {
    type: "ONBOARDING_DONE"
  }
}

export function switchPage(page, arg) {
  return {
    type: "SWITCH_PAGE",
    payload: {
      page: page,
      arg: arg
    }
  }
}

export function displayImages(images, startIndex) {
  return {
    type: "DISPLAY_IMAGES",
    payload: {
      images,
      startIndex
    }
  }
}

export function closeImages() {
  return {
    type: "CLOSE_IMAGES"
  }
}

export function openDrawer() {
  return {
    type: "OPEN_DRAWER"
  }
}

export function closeDrawer() {
  return {
    type: "CLOSE_DRAWER"
  }
}

export function setNotRecentlyLoggedIn() {
  return {
    type: "NOT_RECENTLY_LOGGED_IN"
  }
}

export function login(data) {
  var formData = new FormData();
  formData.append('facebook_id', data.facebookId);
  formData.append('access_token', data.accessToken);
  formData.append('name', data.fullName);
  formData.append('first_name', data.firstName);
  formData.append('last_name', data.lastName);
  formData.append('facebook_pic_url', data.pictureUrl);

  return {
    type: "LOGIN",
    payload: fetch(apiUrl + "/users", {
      method: "POST",
      body: formData
    }).then(response => response.json())
  }
}

export function logout() {
  return {
    type: "LOGOUT"
  }
}

export function editDescription(description) {
  return (dispatch, getState) => {
    const state = getState();
    var formData = new FormData();
    formData.append('user_id', state.app.user.id);
    formData.append('session_id', state.app.user.session);
    formData.append('description', description);

    dispatch({
      type: "SET_DESCRIPTION",
      payload: {
        description
      }
    });
    dispatch({
      type: "POST_DESCRIPTION",
      payload: fetch(apiUrl + `/users`, {
        method: "POST",
        body: formData
      }).then(response => response.json())
    });
  }
}

export function mapReady() {
  return {
    type: "MAP_READY"
  };
}

export function expandEvent(event) {
  return {
    type: "EXPAND_EVENT",
    payload: event
  };
}

export function collapseEvent() {
  return {
    type: "COLLAPSE_EVENT"
  };
}
