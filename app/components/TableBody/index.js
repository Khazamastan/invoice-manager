import React from 'react';
import Cell from '../Cell';
import TbodyWrapper from './Wrapper';
import CellWrapper from "../Cell/Wrapper"
const TableBody = props => {
  const { invoices, headers } = props;
  const tablecontent = invoices.map((invoice, i) => (
    <tr key={i}>
      {Object.keys(headers).map(columnKey => {
        const cellItem = invoice[columnKey];
        let header = headers[columnKey];
        if (header && header.view) {
          const CellView = header.view;
          return (
            <CellWrapper   key={columnKey} className={columnKey}>
              <CellView
                key={columnKey}
                invoice={invoice}
                header={header}
                columnKey={columnKey}
                cell={cellItem}
                i={i}
            />
            </CellWrapper>
          );
        }
        return (
          <Cell
            key={columnKey}
            header={header}
            invoice={invoice}
            columnKey={columnKey}
            cell={cellItem}
            i={i}
          />
        );
      })}
    </tr>
  ));

  return <TbodyWrapper>{tablecontent}</TbodyWrapper>;
};

export default TableBody;
