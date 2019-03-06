import { LOGIN, REGISTER, AJAX_ERROR } from './../actions/actionTypes';

export function registerReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, state, action.data);
    case AJAX_ERROR:
      return Object.assign({}, state, action.msg);
    default:
      return state;
  }
}

export function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, action.data);
    case AJAX_ERROR:
      return Object.assign({}, state, action.msg);
    default:
      return state;
  }
}
