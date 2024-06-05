import PropTypes from 'prop-types';
const CustomButton = ({
  children,
  type = 'button',
  bgColor = 'bg-slate-600',
  textColor = 'text-white',
  className = '',
}) => {
  return (
    <button
      className={`w-[100%]  px-4 py-2 capitalize font-semibold text-sm transition duration-300 ease ${bgColor} ${textColor} ${className} hover:bg-slate-500`}
      type={type}
    >
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default CustomButton;
