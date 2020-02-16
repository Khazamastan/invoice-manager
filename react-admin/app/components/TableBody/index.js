import React from 'react';
import Cell from '../Cell';
import TbodyWrapper from './Wrapper';
import CellWrapper from "../Cell/Wrapper"
const TableBody = props => {
  const { contacts, headers } = props;
  const tablecontent = contacts.map((contact, i) => (
    <tr key={i}>
      {Object.keys(headers).map(columnKey => {
        const cellItem = contact[columnKey];
        let header = headers[columnKey];
        if (header && header.view) {
          const CellView = header.view;
          return (
            <CellWrapper   key={columnKey} className={columnKey}>
              <CellView
                key={columnKey}
                contact={contact}
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
            contact={contact}
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
