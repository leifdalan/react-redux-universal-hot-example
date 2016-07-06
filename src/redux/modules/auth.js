
import get from 'lodash/get';
import {immutable} from 'utils';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const initialState = immutable({
  loaded: false
});

// State domain: auth
const DOMAIN = 'auth';
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state.merge({
        loading: true
      });
    case LOAD_SUCCESS:
      return state.merge({
        loading: false,
        loaded: true,
        user: action.result
      });
    case LOAD_FAIL:
      return state.merge({
        loading: false,
        loaded: false,
        error: action.error
      });
    case LOGIN:
      return state.merge({
        loggingIn: true
      });
    case LOGIN_SUCCESS:
      return state.merge({
        loggingIn: false,
        user: action.result
      });
    case LOGIN_FAIL:
      return state.merge({
        loggingIn: false,
        user: null,
        loginError: action.error
      });
    case LOGOUT:
      return state.merge({
        loggingOut: true
      });
    case LOGOUT_SUCCESS:
      return state.merge({
        loggingOut: false,
        user: null
      });
    case LOGOUT_FAIL:
      return state.merge({
        loggingOut: false,
        logoutError: action.error
      });
    default:
      return immutable(state);
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

export const getUserSelector = state => get(state, `${DOMAIN}.user`);
