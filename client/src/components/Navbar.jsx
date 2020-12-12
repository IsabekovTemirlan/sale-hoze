import React from 'react';
import {about, allAds, catS, home, logo, plus, profile} from '../assets/icons';
import { SideBar } from "./SideBar";

const authPageLinks = [
  {id: 0, title: 'Главная', img: home, url: '/'},
  {id: 1, title: 'Профиль', img: profile, url: '/profile'},
  {id: 2, title: 'Все объявлении', img: allAds, url: '/ads'},
  {id: 3, title: 'Категории', img: catS, url: '/categories'},
  {id: 4, title: 'О проекте', img: about, url: '/about'},
];

const pageLinks = [
  {id: 0, title: 'Главная', img: home, url: '/'},
  {id: 1, title: 'Все объявлении', img: allAds, url: '/ads'},
  {id: 2, title: 'Категории', img: catS, url: '/categories'},
  {id: 3, title: 'Подать объявление', img: plus, url: '/advertise'},
  {id: 4, title: 'О проекте', img: about, url: '/about'},
];

export const Navbar = ({isAuth}) => {

  return (
    <div className="w-full bg-bgColor shadow-2xl fixed z-20">
      <div className="m-auto p-2 h-16 flex justify-between items-center max-w-screen-xl">
        <a href="/" className="flex">
          <img src={logo} alt="logo"/>
          <div className="ml-4 text-2xl font-bold text-white">SaleHoz</div>
        </a>
        {isAuth ? <SideBar state={authPageLinks} /> : <SideBar state={pageLinks}/> }   
      </div>
    </div>
  )
}