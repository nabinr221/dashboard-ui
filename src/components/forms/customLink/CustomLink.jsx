import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomLink = ({ path, btnTitle, className = "" }) => {
  return (
    <div className={`${className}`}>
      <Link
        to={path}
        type='button'
        className={` ${className}  bg-slate-700 p-3  text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
      >
        {btnTitle}
      </Link>
    </div>
  );
};
CustomLink.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  btnTitle: PropTypes.string.isRequired,
};

export default CustomLink;
