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
import { userService, authenticationService } from '../../services';
import {
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

function App({ user, history, setExpenses }) {
  const state = {
    currentUser: null,
    isAdmin: false,
  };
  const [currentUser, setCurrentUser] = useState(user);
  const [isAdmin, setIsAdmin] = useState(state.isAdmin);
  useEffect(() => {
    const isAdmin = currentUser && currentUser.role === Role.Admin;
    setIsAdmin(isAdmin);
    if(currentUser){
      userService.getAll(currentUser).then(expenses => setExpenses(expenses));
    }
  }, [currentUser]);
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header user={currentUser} isAdmin={isAdmin} />
      <Switch>
        <PrivateRoute exact user={currentUser} path="/" component={HomePage} />
        <PrivateRoute exact user={currentUser} path="/list" component={ExpenseList} />
        {/* <PrivateRoute user={currentUser}
          path="/admin"
          roles={[Role.Admin]}
          component={FeaturePage}
       /> */}
        <Route path="/login" component={LoginPage} />
        <PrivateRoute
          user={currentUser}
          path="/addExpense"
          component={AddExpense}
        />
        <PrivateRoute
          user={currentUser}
          path="/editExpense/:id"
          component={AddExpense}
        />
        <PrivateRoute user={currentUser} path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
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
