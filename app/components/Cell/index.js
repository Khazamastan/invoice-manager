import React from 'react';
import CellWrapper from './Wrapper';

const Cell = props => {
  const { columnKey, invoice, cell, i, header } = props;
  return (
    <CellWrapper className={columnKey}>
      {columnKey != 'number' ? (
        <p className={header.className}>
          {cell && cell != 'NULL' ? invoice[columnKey] : '-'}
        </p>
      ) : (
        i + 1
      )}
    </CellWrapper>
  );
};

export default Cell;
