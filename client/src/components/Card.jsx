import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likeAd } from "../actions/ads";
import { AuthContext } from "../context/authContext";

export const Card = ({ data, size }) => {
  const { userId } = useContext(AuthContext);
  const { title, description, photo, price, _id } = data;
  const dispatch = useDispatch();

  const likeHandler = () => { dispatch(likeAd({ adId: _id, userId })); };

  const LikeIcon = () => (
    <div className="cursor-pointer mr-4 transition-all">
      <box-icon
        onClick={likeHandler}
        name="bookmark-heart"
        size="md"
        color="#ff5722"
      ></box-icon>
    </div>
  );

  return (
    <div className={`wrapper m-1 mb-4 ${size ? size : "w-290"} page-enter bg-white rounded-b-md shadow-lg overflow-hidden`}>
      <div className="h-40 overflow-hidden">
        {photo[0] ? <img src={photo[0]} alt="" className="w-full h-inherit" /> : <div className="mt-12 flex justify-center aitems-center text-4xl font-extrabold text-gray-400">Нет фото</div>}
      </div>
      <hr/>
      <div className="p-3 space-y-3 overflow-hidden">
        <h3 className="text-gray-700 font-semibold text-md">{title}</h3>
        <p className="text-sm h-12 text-gray-900 leading-sm">{description}</p>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div className="flex w-6">
          {userId && <LikeIcon />}
        </div>
        <span className="font-bold text-2xl text-bgColor">{price} сом</span>
      </div>

      <div className="flex">
        <Link
          to={`/detail/${_id}`}
          className="bg-bgColor w-full flex justify-center py-2 text-white font-semibold transition duration-300 hover:bg-opacity-75"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};
