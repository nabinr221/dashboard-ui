import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  BarChart,
  Settings,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";

const NavItem = ({ icon, title, subItems, path }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleToggle = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <li className='capitalize transition duration-300 hover:bg-neutral-500 cursor-pointer'>
      {subItems && subItems.length > 0 ? (
        <div className='w-full flex items-center'>
          <span
            className='flex pl-2 p-2 items-center gap-2 w-full'
            onClick={handleToggle}
          >
            {icon}
            <span>{title}</span>
          </span>
          {!openDropdown ? <ChevronDown /> : <ChevronUp />}
        </div>
      ) : (
        <NavLink
          to={path}
          className={({ isActive }) =>
            ` mb-3 p-2 flex transition duration-300 items-center gap-2 w-full ${
              isActive ? "bg-neutral-500" : ""
            }`
          }
        >
          {icon}
          <span>{title} </span>
        </NavLink>
      )}

      {openDropdown && subItems && subItems.length > 0 && (
        <ul className='space-y-2 py-3 bg-neutral-800 transition-all duration-300'>
          {subItems.map((item, index) => (
            <li
              key={index}
              className='cursor-pointer   w-full hover:bg-neutral-500 '
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `pl-8 mb-2 p-2 flex cursor-pointer transition duration-300 items-center gap-2 w-full ${
                    isActive ? "bg-neutral-500" : ""
                  }`
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const MobileSidebar = ({ menuList }) => {
  return (
    <aside className='h-[90%] w-full p-0 m-0 text-neutral-50 inset-y-0 relative'>
      <div className='mt-5'>
        <NavLink
          className={({ isActive }) =>
            `pl-7 mb-3 p-2 flex transition duration-300 items-center gap-2 w-full ${
              isActive ? "bg-neutral-500" : ""
            }`
          }
          to='/'
        >
          <BarChart className='h-5 w-5' aria-hidden='true' />
          <span className='mx-2 text-sm font-medium'>Dashboard</span>
        </NavLink>

        <div className='flex flex-col justify-center pl-5'>
          <nav className='space-y-2'>
            <div>
              <label className='px-1 text-xs font-extrabold uppercase text-neutral-200'>
                analytics
              </label>
            </div>
            <ul className='space-y-2 text-sm font-semibold text-neutral-300'>
              {menuList.map((item, index) => (
                <NavItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  subItems={item.submenus}
                  path={item.path}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className='border-b-2 mt-3 border-neutral-400'></div>
      <div className='mt-5'>
        <div className='flex flex-col justify-center pl-5'>
          <ul className='space-y-1 text-sm font-semibold text-neutral-300'>
            <li className='pl-2 p-1 transition duration-300 hover:bg-neutral-500'>
              <NavLink
                to='/setting'
                className={({ isActive }) =>
                  `flex items-center gap-2 w-full ${
                    isActive ? "bg-neutral-500" : ""
                  }`
                }
              >
                <Settings className='h-5 w-5' aria-hidden='true' />
                <span>Setting</span>
              </NavLink>
            </li>
            {/* <li className='pl-2 p-1 transition duration-300 hover:bg-neutral-500'>
              <NavLink
                to='/support'
                className={({ isActive }) =>
                  `flex items-center gap-2 w-full ${
                    isActive ? "bg-neutral-500" : ""
                  }`
                }
              >
                <HelpCircle className='h-5 w-5' aria-hidden='true' />
                <span>Helps and Supports</span>
              </NavLink>
            </li> */}
            <li className='pl-2 p-1 transition duration-300 hover:bg-neutral-500'>
              <button
                // onClick={handleLogout}
                className='flex items-center gap-2 w-full'
              >
                <LogOut className='h-5 w-5' aria-hidden='true' />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default MobileSidebar;
