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
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import {makeSelectExpenses, makeSelectCurrentUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import H1 from "components/H1"
import Table from "components/Table"
import Button from "components/Button"
import Pagination from "components/Pagination";
import LoadingIndicator from "components/LoadingIndicator";
import Select from "components/Select";
const key = 'home';
import { userService } from '../../services';
import { Link } from 'react-router-dom';
import HeaderLink from 'components/Header/HeaderLink';
import { users } from '../../helpers';

export function HomePage({
  currentUser,
  expenseList
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [expenses,setExpenses] = useState(expenseList);
  const isAdmin = currentUser.role === "Admin";
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    // if(!expenseList){
      userService.getAll(currentUser).then(expenses => setExpenses([...expenses]));
    // } 
  }, [currentUser]);

  const HomePageContainer = styled.section`
    max-width: 1440px;
    padding: 20px 30px 20px 40px;
    margin: 20px auto 0 auto;
`;
  
  const headers = {
    "id": {
      name: "ID",
      width: 20
    },
    "user": {
      name: "Created By",
      width: 20,
      view: ({contact, columnKey, cell, i}) => {
        let user = _.find(users, {id: contact.user});
          return <td>
            {user.firstName}
          </td>
      }
    },
    "description": {
      name: "Description",
      width: 30
    },
    "vendor": {
      name: "Vendor",
      width: 20
    },
    "amount": {
      name: "Amount",
      width: 20
    },
    "actions" : {
      name: "Actions",
      width: 30,
      view: ({contact, columnKey, cell, i}) => {
        return <td className="text-center">
          {
            isAdmin && <HeaderLink to={"/addExpense/" + contact.id} className="button small bg-green-400">
            Approve
          </HeaderLink>
          }
          {
            isAdmin && <HeaderLink to="/addExpense" className="button small bg-red-600">
          Reject
          </HeaderLink>
          }
          {
          <HeaderLink to={"/editExpense/" + contact.id} className="button small bg-blue-500">
          Edit
          </HeaderLink>
          }
        </td>
      }
    }
  };

  // if(currentUser.role === "Admin"){
  //   headers
  // }
  
  const PER_PAGE = 50;
  const pageCounts = [10, 20, 50, 100];
  const state = {
    perPage: PER_PAGE,
    currentPage: 0,
    query: '',
    filteredExpenses: expenses
  }

  if(!expenses) {
    return  <HomePageContainer className="container bg-white">
      <LoadingIndicator/>
    </HomePageContainer>
  }
  const onChangeQuery = (e) => {
    const query = e.target.value;
    if(query.length === 1)
      // this.setState({currentPage : 0});

    filterItems(expenses, query);
  }
  const filterItems = _.debounce(function (expenses, query) {
    console.log(query);
    query = query.toLowerCase();
    const filteredExpenses = expenses.filter(expense => {
      var exists = Object.keys(expense).some(field => {
        const fieldValue = expense[field];
        if (fieldValue && fieldValue != "NULL" && (fieldValue.toString().toLowerCase().indexOf(query) > -1)) {
          return true; 
        }
      });
      if (exists) {
        return true;
      }
    });
    // this.setState({ filteredExpenses })

  }, 300)

  /* change no of items page */
  const onChangePerPageCount = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const perPage = parseInt(e.nativeEvent.target[index].text);
    // this.setState({ perPage });
  }

  /* change page number(or go to the page) */
  const onChangePageNumber = currentPage => {
    // this.setState({ currentPage: currentPage - 1 });
  }

  const { query, currentPage, perPage } = state;
    var { filteredExpenses } = state;
    const start = currentPage * perPage;
    const end = currentPage * perPage + perPage;
    const noOfPages = Math.round(filteredExpenses.length / perPage);
    filteredExpenses = filteredExpenses.slice(start, end);
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
        <div className="flex justify-between items-center">
          <H1>
            Your Expenses
          </H1>
          <HeaderLink to="/addExpense" className="button bg-green-400 hover:bg-green-600">
           + Add an Expense
          </HeaderLink>
        </div>
        <p className="flex justify-between pb-7 mb-2">
          <Select
            pageCounts={pageCounts}
            value={perPage}
            onChange={onChangePerPageCount}
          />
          <Input
            type="text"
            placeholder="Search here"
            className="search mb-7"
            onChange={onChangeQuery}
          />
          </p>
          <Table contacts={expenses} headers={headers} />
          <Pagination
            onChangePage={onChangePageNumber}
            count={noOfPages}
            currentPage={currentPage + 1}
          />
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
  expenseList: makeSelectExpenses(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
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
