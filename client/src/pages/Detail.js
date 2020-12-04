import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export const DetailPage = () => {
  const { id } = useParams();
  const ads = useSelector(state => state.ads)
  ads.forEach(item => console.log(item._id === id));

  return (

    <div className="bg-white flex justify-between">
      <div className="w-1/2 mx-4">
        <h2 className='font-bold text-3xl'>{ads && ads.title}</h2>
        <p className="my-4">{ads && ads.description}</p>
        <p className="my-4">{ads && ads.likeCount > 0 && ads.likeCount}</p>
        <span className='text-2xl'>{ads && ads.price} com</span>
        <p className="my-4">{ads && ads.createdAt}</p>
        <p className="my-4">{ads && ads.killDate}</p>
        <p className="my-4">{ads && ads.contactNumber}</p>
        <p className="my-4">{ads && ads.location}</p>
        <p className="my-4">{ads && ads.category}</p>
      </div>

      <div className="w-1/2 mx-4">
        <div className="flex items-center flex-wrap overflow-hidden">
          <img className="h-64 m-4 w-auto" src={ads && ads.photo} alt=""/>
        </div>
      </div>
    </div>
  )
}