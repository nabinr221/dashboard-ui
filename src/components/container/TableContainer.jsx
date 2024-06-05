import PropTypes from "prop-types";

const TableContainer = ({ children }) => {
  return (
    <div className='-mx-4 -my-2  sm:-mx-6 lg:-mx-8'>
      <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
        <div className='w-full overflow-hidden border border-gray-200 '>
          {children}
        </div>
      </div>
    </div>
  );
};

// Prop types definition
TableContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableContainer;
