import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "./../components/navbar/Navbar";
import { BrowserView, MobileView } from "react-device-detect";
import Drawer from "../components/drawer/Drawer";
import MobileNavbar from "../components/navbar/mobileNavbar/MobileNavbar";
import {
  ScrollText,
  Trophy,
  CalendarDays,
  FolderOpenDot,
  Network,
  Home,
  CircleDollarSign,
  BookOpenCheck,
  Newspaper,
  SquareUser,
  ShoppingBasket,
} from "lucide-react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuList = [
    {
      id: 0,
      title: "Home",
      path: null,
      icon: <Home className='h-5 w-5' aria-hidden='true' />,
      submenus: [
        {
          id: 1,
          title: "achievements",
          path: "/achievements",
        },
        {
          id: 2,
          title: "notice",
          path: "/notices",
        },
        {
          id: 3,
          title: "advertisements",
          path: "/advertisements",
        },
      ],
    },
    {
      id: 1,
      title: "About Me",
      path: null,
      icon: <ScrollText className='h-5 w-5' aria-hidden='true' />,
      submenus: [
        {
          id: 1,
          title: "About Me",
          path: "/abouts",
        },
      ],
    },
    {
      id: 2,
      title: "events",
      path: null,
      icon: <CalendarDays className='h-5 w-5' aria-hidden='true' />,
      submenus: [
        {
          id: 1,
          title: "sponsor",
          path: "/sponsors",
        },
        {
          id: 2,
          title: "events",
          path: "/events",
        },
        {
          id: 3,
          title: "event members",
          path: "/event-members",
        },
        {
          id: 4,
          title: "event sponsors",
          path: "/event-sponsors",
        },
        {
          id: 5,
          title: "News Apperance",
          path: "/news-apperances",
        },
        {
          id: 6,
          title: "Glimpse",
          path: "/glimpses",
        },
      ],
    },
    {
      id: 3,
      title: "Member",
      path: "/members",
      icon: <FolderOpenDot className='h-5 w-5' aria-hidden='true' />,
    },

    {
      id: 4,
      title: "Products",
      path: null,
      icon: <ShoppingBasket className='h-5 w-5' aria-hidden='true' />,
      submenus: [
        {
          id: 1,
          title: "Product Categories",
          path: "/product-categories",
        },
        {
          id: 2,
          title: "colors",
          path: "/colors",
        },
        {
          id: 3,
          title: "products",
          path: "/products",
        },
        {
          id: 4,
          title: "product images",
          path: "/product-images",
        },
      ],
    },
    {
      id: 4,
      title: "donor",
      path: "/donors",
      icon: <CircleDollarSign className='h-5 w-5' aria-hidden='true' />,
    },

    {
      id: 7,
      title: "projects",
      path: null,
      icon: <Newspaper className='h-5 w-5' aria-hidden='true' />,
      submenus: [
        {
          id: 1,
          title: "projects",
          path: "/projects",
        },
        {
          id: 2,
          title: "overviews",
          path: "/overviews",
        },
        {
          id: 3,
          title: "objectives",
          path: "/objectives",
        },
        {
          id: 3,
          title: "target audiences",
          path: "/target-audiences",
        },
        {
          id: 4,
          title: "Project Outcomes",
          path: "/outcomes",
        },
        {
          id: 5,
          title: "Team Members",
          path: "/team-members",
        },
        {
          id: 6,
          title: "project Members",
          path: "/project-members",
        },
        {
          id: 7,
          title: "activities",
          path: "/activities",
        },
        {
          id: 8,
          title: "project donations",
          path: "/project-donations",
        },
      ],
    },
    {
      id: 8,
      title: "contacts",
      path: null,
      icon: <SquareUser className='h-5 w-5' aria-hidden='true' />,
      submenus: [
        {
          id: 1,
          title: "contact",
          path: "/contacts",
        },
        {
          id: 2,
          title: "Contact information",
          path: "/contacts-info",
        },
      ],
    },
  ];

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <BrowserView>
        <div className='flex w-full bg-blue-50'>
          <div className='fixed bg-neutral-700 h-full w-72 overflow-y-auto'>
            <Sidebar menuList={menuList} />
          </div>
          <div className='flex-1 ml-72 px-3'>
            <Navbar />
            <Outlet />
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div>
          <MobileNavbar toggleDrawer={toggleDrawer} />
          <Drawer
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
            menuList={menuList}
          >
            <Outlet />
          </Drawer>
        </div>
      </MobileView>
    </>
  );
};

export default DashboardLayout;
