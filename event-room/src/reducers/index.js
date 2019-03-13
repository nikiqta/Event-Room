import { loginReducer, registerReducer } from './authReducer';
import eventReducer from './eventReducer';
import ticketReducer from './ticketReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    events: eventReducer,
    tickets: ticketReducer
}