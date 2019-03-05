import {LOGIN, REGISTER, REDIRECTED} from "./../actions/actionTypes";

export function registerReducer(state = {success: false}, action) {
    switch (action.type) {
        case REGISTER:
          return  Object.assign({}, state, {success: true});
        case LOGIN:
            return  Object.assign({}, state, {success: false});
        case REDIRECTED:
            return  Object.assign({}, state, {success: false});
        default:
            return state;
    }
}

export function loginReducer(state = {success: false}, action) {
    switch (action.type) {

        case LOGIN:
            return  Object.assign({}, state, {success: true});
        case REDIRECTED:
            return  Object.assign({}, state, {success: false});
        default:
            return state;
    }
}