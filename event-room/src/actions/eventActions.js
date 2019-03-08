import { fetchSearchPage, fetchApprovedEvents, createEvent, fetchUserEvents, fetchUserTickets } from "../api/remote";
import {
     ajaxError,
    getApprovedEvents,
    createNewEvent,
    getUserEvents,
    getUserTickets
} from "./actionCreators";

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