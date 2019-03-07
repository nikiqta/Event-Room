import { fetchSearchPage, fetchApprovedEvents, createEvent } from "../api/remote";
import {
     ajaxError,
    getApprovedEvents,
    createNewEvent
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
    debugger;
    return async (dispatch) => {
        try {
            const data = await createEvent(props);
            dispatch(createNewEvent(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}