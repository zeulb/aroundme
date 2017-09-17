export const Page = Object.freeze({
    MAIN: Symbol("main"),
    LOGIN: Symbol("login"),
    SETTING: Symbol("setting"),
    ADD: Symbol("add")
});

export function switchPage(page) {
  return {
    type: "SWITCH_PAGE",
    payload: {
      page
    }
  }
}