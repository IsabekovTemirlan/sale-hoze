import React, {useState} from 'react';
import {menu, close} from "../assets/icons";

import {Link} from "react-router-dom";

const ListItem = ({title, icon, url}) => {

  const listStyle = 'list-none border rounded transition-all uppercase duration-200 mb-1 px-3 py-3 hover:bg-gray-100 hover:border-red-500 cursor-pointer';

  return (
    <Link to={url}>
      <li className={listStyle}>
        <div className="flex items-center">
          <img className="w-6 mr-4" src={icon} alt=""/>
          {title}
        </div>
      </li>
    </Link>
  )
}

export const SideBar = ({state}) => {
  const [visible, setVisible] = useState(false);

  document.onclick = (e) => {
    if (visible) {
      e.target.classList[0] === "transition-all" ? setVisible(true) : setVisible(false)
    }
  }

  return (
    <div id="sidebar">
      <img onClick={() => setVisible(true)} className="transform rotate-180 cursor-pointer" src={menu} alt="menu"/>
      <div className={`transition-all duration-300 z-20 fixed bg-white fixed right-0 top-0 h-full shadow-2xl bg-gray-200 ${!visible ? 'w-0' : 'w-3/5 p-4 md:w-2/6  '}`}
      >
        <img onClick={() => setVisible(false)} className="cursor-pointer" src={close} alt="cross"/>
        <ul className="list-disc mt-6">
          {state && state.map(item => <ListItem key={item.id} url={item.url} title={item.title} icon={item.img}/>)}
        </ul>
      </div>
    </div>
  )
}