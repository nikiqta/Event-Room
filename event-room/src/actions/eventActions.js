import { fetchSearchPage, fetchApprovedEvents } from "../api/remote";
import {
     ajaxError,
    getApprovedEvents
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

export function fetchSearchThunk(query, page) {
    return async (dispatch) => {
        try {
            const data = await fetchApprovedEvents();
            dispatch(getApprovedEvents(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}