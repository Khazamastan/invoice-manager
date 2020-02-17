/* eslint-disable react/prop-types */
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
import '../../../node_modules/c3/c3.css';
import styled from 'styled-components';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectExpenses,
  makeSelectCurrentUser,
} from 'containers/App/selectors';

import H1 from 'components/H1';
import LoadingIndicator from 'components/LoadingIndicator';
import HeaderLink from 'components/Header/HeaderLink';
import _ from 'lodash';
import c3 from 'c3';
import { userService } from '../../services';

const HomePageWrapper = styled.section`
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

const bar = {
  data: {
    type: 'bar',
    x: 'x',
    columns: [
      [
        'x',
        '2013-01-01',
        '2013-01-02',
        '2013-01-03',
        '2013-01-04',
        '2013-01-05',
        '2013-01-06',
      ],
      ['Invices by Date', 130, 340, 200, 500, 250, 350],
    ],
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m-%d',
      },
    },
  },
};

const Div = ({ width, children }) => (
  <div style={{ width: `${width}px`, display: 'inline-block' }}>{children}</div>
);

class Chart extends React.PureComponent {
  constructor() {
    super();

    this.c3Instance = c3;
    this.chart = null;
  }

  ref = el => (this.chartContainer = el);

  componentDidMount() {
    this.setChart();
  }

  componentDidUpdate(prevProps) {
    const { columns, type, config } = this.props.data;
    console.log(columns);
    this.chart.load({ columns, type, ...config });
  }

  setChart() {
    const { data, onClick, onMouseOver, onMouseOut, type, config } = this.props;

    data.onclick = onClick;
    data.onmouseover = onMouseOver;
    data.onmouseout = onMouseOut;

    this.chart = this.c3Instance.generate({
      bindto: this.chartContainer,
      ...bar,
      ...config,
    });
  }

  render() {
    return <div ref={this.ref} />;
  }
}

export function HomePage({ currentUser, expenseList }) {
  const [expenses, setExpenses] = useState(expenseList);
  useEffect(() => {
    // if(!expenseList){
    userService
      .getAll(currentUser)
      .then(expenses => setExpenses([...expenses]));
    // }
  }, [currentUser]);

  if (!expenses) {
    return (
      <HomePageWrapper className="container bg-white">
        <div className="center">
          <LoadingIndicator />
        </div>
      </HomePageWrapper>
    );
  }

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
        <HomePageWrapper className="container bg-white">
          <div className="flex justify-between items-center">
            <H1>Dashboard</H1>
            <HeaderLink
              to="/addExpense"
              className="button bg-green-400 hover:bg-green-600"
            >
              + Add an Expense
            </HeaderLink>
          </div>
          <div className="mt-8">
            <Div width={1200}>
              <Chart type="bar" data={bar.data} />
            </Div>
          </div>
        </HomePageWrapper>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenses(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
