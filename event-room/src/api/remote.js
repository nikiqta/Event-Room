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

async function fetchPendingEvents() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/events/unapproved`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await res.json();
}

async function createEvent(data) {
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

async function fetchEditEvent(data, eventId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/event/edit/${eventId}`, {
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

async function fetchRemoveEvent (eventId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/event/delete/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json();
}


async function createTicket(data) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/ticket/create`, {
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

async function fetchUserEvents(userId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/user/events/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await res.json();
}

async function fetchApproveEvent(eventId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/event/approve/${eventId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await res.json();
}

async function fetchEvent(eventId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/event/${eventId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await res.json();
}

async function fetchUserTickets(userId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${host}feed/user/tickets/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await res.json();
}


export {
    userRegister,
    userLogin,
    fetchSearchPage,
    fetchApprovedEvents,
    createEvent,
    fetchUserEvents,
    fetchUserTickets,
    fetchPendingEvents,
    fetchEvent,
    createTicket,
    fetchEditEvent,
    fetchRemoveEvent,
    fetchApproveEvent
};