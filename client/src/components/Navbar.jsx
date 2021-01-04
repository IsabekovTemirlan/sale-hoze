import React from 'react';
import { logo } from '../assets/icons';
import { SideBar } from "./SideBar";
import { Navigation } from "./Navigation";

import { authPageLinks, pageLinks, adminPages } from "../utils";

const Side = ({ isAdmin, isAuth }) => (isAdmin && isAuth) ? <SideBar state={adminPages} /> : (isAuth ? <SideBar state={authPageLinks} /> : <SideBar state={pageLinks} />)
const Nav = ({ isAdmin, isAuth }) => (isAdmin && isAuth) ? <Navigation state={adminPages} /> : (isAuth ? <Navigation state={authPageLinks} /> : <Navigation state={pageLinks} />)

export const Navbar = ({ isAuth, isAdmin }) => {

  return (
    <div style={{ backgroundColor: "#fc9842", backgroundImage: "linear-gradient(315deg, #fc9842 0%, #fe5f75 74%)" }} className="w-full shadow-2xl fixed z-20">
      <div className="m-auto p-2 h-16 flex justify-between items-center max-w-screen-xl">
        <a href="/" className="flex">
          <img src={logo} alt="logo" />
          <div className="ml-4 text-2xl font-bold text-white">SaleHoz</div>
        </a>
        {window.innerWidth < 1000 ? <Side isAdmin={isAdmin} isAuth={isAuth} /> : <Nav isAdmin={isAdmin} isAuth={isAuth} />}
      </div>
    </div>
  )
}