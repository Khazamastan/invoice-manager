/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React, { useState, useEffect} from 'react';
import Select from 'components/Select';
import Input from 'components/Input';
import Pagination from 'components/Pagination';
import TableWrapper from './TableWrapper';
import TableHead from '../TableHead';
import TableBody from '../TableBody';

const Table = ({
  headers,
  data,
  pageCounts,
  perPage,
  total,
  onChangePageNumber,
  onChangeQuery,
  query,
}) => {
  let noResultsConent;
  if (!data || !data.length) {
    noResultsConent = (
      <p className="no-results" key="only">
        No Results
      </p>
    );
  }
  const [localQuery, setlocalQuery] = useState(query.search);
  useEffect(() => {
    setCurrentPage(query.page);
  }, [query])
  const [currentPage, setCurrentPage] = useState(query.page);
  const onChangeLocalQuery = e => {
    const { value } = e.target;
    setlocalQuery(value);
    onChangeQuery(value);
  };
  const changePage = page => {
    setCurrentPage(page);
    onChangePageNumber(page);
  };
  return (
    <div className="row">
      <p className="flex justify-between pb-7 mb-2">
        <Select pageCounts={pageCounts} value={perPage} onChange={() => {}} />
        <Input
          type="text"
          autoFocus
          placeholder="Search here"
          className="search mb-7"
          value={localQuery}
          onChange={onChangeLocalQuery}
        />
      </p>
      <TableWrapper>
        <TableHead headers={headers} />
        <TableBody headers={headers} contacts={data} />
      </TableWrapper>
      <div className="mt-5">
        <Pagination
          onChangePage={changePage}
          current={currentPage}
          count={total}
          perPage={perPage}
        />
      </div>
      {noResultsConent}
    </div>
  );
};

export default Table;
