/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
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
  makeSelectCurrentUserToken,
  makeSelectCurrentUser,
} from 'containers/App/selectors';
import { setExpenses, setUser, setToken } from '../App/actions';
import { authenticationService } from '../../services';

const key = 'home';

export function LoginPage({ setUser, user, history, token, setToken }) {
  const [showPassword, setShowPasswprd] = useState(false);
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
      <main className="container mx-auto p-4 mt-12 flex flex-col items-center justify-center text-gray-700 pt-20">
        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4 p-12">
          <h1 className="text-4xl font-semibold ">
            {!user ? 'Login.' : 'Enter OTP'}
          </h1>
          {!user ? (
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required'),
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
              render={({ errors, status, values, touched, isSubmitting }) => (
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
                      type={showPassword ? 'text' : 'password'}
                      className={`p-2 mt-3 mb-3  appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${
                        errors.password && touched.password ? ' is-invalid' : ''
                      }`}
                    />
                    {values.password && (
                      <p className="text-right">
                        <a
                          className="underline cursor-pointer"
                          onClick={() => setShowPasswprd(!showPassword)}
                        >
                          {!showPassword ? 'Show' : 'Hide'}
                        </a>
                      </p>
                    )}
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-right"
                    />
                  </div>
                  {status && <div className="text-red-600">{status}</div>}
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
                </Form>
              )}
            />
          ) : (
            <Formik
              initialValues={{
                otp: '',
              }}
              validationSchema={Yup.object().shape({
                otp: Yup.string().required('OTP is required'),
              })}
              onSubmit={({ otp }, { setStatus, setSubmitting }) => {
                setStatus();
                if (otp == '1234') {
                  setToken(user.id);
                  localStorage.setItem('token', user.id);
                  history.push('/');
                }
              }}
              render={({ errors, status, values, touched, isSubmitting }) => (
                <Form>
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
                  {status && <div className="text-red-600 mt-5">{status}</div>}
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
                </Form>
              )}
            />
          )}
        </div>
      </main>
      <div className="bg-indigo-900 text-center py-4 lg:px-4 fixed bottom-0 w-full">
        <div
          className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            Welcome
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            Login to manage invoice
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
    </article>
  );
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectCurrentUserToken(),
  user: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setUser: user => {
      dispatch(setUser(user));
    },
    setToken: user => {
      dispatch(setToken(user));
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
