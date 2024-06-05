import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = ({ breadcumbMenu, breadcumbSubMenu }) => {
  return (
    <nav
      className="flex w-full items-start  bg-white py-2"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center capitalize">
          <a
            href="#"
            className="ml-1 inline-flex text-sm font-medium text-gray-800  md:ml-2"
          >
            <Home className="mr-4 h-4 w-4" />
            Dashboard
          </a>
        </li>
        {breadcumbMenu && (
          <li>
            <div className="flex items-center">
              <span className="mx-2.5 text-gray-800 ">/</span>
              <Link
                href="#"
                className="ml-1 text-sm font-medium capitalize text-gray-800  md:ml-2"
              >
                {breadcumbMenu}
              </Link>
            </div>
          </li>
        )}
        {breadcumbSubMenu && (
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2.5 text-gray-800 ">/</span>
              <span className="ml-1 text-sm font-medium capitalize text-gray-800  md:ml-2">
                {breadcumbSubMenu}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  breadcumbMenu: PropTypes.string,
  breadcumbSubMenu: PropTypes.string,
};

export default Breadcrumb;
