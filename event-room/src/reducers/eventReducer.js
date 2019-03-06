import { FETCH_APPROVED_EVENTS } from './../actions/actionTypes';

export default function eventReducer(state = [], action) {
    switch (action.type) {
        case FETCH_APPROVED_EVENTS:
            return action.data.events;
        default:
            return state;
    }
}