import React, {useState} from 'react';
import { home, close, about, plus, catS, search, menu} from "../assets/icons";

export const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const listStyle = 'list-none border rounded transition-all uppercase duration-200 mb-1 px-3 py-3 hover:bg-gray-100 hover:border-red-500 cursor-pointer'

  return (
    <div>
      <img onClick={() => setVisible(true)} className="transform rotate-180 cursor-pointer" src={menu} alt="menu"/>
      <div className={`transition-all duration-300 fixed bg-white fixed right-0 top-0 h-full shadow-2xl bg-gray-200 ${!visible ? 'w-0' : 'w-1/4  p-4'}`}
      >
        <img onClick={() => setVisible(false)} className="cursor-pointer" src={close} alt="cross"/>
        <ul className="list-disc mt-6">
          <li className={listStyle}><div className="flex items-center"><img src={home} className="mr-2" alt=""/>Главная</div></li>
          <li className={listStyle}><div className="flex items-center"><img src={search} className="mr-2" alt=""/>Поиск</div></li>
          <li className={listStyle}><div className="flex items-center"><img src={catS} className="mr-2" alt=""/>Категории</div></li>
          <li className={listStyle}><div className="flex items-center"><img src={plus} className="mr-2" alt=""/>Подать объявление</div></li>
          <li className={listStyle}><div className="flex items-center"><img src={about} className="mr-2" alt=""/>О проекте</div></li>
        </ul>
      </div>
    </div>
  )
}