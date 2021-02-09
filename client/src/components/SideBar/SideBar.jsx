import React from 'react'
import { Link } from "react-router-dom";
import { menu } from "../../assets/icons";
import "boxicons";

const ListItem = ({ title, icon, url }) => (
  <Link to={url}>
    <li className="list-none border bg-white rounded transform hover:translate-x-2 transition-transform text-gray-500 hover:text-gray-800 uppercase duration-200 mb-1 px-3 py-3 hover:bg-gray-100 cursor-pointer">
      <span className="flex flex-row items-center">
        <span className="inline-flex items-center justify-center w-12 text-lg">
          <box-icon name={icon} color="#ff5722"></box-icon>
        </span>
        <span className="text-sm font-medium">{title}</span>
      </span>
    </li>
  </Link>
);

const SideBar = ({ state, visible, setVisible }) => {
  return (
    <div id="sidebar">
      <img
        onClick={() => setVisible(true)}
        className="transform rotate-180 cursor-pointer"
        src={menu}
        alt="menu"
      />
      <div
        className={`duration-300 z-20 bg-white shadow-lg bg-opacity-75 ease-out fixed right-0 top-0 h-full ${!visible ? "w-0" : "w-full p-4 md:w-2/6"}`}
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)"
        }}
      >
        <button onClick={() => setVisible(false)} className="p-2 rounded-full transition-all border border-gray-600 duration-500 hover:bg-white focus:outline-none focus:ring outline-none">
          <svg
            className="w-6 h-6 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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
  )
}

export default SideBar;
