import { authHeader, handleResponse } from '../helpers';

export const userService = {
  getAll,
  addExpense,
  editExpense,
  getAllMetrics,
};

function getAll(user, query) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    body: { user, query },
  };
  return fetch(`/expenses`, requestOptions).then(handleResponse);
}


function getAllMetrics(user, query) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    body: { user, query },
  };
  return fetch(`/metrics`, requestOptions).then(handleResponse);
}

function addExpense(id, expense) {
  const requestOptions = {
    method: 'PUT',
    body: { expense },
    headers: authHeader(),
  };
  return fetch(`/expenses`, requestOptions).then(handleResponse);
}

function editExpense(user, expense) {
  const requestOptions = {
    method: 'PUT',
    body: { expense, user },
    headers: authHeader(),
  };
  return fetch(`/expenses`, requestOptions).then(handleResponse);
}
