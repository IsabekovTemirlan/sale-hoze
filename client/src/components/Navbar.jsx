import React from 'react';
import {logo} from '../assets/icons';
import {SideBar} from "./SideBar";

const authPageLinks = [
  {id: 0, title: 'Главная', img: "home", url: '/'},
  {id: 1, title: 'Сообщения', img: "message", url: '/chat'},
  {id: 2, title: 'Профиль', img: "user", url: '/profile'},
  {id: 3, title: 'Все объявлении', img: "spreadsheet", url: '/ads'},
  {id: 4, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 5, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 6, title: 'О проекте', img: "question-mark", url: '/about'}
];

const pageLinks = [
  {id: 0, title: 'Главная', img: "home", url: '/'},
  {id: 2, title: 'Все объявлении', img: "spreadsheet", url: '/ads'},
  {id: 3, title: 'Категории', img: "category-alt", url: '/categories'},
  {id: 4, title: 'Подать объявление', img: "add-to-queue", url: '/advertise'},
  {id: 5, title: 'О проекте', img: "question-mark", url: '/about'},
  {id: 6, title: 'Войти', img: "log-in", url: '/auth'},
];

const adminPages = [
  {id: 0, title: 'Панель управления', img: "edit", url: '/dashboard'},
  {id: 1, title: 'Сообщения', img: "message", url: '/chat'}
];

export const Navbar = ({isAuth, isAdmin}) => {

  return (
    <div style={{backgroundColor: "#fc9842", backgroundImage: "linear-gradient(315deg, #fc9842 0%, #fe5f75 74%)"}} className="w-full shadow-2xl fixed z-20">
      <div className="m-auto p-2 h-16 flex justify-between items-center max-w-screen-xl">
        <a href="/" className="flex">
          <img src={logo} alt="logo"/>
          <div className="ml-4 text-2xl font-bold text-white">SaleHoz</div>
        </a>
        {(isAdmin && isAuth) ?  <SideBar state={adminPages} /> : (isAuth ? <SideBar state={authPageLinks} /> : <SideBar state={pageLinks}/> ) }
      </div>
    </div>
  )
}