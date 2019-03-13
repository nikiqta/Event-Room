import { CREATE_TICKET } from './../actions/actionTypes';

export default function ticketReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_TICKET:
            return Object.assign({}, state, {ticket: action.data});
        default:
            return state;
    }
}