/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import styled from 'styled-components';
import LoadingIndicator from "components/LoadingIndicator";

import {
  makeSelectExpenses,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { setExpenses } from '../App/actions';
import { makeSelectCurrentUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import H1 from "components/H1"
import Table from "components/Table"
import Button from "components/Button"
import expenses from "../../data/expenses.json";
import Pagination from "components/Pagination";
import Select from "components/Select";
const key = 'home';
import { userService } from '../../services';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import _ from "lodash";

const HomePageContainer = styled.section`
max-width: 400px;
padding: 20px 30px 20px 40px;
margin: 60px auto 0 auto;
`;

export function HomePage({
  addExpense,
  user,
  match,
  expenseList,
  history
}) {
  const isEdit = match.params.id;
  let expenseData = isEdit ? null : {  description: '', vendor: '', amount: '', invoice: '', date: '' };
  const [expense, SetExpense] = useState(expenseData)
  useEffect(() => {
    if(isEdit){
      const initialValue = _.find(expenseList, {id : parseInt(match.params.id)});
      SetExpense(initialValue);
    }
  }, [expenseList, isEdit]);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <HomePageContainer className="container bg-white">
          <div className="flex justify-between">
            <H1>
              { isEdit ? 'Edit Expense' :  'Add new expense'}
            </H1>
          </div>
          { (expenseList && expense || !isEdit) ? 
          <Formik
            initialValues={expense}
            validationSchema={Yup.object().shape({
              description: Yup.string().required('Description is required'),
              invoice: Yup.string().required('Invoice Number is required'),
              date: Yup.string().required('Invoice date is required'),
              vendor: Yup.string().required('Vendor is required'),
              amount: Yup.string().required('Amount is required'),
            })}
            onSubmit={(formData, { setStatus, setSubmitting }) => {
              setStatus();
              if(!isEdit){
                formData.user = user.id;
              }
              userService.editExpense(user.id, formData)
                .then(
                  expenses => {
                    addExpense(expenses);
                    history.push('/');
                  },
                  error => {
                    setSubmitting(false);
                    setStatus(error);
                  }
                );
            }}
            render={({ errors, values, status, touched, isSubmitting }) => (
              <Form>
                <div className="form-group mt-3">
                  <label htmlFor="vendor" className="font-regular">Vendor</label>
                  <Field name="vendor"  value={values && values.vendor} type="text" className={`p-2 mt-3 mb-3  appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${errors.vendor && touched.vendor ? ' is-invalid' : ''}`} />
                  <ErrorMessage name="vendor" component="div" className="text-red-600 text-right" />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="amount" className="font-regular">Amount</label>
                  <Field name="amount" type="number" value={values && values.amount} className={`p-2 mt-3 mb-3  appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${errors.amount && touched.amount ? ' is-invalid' : ''}`} />
                  <ErrorMessage name="amount" component="div" className="text-red-600 text-right" />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="description" className="font-regular">Description</label>
                  <Field name="description" value={values && values.description} type="text" className={`p-2 mt-3 mb-3 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${errors.description && touched.description ? ' is-invalid' : ''}`} />
                  <ErrorMessage name="description" component="div" className="text-red-600 text-right" />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="invoice" className="font-regular">invoice</label>
                  <Field name="invoice" type="text"  value={values && values.invoice} className={`p-2 mt-3 mb-3  appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${errors.invoice && touched.invoice ? ' is-invalid' : ''}`} />
                  <ErrorMessage name="invoice" component="div" className="text-red-600 text-right" />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="date" className="font-regular">Date</label>
                  <Field name="date" type="date" value={values && values.date} className={`p-2 mt-3 mb-3  appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500 form-control${errors.date && touched.date ? ' is-invalid' : ''}`} />
                  <ErrorMessage name="date" component="div" className="text-red-600 text-right" />
                </div>
                <div className="row flex items-center justify-between pt-8">
                    <Link
                      className="ml-auto text-center w-1/2 bg-gray-400 text-black p-2 rounded font-normal hover:bg-gray-500 mr-8"
                      type="submit"
                      to="/"
                    >
                    
                    Cancel
                  </Link>
                  <button
                    className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
                    type="submit"
                    disabled={isSubmitting}
                  >
                   
                   { isEdit ? 'Update' :  'Add Expense'}
                 </button>
                </div>
                {status &&
                  <div className="alert alert-danger">{status}</div>
                }
              </Form>
            )}
          /> : <LoadingIndicator/>}
        </HomePageContainer>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  expenseList: makeSelectExpenses(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    addExpense: expense => {
      dispatch(setExpenses(expense));
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
)(HomePage);