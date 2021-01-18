import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNormalDate } from '../utils';
import { Comment } from "../components/Comment";
import {url} from "../api";

export const DetailPage = ({ isAuth }) => {
  const { id } = useParams();
  const ads = useSelector((state) => state.ads.find((item) => item._id === id));
  const [mainImg, setMainImg] = useState(ads ? ads.photo[0] : []);

  if (ads) {
    return (
      <div className="py-6 mt-6 bg-white rounded-lg page-enter">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div>
                <div className="h-64 md:h-80 rounded-lg bg-gray-300 mb-4">
                  <div className="h-64 md:h-80 rounded-lg bg-gray-300 mb-4 flex items-center justify-center">
                    {ads.photo.length ? <img
                      className="h-64 m-4 w-auto"
                      src={`${url}${mainImg.url}`}
                      alt=""
                    /> : <div className="flex justify-center aitems-center text-4xl font-extrabold text-gray-800">Фото нет</div>}
                  </div>
                </div>

                <div className="flex -mx-2 mb-4">
                  {
                    ads.photo.length ? ads.photo.map((p) => (
                      <div key={p.id} className="flex-1 px-2">
                        <button onClick={() => setMainImg(p)} className={`overflow-hidden focus:outline-none rounded-lg h-24 md:h-32 bg-gray-100 flex items-center ${ads.photo.length === 1 ? 'w-1/3' : 'w-full'} justify-center` + (p === mainImg ? " border-2 border-bgColor " : "")}>
                          <img src={`${url}${p.url}`} alt="" />
                        </button>
                      </div>
                    )) : <p></p>
                  }
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {ads && ads.title}
              </h2>
              <p className="text-indigo-600 text-sm">
                {ads && getNormalDate(ads.createdAt)}
              </p>
              <hr />

              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="font-bold text-bgColor text-3xl">
                      {ads && ads.price}
                    </span>
                    <span className="ml-1 mt-1 text-2xl">сом</span>
                  </div>
                </div>
              </div>
              <hr />

              <p>Описание:</p>
              <p className="text-gray-500 break-words">
                {ads && ads.description}
              </p>

              <hr />

              <p>Область:</p>
              <p className="text-gray-500 break-words">{ads && ads.location}</p>
              <hr />
              <p>Категория:</p>
              <p className="text-gray-500 break-words">{ads && ads.category}</p>
              <hr />
              <p>Номер телефона:</p>
              <div className="flex mb-2 py-1 space-x-4">
                <div className="h-14 px-6 py-2 font-semibold rounded-xl bg-bgColor hover:bg-opacity-75 text-white">
                  {ads && ads.contactNumber}
                </div>
              </div>
            </div>
          </div>
          <hr />
          {ads.creator ? <Comment isAuth={isAuth} id={id} adCreator={ads.creator} /> : null}
        </div>
      </div>
    );
  } else { return <p className="mt-16 text-center">Ничего нет</p>}
};