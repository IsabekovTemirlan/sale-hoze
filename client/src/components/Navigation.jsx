import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ title, url }) => {
  const { pathname } = useLocation();
  const listStyle =
    `list-none border-b-2 bg-transparent transition-all duration-500 uppercase m-1 px-2 py-1 cursor-pointer ${pathname === url ? "border-red-600 text-gray-800" : "text-white hover:border-gray-800 hover:text-gray-800"}`;

  return (
    <Link to={url}>
      <li className={listStyle}>
        <span className="flex flex-row items-center">
          <span className="text-sm">{title}</span>
        </span>
      </li>
    </Link>
  );
};

export const Navigation = ({ state }) => (
  <div className="flex items-center">
    {state &&
      state.map((item) => (
        <NavItem
          key={item.id}
          url={item.url}
          title={item.title}
        />
      ))}
  </div>
);