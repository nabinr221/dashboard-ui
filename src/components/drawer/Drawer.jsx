import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import MobileSidebar from "../sidebar/mobileSidebar/MobileSidebar";

const Drawer = ({ children, isOpen, toggleDrawer, menuList }) => {
  const [drawerWidth, setDrawerWidth] = useState(0);

  useEffect(() => {
    setDrawerWidth(isOpen ? 16 : 0);
  }, [isOpen]);

  const drawerStyle = {
    width: `${drawerWidth}rem`,
    transition: "width 0.3s ease",
  };

  return (
    <div className='flex'>
      <div
        className='fixed top-0 left-0 h-full bg-gray-800 text-white z-40'
        style={drawerStyle}
      >
        {isOpen && (
          <div>
            <div className='bg-neutral-800 w-full flex items-center justify-around gap-10 p-2'>
              <span className='h-10 w-10'>
                <img
                  className='w-full h-full object-contain'
                  src='/images/logo.png'
                  alt='logo'
                />
              </span>

              <span className='border-2 rounded-full ' onClick={toggleDrawer}>
                <X />
              </span>
            </div>

            <MobileSidebar menuList={menuList} />
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30'
          onClick={toggleDrawer}
        ></div>
      )}
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Drawer;
