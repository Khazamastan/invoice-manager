/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_INVOICE = 'boilerplate/App/LOAD_INVOICE';
export const LOAD_INVOICE_SUCCESS = 'boilerplate/App/LOAD_INVOICE_SUCCESS';
export const LOAD_INVOICE_ERROR = 'boilerplate/App/LOAD_INVOICE_ERROR';
export const SET_USER = 'boilerplate/App/SET_USER';
export const SET_EXPENSES = 'boilerplate/App/SET_EXPENSES';
export const SET_EXPENSES_ERROR = 'boilerplate/App/SET_EXPENSES_ERROR';
export const CHANGE_QUERY = 'boilerplate/App/CHANGE_QUERY';
export const CHANGE_PAGE = 'boilerplate/App/CHANGE_PAGE';
export const SET_METRICS = 'boilerplate/App/SET_METRICS';
export const SET_TOKEN = 'boilerplate/App/SET_TOKEN';
