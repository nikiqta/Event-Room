import { APPROVE_EVENT, REMOVE_EVENT , EDIT_EVENT, FETCH_APPROVED_EVENTS, FETCH_PENDING_EVENTS, CREATE_EVENT, FETCH_USER_EVENTS, FETCH_USER_TICKETS, FETCH_EVENT_BY_ID } from './../actions/actionTypes';

export default function eventReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_APPROVED_EVENTS:
      return Object.assign({}, state, {events: action.data.events});
        case FETCH_PENDING_EVENTS:
            return Object.assign({}, state, {pendingEvents: action.data.events});
        case CREATE_EVENT:  
       return Object.assign({}, state, {createdEvent: action.data});
       case EDIT_EVENT:  
       return Object.assign({}, state, {editedEvent: action.data});
        case REMOVE_EVENT:
            return Object.assign({}, state, {removedEvent: action.data});
        case APPROVE_EVENT:
            return Object.assign({}, state, {approvedEvent: action.data});
       case FETCH_USER_EVENTS:
       return Object.assign({}, state, {userEvents: action.data.events});
        case FETCH_EVENT_BY_ID:
            return Object.assign({}, state, {eventDetails: action.data.event});
       case FETCH_USER_TICKETS:
       return Object.assign({}, state, {userTickets: action.data.tickets});
        default:
            return state;
    }
}