import React, { useState } from 'react';

const ToolTip = ({ text, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };
  return (
    <div className="relative inline-block">
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </div>
      {isTooltipVisible && (
        <div className="absolute  bg-neutral-100 my-1 z-10 px-3 py-1  rounded-md whitespace-nowrap">
          <p className="capitalize text-sm text-gray-500">{text}</p>
        </div>
      )}
    </div>
  );
};

export default ToolTip;
