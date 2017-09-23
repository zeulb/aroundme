export const Page = Object.freeze({
    MAIN: Symbol("main"),
    LOGIN: Symbol("login"),
    SETTING: Symbol("setting"),
    ADD: Symbol("add"),
    SELECT_LOCATION: Symbol("select_location")
});

export function switchPage(page) {
  return {
    type: "SWITCH_PAGE",
    payload: page
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

export function login(rawData) {
  return {
    type: "LOGIN",
    payload: rawData
  }
}

export function logout() {
  return {
    type: "LOGOUT"
  }
}