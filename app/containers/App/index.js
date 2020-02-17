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
function App({ user, history, setExpenses, token }) {
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
      {currentUser && token && <Header user={currentUser} isAdmin={isAdmin} />}
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
    onSubmitForm: form => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(setUser(form));
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
