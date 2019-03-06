import { fetchSearchPage } from "../api/remote";
import {
     ajaxError,
     searchFetch
} from "./actionCreators";

export function fetchSearchThunk(query, page) {
    return async (dispatch) => {

        try {
            const data = await fetchSearchPage(query, page);
            dispatch(searchFetch(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}