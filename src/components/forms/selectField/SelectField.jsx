import React, { useId } from "react";
import PropTypes from "prop-types";

function SelectField(
  { options, error, label, name, className = "", ...props },
  ref
) {
  const id = useId();
  console.log(options);
  return (
    <div className='w-full h-full'>
      {label && (
        <label
          htmlFor={id}
          className='capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        name={name}
        className={`capitalize transition duration-300 ease flex w-full border-2 border-slate-700/40 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:border-blue-500 ${className}`}
      >
        <option value=''> select {label} </option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className='text-red-500 text-base'>{error}</span>}
    </div>
  );
}

export default React.forwardRef(SelectField);
