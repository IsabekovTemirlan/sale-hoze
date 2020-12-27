import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const {pathname} = useLocation();

  return (
    <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center space-x-2 text-balck text-sm">
        <Link to="/" className="hover:underline hover:text-gray-600">
          Главная
        </Link>
        <span>
          <svg
            className="h-5 w-5 leading-none text-bgColor"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
        {pathname && <p className="hover:underline hover:text-gray-600">
          {pathname === "/advertise" ? "Подать объявление" : null}
          {pathname === "/ads" ? "Все объявление" : null}
          {pathname === "/profile" ? "Профиль" : null}
          {pathname === "/about" ? "О проекте" : null}
          {pathname === "/categories" ? "Категории" : null}
          {pathname.includes("/detail/") ? "Подробнее" : null }
          {pathname === "/auth" ? "Вход" : null}
          {pathname === "/chat" ? "Сообщения" : null}
        </p>}
      </div>
    </div>
  );
};
