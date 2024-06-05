import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  className = "",
  displayPages = 5,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const generatePageNumbers = () => {
    if (totalPages <= displayPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const pages = [];
      let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
      const endPage = Math.min(totalPages, startPage + displayPages - 1);

      if (startPage > 1) {
        pages.push("...");
      } else {
        startPage = 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        pages.push("...", totalPages);
      }

      return pages;
    }
  };

  const handlePageClick = (page) => {
    if (page === "...") {
      return;
    }
    paginate(page);
  };

  return (
    <nav className='flex justify-center mt-4'>
      <div className={`flex items-center justify-center ${className}`}>
        {currentPage !== 1 && (
          <Link
            to='#'
            className='mx-1 flex items-center px-3 py-1 transition-all duration-300 text-gray-900 hover:scale-105'
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <ChevronsLeft />{" "}
          </Link>
        )}
        {generatePageNumbers().map((number, index) => (
          <React.Fragment key={index}>
            {number === "..." ? (
              <span className='mx-1'>{number}</span>
            ) : (
              <Link
                to='#'
                className={`mx-1 flex items-center rounded-md border  border-gray-400 px-3 py-1 hover:scale-105 ${
                  currentPage === number
                    ? "bg-blue-500 text-cyan-50"
                    : " text-gray-900"
                }`}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </Link>
            )}
          </React.Fragment>
        ))}
        {currentPage !== totalPages && (
          <Link
            to='#'
            className='mx-1 flex items-center  px-3 py-1 text-gray-900 hover:scale-105'
            onClick={() => handlePageClick(currentPage + 1)}
          >
            <ChevronsRight />
          </Link>
        )}
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  className: PropTypes.string,
  displayPages: PropTypes.number,
};

export default Pagination;
