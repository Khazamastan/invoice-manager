/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser,
} from 'containers/App/selectors';
import { setExpenses, setUser } from '../App/actions';
import { authenticationService } from '../../services';

const key = 'home';

export function LoginPage({ setUser, user, history }) {
  useEffect(() => {
    !user && setUser(authenticationService.currentUser);
  }, [user]);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A Invoice Manage application LoginPage"
        />
      </Helmet>
      <main className="container mx-auto p-4 mt-12 flex flex-col items-center justify-center text-gray-700">
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
          <h1 className="text-4xl font-semibold ">Welcome back.</h1>

          <Formik
            initialValues={{
              username: '',
              password: '',
              otp: '',
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('Username is required'),
              password: Yup.string().required('Password is required'),
              otp: Yup.string().required('OTP is required'),
            })}
            onSubmit={(
              { username, password },
              { setStatus, setSubmitting },
            ) => {
              setStatus();
              authenticationService.login(username, password).then(
                user => {
                  setUser(user);
                  history.push('/');
                },
                error => {
                  setSubmitting(false);
                  setStatus(error);
                },
              );
            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="form-group mt-3">
                  <label htmlFor="username" className="font-regular">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className={`p-2 mt-3 mb-3  appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${
                      errors.username && touched.username ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600 text-right"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password" className="font-regular">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={`p-2 mt-3 mb-3  appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${
                      errors.password && touched.password ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-right"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="otp" className="font-regular">
                    OTP
                  </label>
                  <Field
                    name="otp"
                    type="password"
                    className={`p-2 mt-3 mb-3 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${
                      errors.password && touched.password ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-red-600 text-right"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <div className="w-1/2 flex items-center" />
                  <button
                    className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Log In
                  </button>
                </div>
                {status && <div className="alert alert-danger">{status}</div>}}
              </Form>
            )}
          />
        </div>
        <div className="text-right w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
          <a className="text-sm font-bold text-teal-500 hover:underline cursor-pointer">
            Forgot your password?
          </a>
        </div>
      </main>
    </article>
  );
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
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
)(LoginPage);
