import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { authenticationService } from '../../services';

function Header({ isAdmin, history, user }) {
  const logout = () => {
    authenticationService.logout();
    history.push('/login');
  };

  return (
    <div className="flex justify-between bg-gray-200">
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/list">Invoice List</HeaderLink>
      </NavBar>
      <NavBar>
        <div className="flex items-center">
          {user && (
            <p>
              <b>
                Hello, {user.firstName} {user.lastName}
              </b>
            </p>
          )}
          <HeaderLink to="/logout" onClick={logout}>
            <FormattedMessage {...messages.logout} />
          </HeaderLink>
        </div>
      </NavBar>
    </div>
  );
}

export default Header;
