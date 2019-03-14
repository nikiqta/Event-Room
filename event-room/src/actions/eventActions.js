import { fetchEditEvent, fetchEvent, fetchSearchPage, fetchPendingEvents, fetchApprovedEvents, createEvent, fetchUserEvents, fetchUserTickets } from "../api/remote";
import {
     ajaxError,
    getApprovedEvents,
    getPendingEvents,
    createNewEvent,
    getUserEvents,
    getUserTickets,
    getEvent,
    editEvent
} from "./actionCreators";

export function getEventThunk(eventId) {
    return async (dispatch) => {
        try {
            const data = await fetchEvent(eventId);
            dispatch(getEvent(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function fetchEventsThunk() {
    return async (dispatch) => {
        try {
            const data = await fetchApprovedEvents();
            dispatch(getApprovedEvents(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function fetchPendingEventsThunk() {
    return async (dispatch) => {
        try {
            const data = await fetchPendingEvents();
            dispatch(getPendingEvents(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function fetchSearchThunk() {
    return async (dispatch) => {
        try {
            const data = await fetchApprovedEvents();
            dispatch(getApprovedEvents(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function createEventThunk(props) {
    return async (dispatch) => {
        try {
            const data = await createEvent(props);
            dispatch(createNewEvent(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function editEventThunk(props, eventId) {
    return async (dispatch) => {
        try {
            const data = await fetchEditEvent(props, eventId);
            dispatch(editEvent(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function getUserEventsThunk(userId) {
    return async (dispatch) => {
        try {
            const data = await fetchUserEvents(userId);
            dispatch(getUserEvents(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function getUserTicketsThunk(userId) {
    return async (dispatch) => {
        try {
            const data = await fetchUserTickets(userId);
            dispatch(getUserTickets(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}