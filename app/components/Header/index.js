import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { authenticationService } from '../../services';
import { Link } from 'react-router-dom';

function Header({ isAdmin, history, user, setUser }) {
  const logout = () => {
    setUser(false);
    authenticationService.logout();
    history.push('/login');
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-500 pt-1 pb-1 pr-0 pl-6">
      <div className="flex items-center flex-shrink-0 text-white">
        <span className="font-semibold text-xl tracking-tight">
          Invoice Management
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <HeaderLink className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <HeaderLink className="text-sm lg:flex-grow">
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/list">Invoice List</HeaderLink>
        </HeaderLink>
        <div>
          <NavBar>
            <div className="flex items-center">
              {user && (
                <p className="mr-2">
                  <b>
                    Hello, {user.firstName} {user.lastName}
                  </b>
                </p>
              )}
              <HeaderLink 
                to="/login" onClick={logout}
                className=" ml-5 bg-indigo-700 hover:bg-indigo-500 border-white border-2 text-white font-bold py-1 px-6 rounded-full"
              >
                Logout
              </HeaderLink>
            </div>
          </NavBar>
        </div>
      </HeaderLink>
    </nav>
  );
  // return (
  //   <div className="flex justify-between bg-gray-200">
  //     <NavBar>
  //       <HeaderLink to="/">
  //         <FormattedMessage {...messages.home} />
  //       </HeaderLink>
  //       <HeaderLink to="/list">Invoice List</HeaderLink>
  //     </NavBar>
  //     <NavBar>
  //       <div className="flex items-center">
  //         {user && (
  //           <p>
  //             <b>
  //               Hello, {user.firstName} {user.lastName}
  //             </b>
  //           </p>
  //         )}
  //         <HeaderLink to="/logout" onClick={logout}>
  //           <FormattedMessage {...messages.logout} />
  //         </HeaderLink>
  //       </div>
  //     </NavBar>
  //   </div>
  // );
}

export default Header;
