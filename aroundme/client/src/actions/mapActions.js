const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const apiUrl = appConfig[nodeEnv].api;

export function fetchMap(images) {
  return {
    type: "FETCH_GEOJSON",
    payload: fetch(apiUrl + "/events", {
      method: "GET"
    }).then(response => response.json())
  }
}