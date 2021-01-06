import React, { useEffect, useState } from 'react'
import { Card } from "../components/Card";
import { getFavoriteAds, clearFavoritesAds } from '../api'
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { SET_LOADING, CLEAR_LOADING, SET_ALERT } from '../types';
import { Button } from '../components/Button';

export const FavoritePage = ({ userId }) => {
  const [favAds, setFavAds] = useState([]);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const getAds = async (userId) => {
    dispatch({ type: SET_LOADING });
    const { data } = await getFavoriteAds({ userId });
    dispatch({ type: CLEAR_LOADING });
    if (data) { setFavAds(data); }
  }

  const clearFavorites = async () => {
    const { data } = await clearFavoritesAds({ userId });
    dispatch({ type: SET_ALERT, payload: { text: data } });
    setFavAds([]);
  }

  useEffect(() => {
    getAds(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mt-2">
      <div className="flex justify-between items-center flex-wrap mb-4">
        <h2 className="text-3xl mt-2 ml-4 uppercase font-bold leading-tight text-center w-full md:w-auto md:text-left font-heading">Избранные объявления</h2>
        <div className="mt-2 mx-auto md:mx-0">
          <Button
            handler={clearFavorites}
            title="Очистить список"
            btnType="bg-red-600"
            pad="py-2"
          />
        </div>
      </div>
      <hr />
      <div className="w-full my-5 flex justify-center flex-wrap rounded-sm shadow-sm">
        {loading ? <Loader /> : null}
        {favAds.length ? favAds.map(ad => <Card data={ad} key={ad._id} />) : null}
        {!loading && !favAds.length ? <p>Объявлений нет</p> : null}
      </div>
    </section>
  )
}
