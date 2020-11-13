import React, {useState} from 'react';
import menu from "../assets/icons/menu.svg";
import close from "../assets/icons/close.svg";

export const SideBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <img onClick={() => setVisible(true)} className="transform rotate-180 cursor-pointer" src={menu} alt="menu"/>
      <div
        className={`transition-all duration-300 fixed bg-white fixed right-0 top-0 h-full shadow-2xl bg-gray-200 ${!visible ? 'w-0' : 'w-1/4  p-4'}`}
      >
        <img onClick={() => setVisible(false)} className="cursor-pointer" src={close} alt="cross"/>
      </div>
    </div>
  )
}