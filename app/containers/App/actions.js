/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SET_USER,
  SET_EXPENSES,
  CHANGE_QUERY,
  CHANGE_PAGE,
  SET_METRICS,
  SET_TOKEN,
} from './constants';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setExpenses(expenses) {
  return {
    type: SET_EXPENSES,
    expenses,
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function setMetrics(metrics) {
  return {
    type: SET_METRICS,
    metrics,
  };
}

export function setExpensesError(expenses) {
  return {
    type: SET_EXPENSES,
    expenses,
  };
}

export function setQuery(query, change) {
  return {
    type: CHANGE_QUERY,
    query,
    change,
  };
}

export function onChangePage(page, change) {
  return {
    type: CHANGE_PAGE,
    page,
    change,
  };
}
