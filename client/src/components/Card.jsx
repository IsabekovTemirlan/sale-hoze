import React, {useState} from 'react';
import {like, liked} from "../assets/icons";
import cardImg from "../assets/images/card-top.jpg";

export const Card = () => {
  const [isLiked, setIsLiked] = useState(false);

  const LikeIcon = () => <img onClick={() => setIsLiked(true)} className="cursor-pointer mr-4" src={isLiked ? liked : like} alt=""/>

  return (
    <div className="wrapper mx-5 max-w-xs bg-gray-50 rounded-b-md shadow-lg overflow-hidden">
      <div><img src={cardImg} alt=""/></div>
      <div className="p-3 space-y-3">
        <h3 className="text-gray-700 font-semibold text-md"> Nepal Mountain</h3>
        <p className="text-sm text-gray-900 leading-sm">Bienvenido a la montaña de nepal un maravilloso lugar en el que
          podras escalar y repirar aire limpio, serás acompoañado por profesonales en alpinismo.</p>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div className="flex"> <LikeIcon /> <span>25</span></div>
        <span className="font-bold text-2xl text-bgColor">4 000 com</span>
      </div>

      <button
        className="bg-bgColor w-full flex justify-center py-2 text-white font-semibold transition duration-300 hover:bg-opacity-75">
        reservation
      </button>
    </div>
  )
}