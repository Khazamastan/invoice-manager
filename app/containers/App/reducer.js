/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  SET_USER,
  SET_EXPENSES,
  SET_EXPENSES_ERROR,
  CHANGE_QUERY,
  SET_METRICS,
} from './constants';

const currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: currentUserSubject,
  userData: {
    expenses: {
      data: false,
      total: 0,
    },
    metrics: false,
    query: {
      search: '',
      page: 1,
    },
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER:
        draft.currentUser = action.user;
        draft.loading = false;
        break;

      case SET_EXPENSES:
        draft.userData.expenses = Object.assign(
          draft.userData.expenses,
          action.expenses,
        );
        draft.loading = false;
        break;

      case SET_METRICS:
        draft.userData.metrics = action.metrics;
        break;

      case SET_EXPENSES_ERROR:
        draft.error = true;
        break;
      case CHANGE_QUERY:
        draft.loading = true;
        draft.userData.query = action.query;
        if (action.query.search && action.change == 'search') {
          draft.userData.query.page = 1;
        }
        break;
    }
  });

export default appReducer;
