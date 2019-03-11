import {
    REGISTER,
    LOGIN,
    REDIRECTED,
    FETCH_APPROVED_EVENTS,
    FETCH_PENDING_EVENTS,
    FETCH_SEARCH_EVENTS,
    FETCH_USER_EVENTS,
    FETCH_USER_TICKETS,
    CREATE_EVENT,
    AJAX_ERROR
} from './actionTypes';

export function register(data) {
    return {
        type: REGISTER,
        data
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

export function getPendingEvents(data) {
    return {
        type: FETCH_PENDING_EVENTS,
        data
    }
}

export function createNewEvent(data) {
    return {
        type: CREATE_EVENT,
        data
    }
}

export function getUserEvents(data) {
    return {
        type: FETCH_USER_EVENTS,
        data
    }
}

export function getUserTickets(data) {
    return {
        type: FETCH_USER_TICKETS,
        data
    }
}
