import { authHeader, handleResponse } from '../helpers';

export const userService = {
  getAll,
  addExpense,
  editExpense,
};

function getAll(user) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    body: { user },
  };
  return fetch(`/expenses`, requestOptions).then(handleResponse);
}

function addExpense(id, expense) {
  const requestOptions = {
    method: 'PUT',
    body: { expense },
    headers: authHeader(),
  };
  return fetch(`/expenses`, requestOptions).then(handleResponse);
}

function editExpense(id, expense) {
  const requestOptions = {
    method: 'PUT',
    body: { expense },
    headers: authHeader(),
  };
  return fetch(`/expenses`, requestOptions).then(handleResponse);
}
