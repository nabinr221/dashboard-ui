import React, { useId } from "react";
import PropTypes from "prop-types";

const CustomInputField = React.forwardRef(function Input(
  { label, type = "text", error, className = "", placeholder, ...props },
  ref
) {
  const id = useId();
  return (
    <div className='w-full mb-3'>
      {label && (
        <label
          className='capitalize inline-block mb-1 pl-1 text-sm font-semibold'
          htmlFor={id}
        >
          {label}
        </label>
      )}

      {type === "text-area" ? (
        <textarea
          className={`${className} transition duration-300 ease w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500`}
          placeholder={placeholder}
          rows={6}
          id={id}
          ref={ref}
          {...props}
        />
      ) : (
        <input
          className={`${className} transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500`}
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          {...props}
        />
      )}
      {error && <span className='text-red-500 text-base'>{error}</span>}
    </div>
  );
});

CustomInputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "text-area",
    "email",
    "number",
    "date",
    "file",
    "checkbox",
    " radio",
  ]),
  error: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomInputField;
