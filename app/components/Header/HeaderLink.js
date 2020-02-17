import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  display: inline-flex;
  margin: 0.3em 1em;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  color: #fff;
  font-size: 16px;
  &.button{
    border: 0;
    color: #fff;
    border-radius: 3px;
    padding: 6px 10px;
    &.small{
      padding: 3px 8px;
      font-size: 12px;
      margin: 4px;
    }
  }
  &:hover {
  }
`;
