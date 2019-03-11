import { userLogin, userRegister } from './../api/remote.js';
import { register, login, ajaxError } from './actionCreators';

function registerThunk(data) {
  return dispatch => {
    return userRegister(data).then(json => {
      if (json.success) {
        dispatch(register(json));
      }else {
        dispatch(ajaxError(json));
      }
    });
  };
}

function loginThunk(username, password) {
  return dispatch => {
    return userLogin(username, password).then(json => {
      if (json.success) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.username);
        localStorage.setItem('userId', json.userId);
        localStorage.setItem('isAdmin', json.isAdmin);
        dispatch(login(json));
      } else {
        dispatch(ajaxError(json));
      }
    });
  };
}

function logoutThunk() {
  return dispatch => {
    localStorage.clear();
  };
}

export { registerThunk, loginThunk, logoutThunk };
