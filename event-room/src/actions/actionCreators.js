import {
  REGISTER,
  LOGIN,
  REDIRECTED,
  FETCH_APPROVED_EVENTS,
  AJAX_BEGIN,
  AJAX_ERROR
} from './actionTypes';

export function register() {
    return {
        type: REGISTER
    }
}

export function login() {
    return {
        type: LOGIN
    }
}

export function redirect() {
    return {
        type: REDIRECTED
    }
}

export function ajaxBegin() {
    return {
        type: AJAX_BEGIN
    }
}

export function ajaxError(error) {
    return {
        type: AJAX_ERROR,
        error
    }
}

export function getApprovedEvents() {
    return {
        type: FETCH_APPROVED_EVENTS
    }
}
