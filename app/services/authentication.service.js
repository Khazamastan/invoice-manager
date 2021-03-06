import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers';

const currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}
