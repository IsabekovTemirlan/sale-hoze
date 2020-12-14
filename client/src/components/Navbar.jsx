import React from 'react';
import {logo} from '../assets/icons';
import {SideBar} from "./SideBar";

const authPageLinks = [
  {id: 0, title: 'Главная', img: "home", url: '/'},
  {id: 1, title: 'Профиль', img: "user", url: '/profile'},
  {id: 2, title: 'Все объявлении', img: "spreadsheet", url: '/ads'},
  {id: 4, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 5, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 6, title: 'О проекте', img: "question-mark", url: '/about'}
];

const pageLinks = [
  {id: 0, title: 'Главная', img: "home", url: '/'},
  {id: 1, title: 'Все объявлении', img: "spreadsheet", url: '/ads'},
  {id: 2, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 3, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 4, title: 'О проекте', img: "question-mark", url: '/about'},
  {id: 5, title: 'Войти', img: "log-in", url: '/auth'},
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