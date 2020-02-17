import React, { useEffect, memo, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectError,
  } from '../../containers/App/selectors';
import { authenticationService } from '../../services';

const PrivateRoute = ({ component: Component,user, token, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = user;
        if (!currentUser || !token) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }
        
        // authorised so return component
        return <Component {...props} />
    }} />
)


const mapStateToProps = createStructuredSelector({
    user: makeSelectCurrentUser(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
  });
  
  export function mapDispatchToProps(dispatch) {
    return {
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
  )(PrivateRoute);
  