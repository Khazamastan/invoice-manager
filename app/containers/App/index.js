/* eslint-disable react/prop-types */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import ExpenseList from 'containers/ExpenseList/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import AddExpense from 'containers/AddExpense/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import { Role } from '../../helpers';
import GlobalStyle from '../../global-styles';
import { setExpenses, setUser } from './actions';
import { userService } from '../../services';
import {
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectCurrentUserToken,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const key = 'global';
function App({ user, history, setExpenses, token, setUser }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const state = {
    currentUser: null,
    isAdmin: false,
  };
  const [currentUser, setCurrentUser] = useState(user);
  const [isAdmin, setIsAdmin] = useState(state.isAdmin);
  useEffect(() => {
    const isAdmin = currentUser && currentUser.role === Role.Admin;
    setIsAdmin(isAdmin);
    setCurrentUser(user);
    if (currentUser) {
      userService.getAll(currentUser).then(expenses => setExpenses(expenses));
    }
  }, [currentUser, user]);
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Invoice Manage" defaultTitle="Invoice Manage">
        <meta name="description" content="A Invoice Manage application" />
      </Helmet>
      {currentUser && token && (
        <Header user={currentUser}  setUser={setUser} history={history} isAdmin={isAdmin} />
      )}
      <Switch>
        <PrivateRoute
          exact
          user={currentUser}
          token={token}
          path="/"
          component={HomePage}
        />
        <PrivateRoute
          exact
          user={currentUser}
          token={token}
          path="/list"
          component={ExpenseList}
        />
        <Route path="/login" token={token} component={LoginPage} />
        <PrivateRoute
          user={currentUser}
          token={token}
          path="/addExpense"
          component={AddExpense}
        />
        <PrivateRoute
          user={currentUser}
          token={token}
          path="/editExpense/:id"
          component={AddExpense}
        />
        <PrivateRoute
          user={currentUser}
          token={token}
          path=""
          component={NotFoundPage}
        />
      </Switch>
      <GlobalStyle />
      <div className="bg-indigo-900 text-center py-4 lg:px-4 fixed bottom-0 w-full">
        <div
          className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            {currentUser ? 'Welcome' : 'Hello '}
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            {currentUser ? 'Manage invoice' : 'Login to manage invoice'}
          </span>
          <svg
            className="fill-current opacity-75 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      </div>
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  token: makeSelectCurrentUserToken(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setExpenses: expense => {
      dispatch(setExpenses(expense));
    },
    setUser: user => {
      dispatch(setUser(user));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
