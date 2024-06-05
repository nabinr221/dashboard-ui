import PropTypes from "prop-types"; // Import PropTypes

const FormContainer = ({ children, heading }) => {
  return (
    <>
      <div className='bg-white px-10 py-7  border-[3px]'>
        <div className='w-full '>
          <h2 className='text-2xl mb-5 capitalize font-bold leading-tight text-black'>
            {heading}
          </h2>

          <div className='w-full'>{children}</div>
        </div>
      </div>
    </>
  );
};

// Add prop type validation
FormContainer.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a node and is required
  heading: PropTypes.string.isRequired, // Ensure heading is a string and is required
};

export default FormContainer;
