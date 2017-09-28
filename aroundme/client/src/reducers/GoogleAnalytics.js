let ReactGA = require('react-ga');
export default class GoogleAnalytics {
  constructor() {
    ReactGA.initialize('UA-107184191-1', {
      debug: false,
      titleCase: false,
    })
    return ReactGA;
  }
}
