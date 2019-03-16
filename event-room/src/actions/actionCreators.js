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
    AJAX_ERROR,
    FETCH_EVENT_BY_ID,
    CREATE_TICKET,
    EDIT_EVENT,
    REMOVE_EVENT,
    APPROVE_EVENT
} from './actionTypes';
import { func } from 'prop-types';

export function getEvent(data) {
    return {
        type: FETCH_EVENT_BY_ID,
        data
    }
}

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

export function editEvent(data) {
    return {
        type: EDIT_EVENT,
        data
    }
}

export function removeEvent(data) {
    return {
        type: REMOVE_EVENT,
        data
    }
}

export function approveEvent(data) {
    return {
        type: APPROVE_EVENT,
        data
    }
}

export function createNewTicket(data) {
    return {
        type: CREATE_TICKET,
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
