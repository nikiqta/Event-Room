import { FETCH_APPROVED_EVENTS, CREATE_EVENT } from './../actions/actionTypes';

export default function eventReducer(state = [], action) {
    switch (action.type) {
        case FETCH_APPROVED_EVENTS:
            return action.data.events;
        case CREATE_EVENT: 
        return Object.assign({}, state, action.data);    
        default:
            return state;
    }
}