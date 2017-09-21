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