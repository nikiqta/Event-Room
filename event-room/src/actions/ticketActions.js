import { createTicket } from "../api/remote";
import {
    ajaxError,
    createNewTicket
} from "./actionCreators";
import {createEvent} from "../api/remote";

export function createTicketThunk(props) {
    return async (dispatch) => {
        try {
            const data = await createTicket(props);
            dispatch(createNewTicket(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}