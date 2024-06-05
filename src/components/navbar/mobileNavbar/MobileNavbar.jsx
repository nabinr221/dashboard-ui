import { AlignLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MobileNavbar = ({ toggleDrawer }) => {
  return (
    <div className='sticky top-0 w-full bg-gray-200 border-b-2 border-slate-50 z-10'>
      <div className='flex max-w-full items-center justify-between px-4 py-1 sm:px-6 lg:px-8'>
        <div className='inline-flex items-center space-x-2 '>
          <AlignLeft onClick={toggleDrawer} />
          <span className='h-10 w-10'>
            <Link to='/' className='font-bold'>
              <img
                className='w-full h-full object-contain'
                src='/images/logo.png'
                alt='logo'
              />
            </Link>
          </span>
          <span className='font-bold'>
            <Link to='/' className='font-bold'>
              AdminUI
            </Link>
          </span>
        </div>
        <div className='ml-2'>
          <span className='relative rounded-full border-[3px] inline-block '>
            <img
              className='h-10 w-10 rounded-full'
              src='/defaultUser.png'
              alt='Dan_Abromov'
            />
            <span className='absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white'></span>
          </span>
        </div>
      </div>
    </div>
  );
};

MobileNavbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default MobileNavbar;
