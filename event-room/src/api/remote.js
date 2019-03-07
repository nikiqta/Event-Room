const host = 'http://localhost:9999/';

async function userRegister(data) {
    const res = await fetch(`${host}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data
        })
    });
    return await res.json();
}

async function userLogin(username, password) {
    const res = await fetch(`${host}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    return await res.json();
}

async function fetchSearchPage(query) {
    const res = await fetch(`${host}events?search=${query}`);
    return await res.json();
}

async function fetchApprovedEvents() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/events`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await res.json();
}

async function createEvent(data) {
    debugger;
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/event/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
           ...data
        })
    });
    return await res.json();
}

export {userRegister, userLogin, fetchSearchPage, fetchApprovedEvents, createEvent};