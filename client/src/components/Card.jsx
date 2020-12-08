import React, {useState} from 'react';
import {like, liked} from "../assets/icons";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {likeAd} from "../actions/ads";

export const Card = ({data, isAuth, handler, size}) => {
  const [isLiked, setIsLiked] = useState(false);
  const {title, description, photo, likeCount, price, _id} = data;

  const dispatch = useDispatch();

  const likeHandler = () => {
    setIsLiked(true);
    dispatch(likeAd(_id));
  }

  // isLiked && setInterval(() => setIsLiked(false), 2000);

  const LikeIcon = () => <img onClick={likeHandler} className="cursor-pointer mr-4 transition-all" src={isLiked ? liked : like} alt=""/>

  return (
    <div className={`wrapper m-1 mb-4 ${size ? size : 'w-290'} bg-gray-50 rounded-b-md shadow-lg overflow-hidden`}>
      <div className="h-40 overflow-hidden">
        <img src={photo} alt="" className='w-full h-inherit'/>
      </div>
      <div className="p-3 space-y-3 overflow-hidden">
        <h3 className="text-gray-700 font-semibold text-md">{title}</h3>
        <p className="text-sm h-12 text-gray-900 leading-sm">{description}</p>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div className="flex w-6"> <LikeIcon /> <span>{likeCount}</span></div>
        <span className="font-bold text-2xl text-bgColor">{price} com</span>
      </div>

      <div className="flex">
        <Link
          to={`/detail/${_id}`}
          className="bg-bgColor w-full flex justify-center py-2 text-white font-semibold transition duration-300 hover:bg-opacity-75">
          Подробнее
        </Link>
        {isAuth && <button
          onClick={() => handler && handler(_id)}
          className="bg-red-600 w-full flex justify-center py-2 text-white font-semibold transition duration-300 hover:bg-opacity-75"
        >Удалить</button>}
      </div>

    </div>
  )
}