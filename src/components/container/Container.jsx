import React from "react";
import Breadcrumb from "../breadcumb/Breadcumb";
import CustomTitle from "../title/CustomTitle";
import CustomLink from "../forms/customLink/CustomLink";
// import AboutMeTable from '../forms/tables/AboutMeTable';
import PropTypes from "prop-types";
const Container = ({
  breadcumbMenu,
  breadcumbSubMenu,
  title,
  btnTitle,
  path,
  children,
}) => {
  return (
    <section className='w-full px-6 py-4 '>
      {breadcumbMenu && (
        <Breadcrumb
          breadcumbMenu={breadcumbMenu}
          breadcumbSubMenu={breadcumbSubMenu}
        />
      )}
      <div className='w-full  mt-5'>
        {title && btnTitle && path && children && (
          <div className='flex flex-col space-y-4 capitalize md:flex-row md:items-center md:justify-between md:space-y-0'>
            <CustomTitle title={title} />
            <CustomLink btnTitle={btnTitle} path={path} />
          </div>
        )}
        <div className='container w-full mt-4'>{children}</div>
      </div>
    </section>
  );
};

Container.propTypes = {
  breadcumbMenu: PropTypes.string,
  breadcumbSubMenu: PropTypes.string,
  title: PropTypes.string.isRequired,
  btnTitle: PropTypes.string.isRequired,
  path: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
