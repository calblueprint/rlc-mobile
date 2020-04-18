import settings from '../config/settings'
import queryString from 'query-string'
import { AsyncStorage } from 'react-native';
import {Cookie} from 'tough-cookie'

/**
 * Request function for POST, PUT, DELETE requests. (doesn't catch error. used for batch)
 * @param type - request type
 * @param route - request route
 * @param successFunc - success handler
 * @param errorFunc - error handler
 * @param params - body params
 */
async function requestNoCatch(type, route, successFunc, errorFunc, params=null, shouldUseAltRoute=false) {
  let cookie = await AsyncStorage.getItem('cookie')
  let host = shouldUseAltRoute ? settings.ALT_URL : settings.URL;
  if(shouldUseAltRoute) {
    console.log("Warning, sending " + type + " request to alternate host to fake error: " + host);
  } else {
    console.log("Sending " + type + " request to host: " + host + " at route: " + route);
  }
  return fetch(`${host}${route}`, {
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'cookie': cookie ? cookie : ''
    },
    credentials: "omit",
    body: JSON.stringify(params)})
    .then(function(response) {
      if (response.ok) {
        if (route == '/users/sign_in') {
          let cookie = response.headers.get('set-cookie')
          cookie = cookie.split(',')[1]
          cookie = Cookie.parse(cookie)
          cookie = cookie.cookieString()
          AsyncStorage.setItem('cookie', cookie)
        }
        return response.json()
        .then(function(object) {
          return successFunc(object);
        })
      } else {
        return response.json().then(function(error) {
          return errorFunc(error);
        })
      }
    });
}

/**
 * Request function for POST, PUT, DELETE requests.
 * @param type - request type
 * @param route - request route
 * @param successFunc - success handler
 * @param errorFunc - error handler
 * @param params - body params
 */
function request(type, route, successFunc, errorFunc, params=null, shouldUseAltRoute=false) {
  return requestNoCatch(type, route, successFunc, errorFunc, params, shouldUseAltRoute)
    .catch(function(error) {
      errorFunc(error);
      console.log(error);
    });
}

/**
 * Request function for GET requests. Same params as request except doesn't take in type and:
 * @param params - URL query params
 */
 async function getRequest(route, successFunc, errorFunc, params=null, shouldUseAltRoute=false) {
  let cookie = await AsyncStorage.getItem('cookie')
  let host = shouldUseAltRoute ? "http://localhost:3001" : settings.URL;
  if(shouldUseAltRoute) {
     console.log("Warning, sending GET request to alternate host to fake error: " + host);
  }
  const url = params ? `${host}${route}/?${queryString.stringify(params)}` : `${host}${route}`;
  console.log("Sending GET request to url: " + url);
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'cookie': cookie ? cookie : ''
    },
    credentials: "omit"
    })
    .then(function(response) {
      if (response.ok) {
        return response.json().then(function(object) {
          return successFunc(object);
        })
      } else {
        return response.json().then(function(error) {
          return errorFunc(error);
        })
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

/**
 * Wrapper method for POST request.
 */
function postRequest(route, successFunc, errorFunc, params='{}', shouldUseAltRoute=false) {
  return request('POST', route, successFunc, errorFunc, params, shouldUseAltRoute);
}

/**
 * Wrapper method for POST request with no catch.
 */
function postRequestNoCatch(route, successFunc, errorFunc, params='{}', shouldUseAltRoute=false) {
  return requestNoCatch('POST', route, successFunc, errorFunc, params, shouldUseAltRoute);
}

/**
 * Wrapper method for PUT request.
 */
function putRequest(route, successFunc, errorFunc, params='{}', shouldUseAltRoute=false) {
  return request('PUT', route, successFunc, errorFunc, params, shouldUseAltRoute);
}

/**
 * Wrapper method for PUT request with no catch.
 */
function putRequestNoCatch(route, successFunc, errorFunc, params='{}', shouldUseAltRoute=false) {
  return requestNoCatch('PUT', route, successFunc, errorFunc, params, shouldUseAltRoute);
}

/**
 * Wrapper method for DELETE request.
 */
function deleteRequest(route, successFunc, errorFunc, params='{}', shouldUseAltRoute=false) {
  return request('DELETE', route, successFunc, errorFunc, params, shouldUseAltRoute);
}

export { getRequest, postRequest, putRequest, deleteRequest, postRequestNoCatch, putRequestNoCatch }