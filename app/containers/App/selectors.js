/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

  const makeSelectQuery = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.query,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectExpenses = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.expenses,
  );

const makeSelectExpensesMetics = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.metrics,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectExpensesMetics,
  makeSelectLoading,
  makeSelectError,
  makeSelectExpenses,
  makeSelectLocation,
  makeSelectQuery,
};
