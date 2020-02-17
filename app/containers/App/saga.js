/**
 * Gets the songs of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { CHANGE_QUERY } from './constants';
import { setExpenses, setExpensesError } from './actions';
import { makeSelectQuery, makeSelectCurrentUser } from './selectors';
import { userService } from '../../services';
/**
 * Songs request/response handler
 */
export function* getInvoices() {
  const query = yield select(makeSelectQuery());
  const user = yield select(makeSelectCurrentUser());
  try {
    // Call our request helper (see 'utils/request')
    const response = yield userService.getAll(user, query);
    yield put(setExpenses(response));
  } catch (err) {
    yield put(setExpensesError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* invoiceData() {
  yield takeLatest(CHANGE_QUERY, getInvoices);
}
