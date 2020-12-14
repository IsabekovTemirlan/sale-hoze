import React, { useState } from "react";
import { menu, close } from "../assets/icons";
import "boxicons";

import { Link } from "react-router-dom";

const ListItem = ({ title, icon, url }) => {
  const listStyle =
    "list-none border rounded transition-all transform hover:translate-x-2 transition-transform duration-200 text-gray-500 hover:text-gray-800 uppercase duration-200 mb-1 px-3 py-3 hover:bg-gray-100 cursor-pointer";

  return (
    <Link to={url}>
      <li className={listStyle}>
        <span className="flex flex-row items-center">
          <span className="inline-flex items-center justify-center w-12 text-lg">
            <box-icon name={icon} color="#ff5722"></box-icon>
          </span>
          <span className="text-sm font-medium">{title}</span>
        </span>
      </li>
    </Link>
  );
};

export const SideBar = ({ state }) => {
  const [visible, setVisible] = useState(false);

  document.onclick = (e) => {
    if (visible) {
      e.target.classList[0] === "transition-all"
        ? setVisible(true)
        : setVisible(false);
    }
  };

  return (
    <div id="sidebar">
      <img
        onClick={() => setVisible(true)}
        className="transform rotate-180 cursor-pointer"
        src={menu}
        alt="menu"
      />
      <div
        className={`transition-all duration-300 z-20 bg-white fixed right-0 top-0 h-full shadow-2xl ${
          !visible ? "w-0" : "w-3/5 p-4 md:w-2/6  "
        }`}
      >
        <img
          onClick={() => setVisible(false)}
          className="cursor-pointer"
          src={close}
          alt="cross"
        />
        <ul className="list-disc mt-6">
          {state &&
            state.map((item) => (
              <ListItem
                key={item.id}
                url={item.url}
                title={item.title}
                icon={item.img}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};
