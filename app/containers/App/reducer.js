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
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SET_USER,
  SET_EXPENSES,
} from './constants';

const currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: currentUserSubject,
  userData: {
    expenses: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case SET_USER:
        draft.currentUser = action.user;
        draft.loading = false;
        break;

      case SET_EXPENSES:
        draft.userData.expenses = action.expenses;
        draft.loading = false;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
