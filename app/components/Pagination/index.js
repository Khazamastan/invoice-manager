import React from 'react';
import Pagination from 'rc-pagination';
import PaginationWrapp from './PaginationWrapper';

const PaginationContainer = props => {
  const { count, current, onChangePage, perPage } = props;
  const noOfPages = Math.ceil(count / perPage);
  if (noOfPages < 2) return null;
  return (
    <PaginationWrapp>
      <Pagination
        onChange={onChangePage}
        current={current}
        pageSize={perPage}
        total={count}
      />
    </PaginationWrapp>
  );
};

export default PaginationContainer;
