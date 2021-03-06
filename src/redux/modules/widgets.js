
import get from 'lodash/get';
import {immutable} from 'utils';

const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';

const initialState = immutable({
  loaded: false,
  editing: {},
  saveError: {}
});

// State domain: widgets
const DOMAIN = 'widgets';

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
        data: action.result,
        error: null
      });
    case LOAD_FAIL:
      return state.merge({
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      });
    case EDIT_START:
      return state.merge({
        editing: {
          ...state.editing,
          [action.id]: true
        }
      });
    case EDIT_STOP:
      return state.merge({
        editing: {
          ...state.editing,
          [action.id]: false
        }
      });
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return state.merge({
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      });
    case SAVE_FAIL:
      return state.merge(typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : {});
    default:
      return immutable(state);
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/widget/update', {
      data: widget
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}

export const getWidgetsSelector = state => get(state, DOMAIN);
