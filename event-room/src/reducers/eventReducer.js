import { FETCH_APPROVED_EVENTS, FETCH_PENDING_EVENTS, CREATE_EVENT, FETCH_USER_EVENTS, FETCH_USER_TICKETS } from './../actions/actionTypes';

// const defaultState = {
//      events: [],
//      createdEvent: {},
//      editedEvent:{},
//      deletedEvent: {},
//      userEvents: {},
//      userTickets: {}
//     };

export default function eventReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_APPROVED_EVENTS:
      return Object.assign({}, state, {events: action.data.events});
        case FETCH_PENDING_EVENTS:
            return Object.assign({}, state, {pendingEvents: action.data.events});
        case CREATE_EVENT:  
       return Object.assign({}, state, {createdEvent: action.data});
       case FETCH_USER_EVENTS:
       return Object.assign({}, state, {userEvents: action.data.events});
       case FETCH_USER_TICKETS:
       return Object.assign({}, state, {userTickets: action.data.tickets});
        default:
            return state;
    }
}