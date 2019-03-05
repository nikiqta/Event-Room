import {userLogin, userRegister} from "./../api/remote.js";
import { register, login } from "./actionCreators";

function registerThunk(username, firstName, lastName, email, password) {

    return (dispatch) => {
        return userRegister(username, password)
            .then(json => {
                if(json.success){
               dispatch(register());
                }
            });
    }
}

function loginThunk(username, password) {
       return (dispatch) => {
           return userLogin(username, password)
               .then(json => {
                   localStorage.setItem('token', json.token);
                   localStorage.setItem('username', json.username);
                   localStorage.setItem('userId', json.userId);
                   dispatch(login());
               });
       }
}

function logoutThunk() {
    return (dispatch) => {
        localStorage.clear();
    }
}

export {registerThunk, loginThunk, logoutThunk};