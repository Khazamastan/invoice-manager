/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import styled from 'styled-components';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectExpenses,
  makeSelectCurrentUser,
  makeSelectQuery,
} from 'containers/App/selectors';

import H1 from 'components/H1';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import LoadingIndicator from 'components/LoadingIndicator';
import Select from 'components/Select';
import { Link } from 'react-router-dom';
import HeaderLink from 'components/Header/HeaderLink';
import { userService } from '../../services';
import { setQuery, setExpenses } from '../App/actions';
import Input from './Input';
import { users } from '../../helpers';

export function HomePage({
  currentUser,
  expenseList,
  addExpense,
  loading,
  onChangeFilter,
  query,
}) {
  const [expenses, setExpenses] = useState(expenseList.data);
  const isAdmin = currentUser.role === 'Admin';
  useEffect(() => {
    if (!loading) {
      if (!expenseList.data) {
        userService.getAll(currentUser, query).then(expenses => {
          console.log(expenses);
          addExpense(expenses);
        });
      } else {
        expenseList.data && setExpenses(expenseList.data);
      }
      console.log(expenseList.data);
    }
  }, [currentUser, expenseList.data]);

  const ExpensesListContainer = styled.section`
    max-width: 1440px;
    min-height: 600px;
    padding: 20px 30px 20px 40px;
    margin: 20px auto 0 auto;
    position: relative;
    .center {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `;
  const approveInvoice = invoice => {
    const invoiceData = Object.assign({}, invoice);
    invoiceData.status = 'approved';
    userService.editExpense(currentUser, invoiceData).then(
      expenses => {
        addExpense({ data: false });
      },
      error => {},
    );
  };
  const rejectInvoice = invoice => {
    const invoiceData = Object.assign({}, invoice);
    invoiceData.status = 'rejected';
    userService.editExpense(currentUser, invoiceData).then(
      expenses => {
        addExpense({ data: false });
        // history.push('/list');
      },
      error => {},
    );
  };
  const headers = {
    id: {
      name: 'ID',
      width: 10,
    },
    user: {
      name: 'Created By',
      width: 20,
      view: ({ invoice, columnKey, cell, i }) => {
        const user = _.find(users, { id: invoice.user });
        return <p>{user.firstName}</p>;
      },
    },
    description: {
      name: 'Description',
      width: 30,
    },
    vendor: {
      name: 'Vendor',
      width: 20,
    },
    amount: {
      name: 'Amount',
      width: 20,
    },
    date: {
      name: 'Invoice Date',
      width: 20,
    },
    status: {
      name: 'Status',
      width: 20,
      view: ({ invoice }) => {
        let cls = '';
        const canEdit = isAdmin && invoice.user == currentUser.id;
        if (invoice.status) {
          cls =
            invoice.status === 'approved' ? 'text-green-400' : 'text-red-400';
          cls = invoice.status === 'pending' ? 'text-gray-800' : cls;
        }
        const pendingText = !canEdit ? 'PENDING' : 'APPROVED';
        return (
          <p className={`${cls} text-xs`}>
            {invoice.status == 'pending' || canEdit
              ? pendingText
              : (invoice.status || pendingText).toUpperCase()}
          </p>
        );
      },
    },
    actions: {
      name: 'Actions',
      width: 35,
      view: ({ invoice }) => {
        const canEdit =
          isAdmin &&
          invoice.status == 'pending' &&
          invoice.user != currentUser.id;
        let list = [];
        if (canEdit) {
          list = [
            <button
              key="approve"
              onClick={() => approveInvoice(invoice)}
              className="mr-2 bg-green-500 text-sm hover:bg-blue-500 text-white hover:text-white py-1 px-2 border hover:border-transparent rounded"
            >
              Approve
            </button>,
            <button
              key="reject"
              to="/addExpense"
              onClick={() => rejectInvoice(invoice)}
              className="mr-2 bg-red-400 text-sm hover:bg-blue-500 text-white  hover:text-white py-1 px-2 hover:border-transparent rounded"
            >
              Reject
            </button>,
          ];
        }

        if (invoice.status == 'pending' || isAdmin) {
          list.push(
            <Link
              key="edit"
              to={`/editExpense/${invoice.id}`}
              className="bg-blue-500 text-sm hover:bg-blue-700 text-white  hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
            >
              Edit
            </Link>,
          );
        }

        return <div className="text-left">{list}</div>;
      },
    },
  };

  // if(currentUser.role === "Admin"){
  //   headers
  // }

  const PER_PAGE = 10;
  const pageCounts = [10, 20, 50, 100];
  if (!expenses) {
    return (
      <ExpensesListContainer className="container bg-white">
        <div className="center">
          <LoadingIndicator />
        </div>
      </ExpensesListContainer>
    );
  }

  const debounceChangeQuery = _.debounce(function(queryObj, change) {
    onChangeFilter(queryObj, change);
  }, 1000);

  const onChangeQuery = value => {
    const queryObj = Object.assign({}, query);
    queryObj.search = value;
    debounceChangeQuery(queryObj, 'search');
  };

  const onChangePageNumber = currentPage => {
    const queryObj = Object.assign({}, query);
    queryObj.page = currentPage;
    onChangeFilter(queryObj, 'page');
  };

  const noOfPages = Math.round(expenses.length / PER_PAGE);
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A Invoice Manage application homepage"
        />
      </Helmet>
      <div>
        <ExpensesListContainer className="container bg-white">
          <div className="flex justify-between items-center">
            <H1>Your Expenses</H1>
            <HeaderLink
              to="/addExpense"
              className="button bg-green-400 hover:bg-green-600"
            >
              + Add an Expense
            </HeaderLink>
          </div>

          <Table
            data={expenses}
            pageCounts={pageCounts}
            total={expenseList.total}
            perPage={PER_PAGE}
            onChangePageNumber={onChangePageNumber}
            onChangeQuery={onChangeQuery}
            headers={headers}
            query={query}
          />
        </ExpensesListContainer>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenses(),
  query: makeSelectQuery(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    addExpense: expense => {
      dispatch(setExpenses(expense));
    },
    onChangeFilter: (query, change) => {
      dispatch(setQuery(query, change));
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
