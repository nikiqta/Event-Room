const host = 'http://localhost:9999/';

async function userRegister(username, firstName, lastName, email, password) {
    const res = await fetch(`${host}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
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

export {userRegister, userLogin, fetchSearchPage};