import React from 'react';
import logo from '../assets/icons/logo.svg';
import { SideBar } from "./SideBar";

export const Navbar = () => {
  return (
    <div className="w-full bg-bgColor shadow-2xl fixed">
      <div className="m-auto p-2 h-16 flex justify-between items-center max-w-screen-xl">
        <a href="/" className="flex">
          <img src={logo} alt="logo"/>
          <div className="ml-4 text-2xl font-bold text-white">SaleHoz</div>
        </a>
        <SideBar />
      </div>
    </div>
  )
}