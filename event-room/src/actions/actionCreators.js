import {
  REGISTER,
  LOGIN,
  REDIRECTED,
  FETCH_APPROVED_EVENTS,
  FETCH_SEARCH_EVENTS,
  AJAX_ERROR
} from './actionTypes';

export function register(data) {
    return {
        type: REGISTER
    }
}

export function login(data) {
    return {
        type: LOGIN,
        data
    }
}

export function redirect() {
    return {
        type: REDIRECTED
    }
}

export function ajaxError(msg) {
    return {
        type: AJAX_ERROR,
        msg
    }
}

export function searchFetch(data) {
    return {
        type: FETCH_SEARCH_EVENTS,
        data
    }
}

export function getApprovedEvents(data) {
    return {
        type: FETCH_APPROVED_EVENTS,
        data
    }
}
