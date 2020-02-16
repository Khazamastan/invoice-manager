/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.global || initialState;

const makeSelectExpenses = () =>
  createSelector(
    selectHome,
    homeState => homeState.expenses,
  );

export { selectHome, makeSelectUsername };
